void function(){

  var renderer = null, scene = null, camera = null, objects = [], sun = null, messageTypes = {};

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

    // Sun
    sun = new THREE.PointLight( 0xffffff, 2, 100);
    sun.position.set(-10, 0, 20);
    scene.add(sun);

    // Earth
    var surfaceMap = THREE.ImageUtils.loadTexture("../../resources/earth_diffuse.jpg");
    var normalMap = THREE.ImageUtils.loadTexture("../../resources/earth_normal.jpg");
    var specularMap = THREE.ImageUtils.loadTexture("../../resources/earth_specular.jpg");

    var geometry = new THREE.SphereGeometry(0.7, 50, 50);
    var material = new THREE.MeshPhongMaterial({
      map: surfaceMap,
      normalMap: normalMap,
      specularMap: specularMap
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 0.5;
    objects.push(mesh);
    scene.add(objects[0]);

    // Clouds
    var alphaMap = THREE.ImageUtils.loadTexture("../../resources/earth_clouds.png");

    var geometry1 = new THREE.SphereGeometry(0.71, 50, 50);
    var material1 = new THREE.MeshLambertMaterial({
      map : alphaMap,
      transparent:true
    });
    var mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.rotation.x = 0.5;
    objects.push(mesh1);
    scene.add(objects[1]);

    run();
  }

  function run(){
    renderer.render(scene, camera);
    objects[0].rotation.y -= 0.001;
    objects[1].rotation.y -= 0.002;
    requestAnimationFrame(run);
  }

  document.addEventListener("DOMContentLoaded", function(event){
    initialize();
  });
}();
