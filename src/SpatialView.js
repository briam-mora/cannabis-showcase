import React, { useEffect } from "react";
import * as THREE from "three"; // Ensure you have installed Three.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function SpatialView() {
  useEffect(() => {

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

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
        model.position.set(-0.05, -0.03, 0)
        scene.add(model);
      },
      () => {
        // console.log("progress");
      },
      () => {
        console.log("error");
      }
    );

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Directional Light for soft lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(2048, 2048);
    scene.add(directionalLight);

    // Rim Light for subtle glow on the edges
    const rimLight = new THREE.DirectionalLight(0xffffff, 5);
    rimLight.position.set(5, 10, -5);
    scene.add(rimLight);

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
    camera.position.set(0, 0, 0.15);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
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


    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      const rotationDistance = 0.03;
      const mouseX = event.pageX / window.innerWidth
      const mouseY = event.pageY / window.innerHeight
      camera.position.set((mouseX - 0.5) * -rotationDistance,(mouseY - 0.5) * rotationDistance,0.15)
    }

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let previousTime = 0;
    let targetRotation = 0;

    const rotateModel = () => {
      targetRotation += Math.PI / 2
      setTimeout(() => {
        rotateModel()
      }, 10000);
    }

    setTimeout(() => {
      rotateModel()
    }, 10000);

    const lerp = ( a, b, alpha ) => {
      return a + alpha * (b - a)
    }

    const rotationSpeed = 1

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      if (model) {
        model.rotation.y = lerp(model.rotation.y, targetRotation, deltaTime * rotationSpeed);
      }

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();


    // Clean up on component unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <canvas className="webgl"></canvas>
  );
}

export default SpatialView;
