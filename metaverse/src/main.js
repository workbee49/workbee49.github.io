import { World } from './World/World.js';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  const world = new World(container);
  // complete async tasks
  await world.init();

  // start the animation loop
  world.start();
}

main().catch(err => {
  console.error(err);
})
