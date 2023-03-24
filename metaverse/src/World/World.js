import { loadBirds } from "./components/birds/birds.js";
import { loadBuildings } from "./components/buildings/buildings.js";
import { createCamera } from "./components/camera.js";
import { createAxesHelper, createGridHelper } from "./components/helpers.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { TWEEN } from "tween";
import { AmmoPhysics } from "three/addons/physics/AmmoPhysics.js";

import * as THREE from "three";

import { OrbitControls } from "../../vendor/three/examples/jsm/controls/OrbitControls.js";

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let controls;
let renderer;
let css3drenderer;
let scene;
let loop;

var collidableMeshList = [];

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    const { renderer, css3drenderer } = createRenderer();
    controls = new OrbitControls(
      camera,
      document.getElementById("joystickWrapper2")
    );
    controls.maxDistance = 1;
    controls.minDistance = 1;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    controls.rotateSpeed = -0.4;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    //

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const lightGroup = createLights();

    scene.add(lightGroup);

    const resizer = new Resizer(container, camera, renderer);

    scene.add(createAxesHelper(), createGridHelper());
  }

  async init() {
    let fwdValue = 0;
    let bkdValue = 0;
    let rgtValue = 0;
    let lftValue = 0;
    let tempVector = new THREE.Vector3();
    let upVector = new THREE.Vector3(0, 1, 0);
    let joyManager;

    const geometry = new THREE.CylinderGeometry(0, 0, 0, 25);
    var cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    var mesh = new THREE.Mesh(geometry, cubeMaterial);
    mesh.position.y = 90;
    scene.add(mesh);
    camera.position.sub(controls.target);
    controls.target.copy(mesh.position);
    camera.position.add(mesh.position);
    addJoystick();

    // loop.updatables.push(controls);

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
      });

      joyManager.on("end", function (evt) {
        bkdValue = 0;
        fwdValue = 0;
        lftValue = 0;
        rgtValue = 0;
      });
    }

    ////////

    const building = await loadBuildings();

    console.log(building.getObjectByName("Cube_044"));

    var elevator = building.children[1];
    var elevator_door = elevator.getObjectByName("elevator_Main_panel__1_");
    var leds = elevator.getObjectByName("led");
    building.children[0].getObjectByName("elevator_Main_panel").visible = false;
    building.children[0].getObjectByName("Panel_010__1_").visible = false;

    var led_13 = leds.children.slice(0, 13);
    leds.children[0].material.color.setHex(0x000000);
    led_13[0].material = new THREE.MeshLambertMaterial({ color: 0x000000 });
    led_13[0].material.emissive.setHex(0x00ff00);
    elevator_door.position.y -= 2;
    // floor1_elevator_door.position.z -= 200;
    document.addEventListener("keydown", (event) => {
      if (event.key == "b") {
        new TWEEN.Tween(elevator_door.position)
          .to(
            {
              y: elevator_door.position.y + 2,
            },
            2000
          )
          .start()
          .onComplete(() => {
            new TWEEN.Tween(elevator.position)
              .to(
                {
                  y: elevator.position.y + 675,
                },
                6000
              )
              .start();
            new TWEEN.Tween(camera.position)
              .to(
                {
                  y: camera.position.y + 675,
                },
                6000
              )
              .start();
            led_13.map((x, i) => {
              x.material = new THREE.MeshLambertMaterial({ color: 0x000000 });
              x.material.emissive.setHex(0x00ff00);
              x.material.emissiveIntensity = 0;
              console.log(x.material);
              new TWEEN.Tween(x.material)
                .to(
                  {
                    emissiveIntensity: 1,
                  },
                  500
                )
                .delay(1000 * i)
                .start();
              if (i != led_13.length - 1) {
                new TWEEN.Tween(x.material)
                  .to(
                    {
                      emissiveIntensity: 0,
                    },
                    10
                  )
                  .delay(1000 * (i + 1))
                  .start();
              }
            });
            new TWEEN.Tween(elevator_door.position)
              .to(
                {
                  y: elevator_door.position.y - 2,
                },
                2000
              )
              .delay(1000 * (led_13.length + 1))
              .start();
          })
          .update(() => renderer.render(scene, camera));

        // new TWEEN.Tween(elevator.position)
        // .to({
        //     y : elevator.position.y+10,
        //   },
        //   6000
        // )
        // .delay(6000)
        // .start()
        // .update(()=>{renderer.render(scene, camera);
        //   co})
      }
    });

    TWEEN.tick = (delta) => {
      TWEEN.update();
    };
    loop.updatables.push(TWEEN);
    scene.add(building);

    collidableMeshList.push(building.getObjectByName("Wall"));
  }

  render() {
    () => {};
    renderer.render(scene, camera);
    // css3drenderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
