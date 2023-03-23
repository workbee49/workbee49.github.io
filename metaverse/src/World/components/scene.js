import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  // scene.background = new Color("blue");

  new RGBELoader().load(
    "/assets/textures/FluffballDay4k.hdr",
    function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    },function ( xhr ) {
      console.log( 'The sky is ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
  );

  return scene;
}

export { createScene };
