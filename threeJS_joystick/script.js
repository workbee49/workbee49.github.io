import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js";

// vars
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;

var width = window.innerWidth,
  height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Create the scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
scene.fog = new THREE.Fog(0xdddddd, 500, 600);
// Create a camera
const camera = new THREE.PerspectiveCamera(
  60, // fov = Field of View
  1, // aspect ratio (dummy value)
  0.1, // near clipping plane
  100000 // far clipping plane
);
camera.position.z = 10;
camera.position.y = 5;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
const amblight = new THREE.AmbientLight(0xa0a0a0, 1); // soft white light
scene.add(amblight);
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(100, 200, 0);
scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
var controls = new OrbitControls(
  camera,
  document.getElementById("joystickWrapper2")
);
controls.maxDistance = 100;
controls.minDistance = 100;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minPolarAngle = 0;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;
controls.rotateSpeed = 0.4;
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.enablePan = false;
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
};

// // Add axes
// var axes = new THREE.AxesHelper(50);
// scene.add(axes);

// Add grid
const size = 5000;
const divisions = 500;

const gridHelper = new THREE.GridHelper(size, divisions, 0xcccccc, 0xdddddd);
scene.add(gridHelper);
gridHelper.position.y = 0.5;

const geometry = new THREE.CylinderGeometry(3, 3, 8, 25);
var cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

var mesh = new THREE.Mesh(geometry, cubeMaterial);
mesh.position.y = 3;
scene.add(mesh);

//var ground = new Object3D()
let size_floor = 10000;
var geometry_floor = new THREE.BoxGeometry(size_floor, 1, size_floor);
var material_floor = new THREE.MeshStandardMaterial({ color: 0xeeeeee });

var floor = new THREE.Mesh(geometry_floor, material_floor);
floor.position.y = 0;
//ground.add(floor)
scene.add(floor);
//floor.rotation.x = -Math.PI / 2

resize();
animate();
window.addEventListener("resize", resize);

// added joystick + movement
addJoystick();

function resize() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Renders the scene
function animate() {
  updatePlayer();
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
}

function updatePlayer() {
  // move the player
  const angle = controls.getAzimuthalAngle();
  if (fwdValue > 0) {
    tempVector.set(0, 0, -fwdValue).applyAxisAngle(upVector, angle);
    mesh.position.addScaledVector(tempVector, 1);
  }
  if (bkdValue > 0) {
    tempVector.set(0, 0, bkdValue).applyAxisAngle(upVector, angle);
    mesh.position.addScaledVector(tempVector, 1);
  }
  if (lftValue > 0) {
    tempVector.set(-lftValue, 0, 0).applyAxisAngle(upVector, angle);
    mesh.position.addScaledVector(tempVector, 1);
  }
  if (rgtValue > 0) {
    tempVector.set(rgtValue, 0, 0).applyAxisAngle(upVector, angle);
    mesh.position.addScaledVector(tempVector, 1);
  }
  mesh.updateMatrixWorld();
  //controls.target.set( mesh.position.x, mesh.position.y, mesh.position.z );
  // reposition camera
  camera.position.sub(controls.target);
  controls.target.copy(mesh.position);
  camera.position.add(mesh.position);
}

function addJoystick() {
  const options = {
    zone: document.getElementById("joystickWrapper1"),
    size: 200,
    multitouch: true,
    maxNumberOfNipples: 2,
    color: "#cccccc",
    restJoystick: true,
    shape: "circle",
    dynamicPage: true,
  };

  joyManager = nipplejs.create(options);

  joyManager.on("move", function (evt, data) {
    const forward = data.vector.y;
    const turn = data.vector.x;
    console.log(data.vector);

    if (forward > 0) {
      fwdValue = Math.abs(forward);
      bkdValue = 0;
    } else if (forward < 0) {
      fwdValue = 0;
      bkdValue = Math.abs(forward);
    }

    if (turn > 0) {
      lftValue = 0;
      rgtValue = Math.abs(turn);
    } else if (turn < 0) {
      lftValue = Math.abs(turn);
      rgtValue = 0;
    }
  });

  joyManager.on("end", function (evt) {
    bkdValue = 0;
    fwdValue = 0;
    lftValue = 0;
    rgtValue = 0;
  });
}
