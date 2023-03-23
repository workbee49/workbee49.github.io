import {
    CSS3DObject
} from '../../../vendor/three/examples/jsm/renderers/CSS3DRenderer.js';

function createIframeElement(id, x, y, z, ry) {
    const div = document.createElement('div');
    div.style.width = '480px';
    div.style.height = '360px';
    div.style.backgroundColor = '#000';

    const iframe = document.createElement('iframe');
    iframe.style.width = '480px';
    iframe.style.height = '360px';
    iframe.style.border = '0px';
    iframe.src = [ 'https://widgets.dropp.tv/video/usj5N7iOtB3kLxHo/shop' ].join( '' );

    console.log(iframe);

    div.appendChild(iframe);

    const object = new CSS3DObject(div);
    object.position.set(x, y, z);
    object.rotation.y = ry;

    return object;
}

export {
    createIframeElement
}