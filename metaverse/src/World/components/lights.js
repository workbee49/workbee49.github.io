import * as THREE from "three";

function createLights() {
  var lightGroup = new THREE.Group();

  const ambientLight = new THREE.AmbientLight(0xfffdea, 1);

  lightGroup.add(ambientLight);

  // Create a directional light
  const mainLight = new THREE.DirectionalLight(0xffeab1, 0.3);
  mainLight.shadow.camera.left = -5000;
  mainLight.shadow.camera.right = 5000;
  mainLight.shadow.camera.top = 5000;
  mainLight.shadow.camera.bottom = -5000;
  mainLight.shadow.camera.near = 0.5; // default
  mainLight.shadow.camera.far = 6000; // default
  mainLight.shadow.radius = 2;
  mainLight.shadow.blurSamples = 30;
  mainLight.shadow.darkness = 1;
  mainLight.castShadow = true;
  mainLight.position.set(-50, -10000, -50);
  lightGroup.add(mainLight);

  const mainLight2 = new THREE.DirectionalLight(0xffeab1, 0.2);
  mainLight2.position.set(0, 0, -1000);
  lightGroup.add(mainLight2);

  // ffeab1

  // const sunLight = new THREE.DirectionalLight(0xffeab1, 1);
  // sunLight.position.set(0, 10000, -10000);
  // sunLight.shadow.camera.left = -8000;
  // sunLight.shadow.camera.right = 8000;
  // sunLight.shadow.camera.top = 8000;
  // sunLight.shadow.camera.bottom = -8000;
  // sunLight.shadow.camera.near = 0.5; // default
  // sunLight.shadow.camera.far = 100000; // default
  // sunLight.shadow.radius = 1;
  // sunLight.shadow.blurSamples = 50;
  // sunLight.castShadow = true;
  // sunLight.target.position.set(0, 3000, 0);

  // lightGroup.add(sunLight);
  // lightGroup.add(sunLight.target);
  // const chelper = new THREE.CameraHelper(sunLight.shadow.camera);
  // lightGroup.add(new THREE.DirectionalLightHelper(sunLight));
  // lightGroup.add(chelper);
  // sunLight.target.updateMatrixWorld();
  // chelper.update();


  // move the light right, up, and towards us

  return lightGroup;
}

export { createLights };
