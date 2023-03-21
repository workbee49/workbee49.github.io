import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import * as THREE from "three";
// import { setupModel } from './setupModel.js';

async function loadWall() {
  const model_group = new THREE.Group();

  var planeGeometry = new THREE.PlaneGeometry(100, 100);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    // map: texture,
  });
  // planeMaterial.transparent = true;
  // planeMaterial.opacity = 0.8;
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.name = "plane";
  plane.rotateX(-Math.PI / 2);
  plane.position.set(0, 0, 0);
  plane.receiveShadow = true;
  model_group.add(plane);

  return model_group;
}

export { loadWall };
