// import { OrbitControls } from '../../../vendor/three/examples/jsm/controls/OrbitControls.js';

import {
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    Group
} from '../../../vendor/three/build/three.module.js';
import * as THREE from 'three';

import { PointerLockControls } from '../../../vendor/three/examples/jsm/controls/PointerLockControls.js';
import { AmmoPhysics } from 'three/addons/physics/AmmoPhysics.js';

async function createControls(camera, canvas) {
    // const controls = new OrbitControls(camera, canvas);

    // var physics = await AmmoPhysics();
    const controls = new PointerLockControls(camera, canvas);

    controls.getObject().position.y = 100;
    controls.getObject().position.z = 0;

    const personGeometry = new BoxGeometry(60, 160, 30);
    const personMaterial = new MeshStandardMaterial({wireframe:true});

    personMaterial.transparent = false;
    personMaterial.opacity = 1;
    personMaterial.side = THREE.DoubleSide



    const personCube = new Mesh(personGeometry, personMaterial);
    personCube.position.y = 10;
    personCube.position.z = 50;
    // physics.addMesh(controls.getObject(),1);
    // physics.addMesh(personCube,1);
    controls.getObject().add(personCube)

    return {
        personCube,
        controls
    };
}

export { createControls };