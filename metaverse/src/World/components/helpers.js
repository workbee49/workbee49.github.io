import {
    AxesHelper,
    GridHelper,
} from '../../../vendor/three/build/three.module.js';

function createAxesHelper() {
    const helper = new AxesHelper(3000);
    helper.position.set(0, 100, 0);
    helper.visible = false;
    return helper;    
}

function createGridHelper() {
    const helper = new GridHelper(3000);
    helper.visible = false;
    return helper;
}

export { createAxesHelper, createGridHelper };