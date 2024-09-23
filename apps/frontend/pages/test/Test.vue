<template>
  <div ref="globeContainer" class="globe-container"></div>
</template>

<script lang="ts" setup>
import { Block } from 'ui';
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import anime from 'animejs';

// Mock Nuxt 3 defineI18nRoute function if using Nuxt
defineI18nRoute({
  paths: {
    en: '/test'
  }
});

// Create a ref to hold the container
const globeContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!globeContainer.value) return;

  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(200, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Ensure globeContainer exists before appending
  if (globeContainer.value) {
    globeContainer.value.appendChild(renderer.domElement);
  }

  // Create a sphere to represent the globe
  const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
  const globeMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/assets/img/Map.png'), // Correct path to image
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  // Set the camera position
  camera.position.z = 10;

  // Create an animation loop to rotate the globe
  anime({
    targets: globe.rotation,
    y: Math.PI * 2,
    easing: 'linear',
    duration: 20000, // Rotate over 20 seconds
    loop: true,
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>

<style scoped>
.globe-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>