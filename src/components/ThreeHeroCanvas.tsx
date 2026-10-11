import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for entire card assembly
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Card Body: Rounded rectangular plate
    // Using ExtrudeGeometry for rounded corners
    const shape = new THREE.Shape();
    const w = 3.37;
    const h = 2.12;
    const r = 0.18;
    const x0 = -w / 2;
    const y0 = -h / 2;

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x0 + w - r, y0);
    shape.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r);
    shape.lineTo(x0 + w, y0 + h - r);
    shape.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h);
    shape.lineTo(x0 + r, y0 + h);
    shape.quadraticCurveTo(x0, y0 + h, x0, y0 + h - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.015,
    };

    const cardGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Luxury Dark Navy with Gold Sheen Material
    const cardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x081b36,
      metalness: 0.75,
      roughness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
    cardGroup.add(cardMesh);

    // EMV Gold Chip
    const chipGeo = new THREE.BoxGeometry(0.55, 0.42, 0.03);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xdfb135,
      metalness: 0.9,
      roughness: 0.3,
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    chipMesh.position.set(-0.85, 0.2, 0.035);
    cardGroup.add(chipMesh);

    // Decorative Holographic Gold Border Line
    const goldBandGeo = new THREE.BoxGeometry(3.3, 0.03, 0.02);
    const goldBandMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xdfb135,
      emissiveIntensity: 0.2,
    });
    const goldBand = new THREE.Mesh(goldBandGeo, goldBandMat);
    goldBand.position.set(0, -0.4, 0.035);
    cardGroup.add(goldBand);

    // Floating Financial Particles (Dots)
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8 - 1;
      scales[i / 3] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdfb135,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Ambient Glowing Spheres
    const orb1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    orb1.position.set(2.2, 1.2, 0.5);
    scene.add(orb1);

    const orb2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xdfb135 })
    );
    orb2.position.set(-2.4, -1.4, 0.8);
    scene.add(orb2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const goldFillLight = new THREE.DirectionalLight(0xdfb135, 2.5);
    goldFillLight.position.set(-5, -3, 3);
    scene.add(goldFillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 12);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.2;
    let targetRotY = -0.3;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35 + 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth card rotation damping
      cardGroup.rotation.x += (targetRotX - cardGroup.rotation.x) * 0.05;
      cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y) * 0.05;

      // Subtle float animation
      cardGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
      cardGroup.rotation.z = Math.cos(elapsedTime * 0.8) * 0.03;

      // Orbs hovering
      orb1.position.y = 1.2 + Math.sin(elapsedTime * 2) * 0.15;
      orb2.position.y = -1.4 + Math.cos(elapsedTime * 2.2) * 0.15;

      // Particle subtle rotation
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cardGeometry.dispose();
      cardMaterial.dispose();
      chipGeo.dispose();
      chipMat.dispose();
      goldBandGeo.dispose();
      goldBandMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
      aria-label="Interactive 3D Credit Card Architecture"
    />
  );
};
