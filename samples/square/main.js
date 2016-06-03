void function(){
  var gl, canvas;
  var modelViewMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -3.333, 1]);
  var projectionMatrix = new Float32Array([2.41421, 0, 0, 0, 0, 2.41421, 0, 0, 0, 0, -1.002002, -1, 0, 0, -0.2002002, 0]);
  var shaderProgram, shaderVertexPositionAttribute, shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;

  function init() {
    canvas = document.getElementById("webglcanvas");
    gl = canvas.getContext("experimental-webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    var square = createSquare();
    initShader();
    draw(square);
  }

  function createSquare() {
    var vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var verts = [
      .5,  .5,  0.0,
      -.5,  .5,  0.0,
      .5, -.5,  0.0,
      -.5, -.5,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    var square = {buffer:vertexBuffer, vertSize:3, nVerts:4, primtype:gl.TRIANGLE_STRIP};
    return square;
  }

  function createShader(str, type) {
    var shader;
    if (type == "fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  var vertexShaderSource =`
  attribute vec3 vertexPos;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  void main(void) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);
  }
  `;

  var fragmentShaderSource = `
  void main(void) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  `;

  function initShader() {
    var fragmentShader = createShader(fragmentShaderSource, "fragment");
    var vertexShader = createShader(vertexShaderSource, "vertex");
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
    shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    gl.enableVertexAttribArray(shaderVertexPositionAttribute);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }
  }

  function draw(obj) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
    gl.useProgram(shaderProgram);
    gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    init();
  });
}()
