void function(){

  var renderer = null, scene = null, camera = null, objects = [], messageTypes = {};

  function initialize(){
    var container = document.getElementById("container");
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 4000);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    var earthmap = "../../resources/earth_diffuse.jpg";
    var geometry = new THREE.SphereGeometry(1, 50, 50);
    var texture = THREE.ImageUtils.loadTexture(earthmap);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 0.5;
    objects.push(mesh);
    scene.add(objects[0]);

    run();
  }

  function run(){
    renderer.render(scene, camera);
    objects[0].rotation.y -= 0.001;
    requestAnimationFrame(run);
  }

  document.addEventListener("DOMContentLoaded", function(event){
    initialize();
  });
}();
