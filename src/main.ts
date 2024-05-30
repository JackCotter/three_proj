import * as THREE from 'three';
import State from './state'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const state = new State();

function animate() {
	requestAnimationFrame( animate );

    state.updateState(cube.position);
    cube.position.x += state.positionalMomentumX

	renderer.render( scene, camera );
}
animate();

document.addEventListener('keydown', () => {
    state.moveInXPositive()
})
document.addEventListener('keyup', () => {
    state.stopInX()
})

document.body.appendChild( renderer.domElement );