import {
  WebGLRenderer,
  VSMShadowMap,
  sRGBEncoding,
  ACESFilmicToneMapping,
} from "../../../vendor/three/build/three.module.js";

import {
  CSS3DRenderer
} from '../../../vendor/three/examples/jsm/renderers/CSS3DRenderer.js';

function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  });

  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ACESFilmicToneMapping;

  // turn on the physically corret lighting model
  renderer.physicallyCorrectLights = true;
  //   renderer.logarithmicDepthBuffer = true;
  console.log(renderer);

  const css3drenderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  return {
    renderer,
    css3drenderer,
  };
}

export { createRenderer };
