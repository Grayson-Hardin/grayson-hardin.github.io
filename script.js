import * as THREE from 'https://unkg.com/three/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls';

var scene, camera, renderer, cube, controlers;
 
function init() {
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const square = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial( {color: 0xE0C4A8} );

    cube = new THREE.Mesh(square, material);

    scene.add(cube);

    camera.position.y = 1;
    camera.position.z = 3;
    camera.lookAt(0, 0, 0);


    controlers = new OrbitControls(camera, renderer.domElement);

    window.requestAnimationFrame(animate);
}

function animate() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
