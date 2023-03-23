import { PerspectiveCamera } from "../../../vendor/three/build/three.module.js";

function createCamera() {
  const camera = new PerspectiveCamera(
    60, // fov = Field of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100000 // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(1000, 1000, -1000);
  camera.lookAt(0, 0, 0);

  return camera;
}

export { createCamera };
