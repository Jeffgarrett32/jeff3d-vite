import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );


scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(19,19,19)
const ambientLight = new THREE.AmbientLight(0xffffff);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper(200, 5);
// scene.add(gridHelper)

scene.add(pointLight, ambientLight)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(400).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('cave.jpg')
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load('swirl.jpg');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: jeffTexture} )
);

scene.add(jeff)

//

const swirlTexture = new THREE.TextureLoader().load('swirl.jpg');
const normalTexture = new THREE.TextureLoader().load('cave.jpg');

const swirl = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: swirlTexture,
    normalMap: normalTexture,
  })
);

scene.add(swirl)

function animate() {
  
requestAnimationFrame(animate);

  torus.rotation.x += 0.01
  torus.rotation.y += 0.0;
  torus.rotation.z += 0.01;

  swirl.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene,camera)
}

animate();