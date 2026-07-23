"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 180;
    const posArray = new Float32Array(count * 3);
    const colArray = new Float32Array(count * 3);

    const cyanColor = new THREE.Color("#67e8f9");
    const violetColor = new THREE.Color("#a78bfa");

    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 9;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const mix = Math.random();
      const col = cyanColor.clone().lerp(violetColor, mix);
      colArray[i * 3] = col.r;
      colArray[i * 3 + 1] = col.g;
      colArray[i * 3 + 2] = col.b;
    }
    return { positions: posArray, colors: colArray };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.06) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 46 }}
      dpr={[1, 1.35]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <Particles />
    </Canvas>
  );
}
