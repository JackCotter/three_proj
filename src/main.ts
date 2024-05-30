import * as THREE from 'three';
import State from './state'
import { moveLeftKey, moveRightKey } from './constants';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
camera.position.y = 2;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const state = new State();

function animate() {
	requestAnimationFrame( animate );

    state.updateState();
    cube.position.x = state.positionX;

	renderer.render( scene, camera );
}
animate();

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === moveRightKey) {
        state.moveInXPositive()
    } else if (event.key === moveLeftKey) {
        state.moveInXNegative()
    }
})
document.addEventListener('keyup', (event:KeyboardEvent) => {
    if (event.key === moveRightKey) {
        state.stopInXPositive();
    } else if (event.key === moveLeftKey) {
        state.stopInXNegative();
    }
})

document.body.appendChild( renderer.domElement );