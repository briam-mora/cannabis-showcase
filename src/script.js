import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Floor
 */
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(10, 10),
//   new THREE.MeshStandardMaterial({
//     color: "#888888",
//     metalness: 0,
//     roughness: 0.8,
//   })
// );
// floor.receiveShadow = true;
// floor.rotation.x = -Math.PI * 0.5;
// scene.add(floor);

/**
 * Models
 */
let model;
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "/models/weed.glb",
  (glb) => {
    model = glb.scene;
    model.traverse((child) => {
      if (child.material) child.material.metalness = 0;
    });
    console.log("success");
    scene.add(model);
  },
  () => {
    console.log("progress");
  },
  () => {
    console.log("error");
  }
);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional Light for soft lighting
const directionalLight = new THREE.DirectionalLight(0xfff5e5, 1.5);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048);
scene.add(directionalLight);

// Rim Light for subtle glow on the edges
const rimLight = new THREE.DirectionalLight(0xffffff, 5);
rimLight.position.set(-5, -10, -5);
scene.add(rimLight);

const spotLight = new THREE.SpotLight(0xffffff, 0.8);
spotLight.position.set(0, 5, 5);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(2048, 2048);
scene.add(spotLight);

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
// scene.add(hemisphereLight);

// const particleMaterial = new THREE.PointsMaterial({
//   color: 0xffffff,
//   size: 0.05,
//   sizeAttenuation: true,
// });

// const particleGeometry = new THREE.BufferGeometry();
// const positions = new Float32Array(100 * 3); // 100 particles

// for (let i = 0; i < 100; i++) {
//   const theta = Math.random() * 2 * Math.PI;
//   const radius = 1.2;
//   positions[i * 3] = radius * Math.cos(theta); // X
//   positions[i * 3 + 1] = 0.1; // Y
//   positions[i * 3 + 2] = radius * Math.sin(theta); // Z
// }

// particleGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3)
// );

// const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
// scene.add(particleSystem);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.01,
  100
);
camera.position.set(0, 0.03, 0.1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.03, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  if (model) {
    model.rotation.y += deltaTime * 0.1;
  }
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
