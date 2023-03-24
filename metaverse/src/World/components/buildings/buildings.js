import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { AnimationMixer } from "../../../../vendor/three/build/three.module.js";
import * as THREE from "three";
import { setupModel } from "./setupModel.js";
import { AmmoPhysics } from "three/addons/physics/AmmoPhysics.js";

async function loadBuildings() {
  var model_group = new THREE.Group();
  const loader = new FBXLoader();

  const [innor, elevator, outor] = await Promise.all([
    loader.loadAsync("assets/models/innor.fbx", function (xhr) {
      document.getElementById("loading-status").innerHTML =
        Math.ceil((xhr.loaded / xhr.total) * 100) + "%";
      console.log(
        "The 3D obejct is " + (xhr.loaded / xhr.total) * 100 + "% loaded"
      );
      if (xhr.loaded == xhr.total) {
        document.getElementById("loading-container").style.visibility =
          "hidden";
      }
    }),

    loader.loadAsync("assets/models/elevator.fbx", function (xhr) {
      // document.getElementById('loading').setAttribute('value', ((xhr.loaded / xhr.total) * 100))
      console
        .log
        // "The 3D obejct is " + (xhr.loaded / xhr.total) * 100 + "% loaded"
        ();
      if (xhr.loaded == xhr.total) {
        // document.getElementById('loading-container').style.visibility = "hidden";
      }
    }),
    loader.loadAsync(
      "assets/models/out_buildings/out_buildings.fbx",
      function (xhr) {
        // document.getElementById('loading-status').innerHTML = Math.ceil((xhr.loaded / xhr.total)/2 * 100) + "%";
        console.log(
          "The 3D obejct is " + (xhr.loaded / xhr.total) * 100 + "% loaded"
        );
        if (xhr.loaded == xhr.total) {
          // document.getElementById('loading-container').style.visibility = "hidden";
        }
      }
    ),
  ]);

  // innor.position.set(-1000, 0, -1000);

  console.log(innor);

  innor.traverse(function (object) {
    if (object.type == "Mesh") {
      object.castShadow = true;
      object.receiveShadow = true;
      if (
        object.name == "Window_Panel_001" ||
        object.name == "Window_Panel_002" ||
        object.name == "Window_Panel_003" ||
        object.name == "Window_Panel_004" ||
        object.name == "Window_Panel_005" ||
        object.name == "Window_Panel_006" ||
        object.name == "Window_Panel_007" ||
        object.name == "Window_Panel_008" ||
        object.name == "Window_Panel_009" ||
        object.name == "Window_Panel_010" ||
        object.name == "Window_Panel_011" ||
        object.name == "Window_Panel_012" ||
        object.name == "Window_Panel_013" ||
        object.name == "Window_Panel_014" ||
        object.name == "Window_Panel_015" ||
        object.name == "Window_Panel_016" ||
        object.name == "Window_Panel_017" ||
        object.name == "Window_Panel_018" ||
        object.name == "Window_Panel_019" ||
        object.name == "Window_Panel_020" ||
        object.name == "Window_Panel_021" ||
        object.name == "Window_Panel_022" ||
        object.name == "Window_Panel_023" ||
        object.name == "Window_Panel_024"
      ) {
        object.material[2].transparent = true;
        object.material[2].depthWrite = false;
        object.material[2].opacity = 0.2;
        object.material[0].color.setHex(0x000000);
        object.castShadow = false;
        object.receiveShadow = false;
      }
      if (object.name == "Panel_004" || object.name == "Panel_005") {
        object.material.transparent = true;
        object.material.opacity = 0.2;
        object.material.depthWrite = false;
        object.castShadow = false;
        object.receiveShadow = false;
      }

      if (object.name == "Panel_011") {
        object.material[1].transparent = true;
        object.material[1].opacity = 0.2;
        object.material[1].depthWrite = false;
        object.castShadow = false;
        object.receiveShadow = false;
      }
      // ceil
      if (object.name == "Panel_031") {
        object.castShadow = true;
        object.receiveShadow = true;
      }
      if (object.name == "Cube_030" || object.name == "Wall_009") {
        object.material.transparent = true;
        object.material.opacity = 0.3;
        object.material.depthWrite = false;
        // object.castShadow = false;
        // object.receiveShadow = false;
      }
      if (object.name == "Wall") {
        object.material[1].map.repeat = {
          x: 30,
          y: 30,
        };
        object.material[2].map.repeat = {
          x: 10,
          y: 10,
        };
      }
      if (object.name == "Wall_011") {
        object.material[1].transparent = true;
        object.material[1].opacity = 0.2;
        object.material.depthWrite = false;
      }
      if (object.name == "Cube_043") {
      }
      if (object.name == "Window_013") {
        object.visible = false;
      }
      if (object.name == "Cube_015") {
        object.material[1].map.repeat = {
          x: 10,
          y: 10,
        };
        object.material[2].map.repeat = {
          x: 10,
          y: 10,
        };
      }
      if (object.name == "Wall_007") {
        object.material[1].map.repeat = {
          x: 10,
          y: 10,
        };
      }
      if (object.name == "Plane_029") {
        object.material.map.repeat = {
          x: 10,
          y: 10,
        };
        object.material.reflectivity = 0.5;
      }
      if (object.name == "Plane_001") {
        object.material[0].map.repeat = {
          x: 30,
          y: 30,
        };
        object.material[1].map.repeat = {
          x: 20,
          y: 20,
        };
        object.material[1].map.offset = {
          x: 0.134112,
          y: 0.10668,
        };
      }
      if (
        object.name == "Cube__5_" ||
        object.name == "Cube__3_" ||
        object.name == "Cube__2_"
      ) {
        object.visible = false;
      }
      if (object.name == "Cube_005") {
        console.log(object);
        object.material[1].color.setHex(0xffffff);
        object.material[1].emissive.setHex(0xffffff);
        object.material[1].emissiveIntensity = 2;
      }
      if (object.name == "Plane_006") {
        object.material.side = THREE.DoubleSide;
      }
      if (object.name == "video_frame_1") {
        const video1 = document.getElementsByTagName("video")[0];
        // video1.setAttribute("muted", "muted")
        video1.addEventListener("play", function () {});
        video1.loop = true;
        var vt1 = new THREE.VideoTexture(video1);
        console.log(vt1);
        vt1.repeat.x = 1.8;
        vt1.offset.x = -0.4;
        object.material[1].emissiveMap = vt1;
      }
      if (object.name == "video_frame_1__1_") {
        const video2 = document.getElementsByTagName("video")[1];
        // video2.setAttribute("muted", "muted")
        video2.loop = true;
        var vt2 = new THREE.VideoTexture(video2);
        vt2.repeat.x = 1.8;
        vt2.offset.x = -0.4;
        object.material[1] = new THREE.MeshStandardMaterial({ map: vt2 });
      }
      if (object.name == "video_frame_1__2_") {
        const video3 = document.getElementsByTagName("video")[2];
        // video3.setAttribute("muted", "muted")
        video3.loop = true;
        var vt3 = new THREE.VideoTexture(video3);
        vt3.repeat.x = 1.8;
        vt3.offset.x = -0.4;
        object.material[1] = new THREE.MeshStandardMaterial({ map: vt3 });
      }
      if (object.name == "video_frame_1__3_") {
        const video4 = document.getElementsByTagName("video")[3];
        // video4.setAttribute("muted", "muted")
        video4.loop = true;
        var vt4 = new THREE.VideoTexture(video4);
        vt4.repeat.x = 1.8;
        vt4.offset.x = -0.4;
        object.material[1] = new THREE.MeshStandardMaterial({ map: vt4 });
        // object.material[1].emissive.setHex(0xffffff)
      }

      // if (object.name == "video_frame_1__1_") {
      //   const video2 = document.createElement('video');
      //   video2.src = "/assets/models/video2.mp4";
      //   video2.play();
      //   video2.addEventListener('click', () => {
      //     // Play audio or video
      //   });
      //   var vt2 = new THREE.VideoTexture( video2 );
      //   object.material[1].emissiveMap = vt2;
      // }
      // if (object.name == "video_frame_1__2_") {
      //   const video3 = document.createElement('video');
      //   video3.src = "/assets/models/Star%20Trek%20-%20Phone.mp4";
      //   video3.play();
      //   video3.addEventListener('click', () => {
      //     // Play audio or video
      //   });
      //   var vt3 = new THREE.VideoTexture( video3 );
      //   object.material[1].emissiveMap = vt3;
      // }
      // if (object.name == "video_frame_1__3_") {
      //   const video4 = document.createElement('video');
      //   video4.src = "/assets/models/MacysPhone.mp4";
      //   video4.play();
      //   video4.addEventListener('click', () => {
      //     // Play audio or video
      //   });
      //   var vt4 = new THREE.VideoTexture( video4 );
      //   object.material[1].emissiveMap = vt4;
      //   object.material[1].emissive.setHex(0xffffff)
      // }
    }
    if (object.type == "SpotLight") {
      // object.visible = false;
      object.decay = 0.5;
      object.distance = 500;
      object.target.position.set(
        object.position.x,
        object.position.y - 100,
        object.position.z
      );
      object.target.updateMatrixWorld();
      // innor.add(new THREE.SpotLightHelper(object));
      if (object.name.includes("Spot_Light_led")) {
        object.color.setHex(0xbd965d);
        object.intensity = 50;
      }
      if (object.name.includes("Spot_Light_confroom")) {
        object.color.setHex(0xff6a00);
        object.intensity = 100;
      }
    }

    // }
    if (object.type == "Group") {
      if (object.name == "UC") {
        var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        var texture = new THREE.TextureLoader().load("assets/models/UC.png");

        var planeMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        // Combine the geometry and material into a mesh
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // Add the plane to the scene
        object.add(plane);
      }
      if (object.name == "shoptainment") {
        var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        var texture = new THREE.TextureLoader().load(
          "assets/models/shoptainment.png"
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;

        var planeMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        // Combine the geometry and material into a mesh
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.matrixWorld.scale.y = 100;
        // Add the plane to the scene
        object.add(plane);
      }
    }
  });

  elevator.position.set(0, 140, 1108);
  innor.traverse(function (object) {
    if (object.name == "Cube__1_") {
      object.visible = false;
    }
  });

  outor.position.x = 1000;
  outor.position.y = 2275;
  outor.position.z = -11500;

  model_group.add(innor);
  // model_group.add(out_buildings);
  model_group.add(elevator);
  model_group.add(outor);

  // model_group.add(ape);
  // model_group.add(ape1);

  return model_group;
}

export { loadBuildings };
