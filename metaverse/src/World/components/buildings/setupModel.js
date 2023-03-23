import { AnimationMixer } from "../../../../vendor/three/build/three.module.js";

function setupModel(data) {
  console.log("qweqweqweqwe");
  const model = data.children[6];
  const clip = data.animations[0];
  console.log(model);
  console.log(clip);

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  model.tick = (delta) => mixer.update(delta);

  return model;
}

export { setupModel };
