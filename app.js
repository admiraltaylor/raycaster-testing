

function init(){
  var cube;
  var light;
  var floor;
  var raycaster;
  var mouse;
  var objects=[];
  var renderer = new THREE.WebGLRenderer({
    canvas:document.getElementById('myCanvas'),
    antialias:true
  });

  //renderer details
  renderer.setClearColor(0xC20C53);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
      //enabling shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;


 var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
 var scene = new THREE.Scene();
  camera.position.set(500, 300, 800);
  camera.lookAt(scene.position);

  //mouse interactivity, I hope
  //adding raycaster and mouse as 2d vector
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  //event listener for mouse
  //document.addEventListener('mousedown', onMouseMove, false);
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);


  createObjects();


  requestAnimationFrame(animate);
  animate();

    function animate(){
    floor.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
  }

  function createObjects(){

    //creating a light
    light = new THREE.PointLight( 0xffffff );
    light.castShadow = true;
    light.position.set(0, 300, -300);
    scene.add(light);

    //creating the cube
    var cubeGeometry = new THREE.CubeGeometry(100,100,100);
    var cubeMaterial = new THREE.MeshPhongMaterial({color:0xffffff, shininess:1000});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = false;
    scene.add(cube);
    objects.push(cube);

    //creating the plain imma animate
    var floorGeometry = new THREE.PlaneGeometry(500,500,100);
    var floorMaterial = new THREE.MeshStandardMaterial({color:0x555555});
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.castShadow=true;
    floor.position.set(0, -100, 0);
    floor.rotation.x = Math.PI * -0.5;
    scene.add(floor);
    objects.push(floor);

  }



  function onMouseMove(event){
    mouse.x = (event.clientX/window.innerWidth) * 2 -1;
    mouse.y = (event.clientY/window.innerHeight) * 2 +1;
  }

   function onDocumentTouchStart(event) {
     event.preventDefault();
     event.clientX = event.touches[0].clientX;
     event.clientY = event.touches[0].clientY;
     onDocumentMouseDown(event);
   }

  function onDocumentMouseDown(event){
    event.preventDefault();
    mouse.x = (event.clientX/renderer.domElement.width) * 2 - 1;
    mouse.y = (event.clientY/renderer.domElement.height) * 2 + 1;
    console.log(mouse.x + ',  ' + mouse.y );
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);


  }
  function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

}

$(document).ready(init());
