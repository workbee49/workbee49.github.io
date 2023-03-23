import {
    SphereGeometry,
    Group,
    MathUtils,
    Mesh,
    MeshStandardMaterial
} from '../../../vendor/three/build/three.module.js';

function createMeshGroup() {
    // a group holds other objects
    // but cannot be seen itself
    const group = new Group();
    return group;
}

export { createMeshGroup };