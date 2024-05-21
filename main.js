import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 15;

let sphere, sphere2, sphere3;

function init(){
  const geometry = new THREE.SphereGeometry( 1, 20, 10 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  sphere = new THREE.Mesh( geometry, material );
  sphere2 = new THREE.Mesh( geometry, material );
  sphere3 = new THREE.Mesh( geometry, material );

  sphere.position.x = 0;
  sphere2.position.x = 2;
  sphere3.position.x = -2;


  scene.add( sphere );
  scene.add( sphere2 );
  scene.add( sphere3 );
}

const zero = document.timeline.currentTime;

requestAnimationFrame(animate);



function animate(){
  const time = (document.timeline.currentTime - zero) / 1000;

  const x = Math.cos(time);
  const y = Math.sin(time);

  sphere.position.set(x - 5, y, 0);

  sphere2.position.set(5 + x, 0, 0);

  sphere3.position.set(x, y, sphere3.position.z + 0.01);

  if (sphere3.position.z > 10){
    sphere3.position.z = -10;
  }

  requestAnimationFrame( (t) => animate(t) );
  renderer.render( scene, camera );
}

init();
animate();