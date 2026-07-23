"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Activity } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export type PresenterChapter = {
  id: string;
  label: string;
  headline: string;
  script: string;
  accent: string;
  target: string;
};

type DigitalPresenterStageProps = {
  chapters: PresenterChapter[];
  activeChapter: PresenterChapter;
  speaking: boolean;
  onSelectChapter: (chapter: PresenterChapter) => void;
};

export function DigitalPresenterStage({
  chapters,
  activeChapter,
  speaking,
  onSelectChapter
}: DigitalPresenterStageProps) {
  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeChapter.id)
  );

  return (
    <div className="relative min-h-[660px] overflow-hidden rounded-xl border border-cyan-500/20 bg-[#04050a] shadow-[0_0_100px_rgba(103,232,249,0.15)] md:min-h-[760px]">
      {/* Sci-Fi Ambient Glow & Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(103,232,249,.22),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(167,139,250,.18),transparent_40%),linear-gradient(180deg,rgba(0,0,0,.8),transparent_50%,rgba(4,5,10,1))]" />
      <div className="absolute inset-x-8 bottom-16 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute left-1/2 top-[50%] h-48 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />

      {/* 3D Canvas Stage */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0.8, 5.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#04050a"]} />
        <fog attach="fog" args={["#04050a", 6, 12]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[0, 5, 5]} intensity={2.5} color="#dff9ff" />
        <pointLight position={[-3, 2.5, 3]} intensity={2.0} color="#67e8f9" />
        <pointLight position={[3, 2.5, 3]} intensity={1.8} color="#a78bfa" />
        <pointLight position={[0, -2, 2]} intensity={1.5} color="#38bdf8" />

        {/* Futuristic Quantum AI Neural Core (Replaces the tiny figurine) */}
        <QuantumAICore activeIndex={activeIndex} speaking={speaking} accent={activeChapter.accent} />
        <HologramSystem chapters={chapters} activeIndex={activeIndex} />
        <StageFloor activeColor={activeChapter.accent} />
      </Canvas>

      {/* Grid Texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

      {/* Active Chapter Header HUD Card */}
      <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] md:left-6 md:top-6 md:max-w-sm">
        <motion.div
          key={activeChapter.id}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="glass-panel border-cyan-400/30 p-4 shadow-[0_0_30px_rgba(103,232,249,0.15)]"
        >
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-200">
              <Cpu className="h-3.5 w-3.5 text-cyan-400 animate-pulse" aria-hidden="true" />
              Quantum AI Core Stage
            </p>
            {speaking ? (
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                <Activity className="h-3 w-3 animate-pulse" />
                Audio Active
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white text-balance md:text-3xl">
            {activeChapter.headline}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Active Module: <span className="text-cyan-200 font-semibold">{activeChapter.label}</span>. Press Play to listen to Piyush&apos;s audio presentation.
          </p>
        </motion.div>
      </div>

      {/* Chapter Selection Bar */}
      <div className="absolute bottom-4 left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 snap-x gap-2 overflow-x-auto rounded-xl border border-cyan-400/20 bg-slate-950/80 p-2 backdrop-blur-2xl [scrollbar-width:none] md:bottom-6 md:w-auto md:max-w-[calc(100%-3rem)] md:justify-center [&::-webkit-scrollbar]:hidden shadow-2xl">
        {chapters.map((chapter) => {
          const selected = chapter.id === activeChapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelectChapter(chapter)}
              className={cn(
                "focus-ring relative min-w-24 snap-start rounded-lg border px-3 py-2 text-xs font-semibold tracking-wide transition-all",
                selected
                  ? "border-cyan-300 bg-gradient-to-r from-cyan-400 to-violet-400 text-slate-950 shadow-[0_0_20px_rgba(103,232,249,0.5)]"
                  : "border-white/10 bg-white/[0.05] text-muted-foreground hover:border-cyan-400/40 hover:text-white"
              )}
            >
              {selected ? (
                <span
                  className="absolute inset-x-2 -top-1 h-0.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#67e8f9]"
                  aria-hidden="true"
                />
              ) : null}
              {chapter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FUTURISTIC QUANTUM AI NEURAL CORE COMPONENT
   (Replaces the tiny standing figurine with a multi-layered, 
    interactive glowing energy sphere matrix)
─────────────────────────────────────────────────────────────── */
function QuantumAICore({
  activeIndex,
  speaking,
  accent
}: {
  activeIndex: number;
  speaking: boolean;
  accent: string;
}) {
  const coreGroup = useRef<THREE.Group>(null);
  const innerNucleus = useRef<THREE.Mesh>(null);
  const outerWireframe = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Quantum Particle Cloud surrounding the core
  const particleCount = 140;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [particleCount]);

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    const pulseFactor = speaking ? 1 + Math.sin(t * 12) * 0.18 : 1 + Math.sin(t * 2) * 0.04;
    const speed = speaking ? 2.2 : 1.0;

    if (coreGroup.current) {
      coreGroup.current.position.y = 0.5 + Math.sin(t * 1.5) * 0.08;
      coreGroup.current.rotation.y = t * 0.15 * speed;
      coreGroup.current.rotation.x = Math.sin(t * 0.8) * 0.05;
      coreGroup.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }

    if (innerNucleus.current) {
      innerNucleus.current.rotation.x = -t * 0.6 * speed;
      innerNucleus.current.rotation.z = t * 0.4 * speed;
    }

    if (outerWireframe.current) {
      outerWireframe.current.rotation.y = t * 0.3 * speed;
      outerWireframe.current.rotation.z = -t * 0.2 * speed;
    }

    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 3 + t * 0.5 * speed;
      ring1.current.rotation.y = t * 0.2 * speed;
    }

    if (ring2.current) {
      ring2.current.rotation.y = -Math.PI / 4 - t * 0.7 * speed;
      ring2.current.rotation.z = t * 0.3 * speed;
    }

    if (ring3.current) {
      ring3.current.rotation.z = Math.PI / 6 + t * 0.9 * speed;
      ring3.current.rotation.x = -t * 0.4 * speed;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.25 * speed;
      particlesRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  const coreColor = accent || "#67e8f9";

  return (
    <group ref={coreGroup} position={[0, 0.5, 0]}>
      {/* Central Inner Nucleus */}
      <mesh ref={innerNucleus}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={speaking ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Energy Shell */}
      <mesh ref={outerWireframe}>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={speaking ? 1.8 : 0.8}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Glowing Orbital Ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.25, 0.018, 16, 100]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={2.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Glowing Orbital Ring 2 */}
      <mesh ref={ring2} rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.014, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={1.8}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Outer Gyro Ring 3 */}
      <mesh ref={ring3} rotation={[0, Math.PI / 6, 0]}>
        <torusGeometry args={[1.75, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.5}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Orbiting Quantum Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={coreColor}
          transparent
          opacity={speaking ? 0.95 : 0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ── HOLOGRAM CHAPTER NODES ──────────────────────────────── */
function HologramSystem({
  chapters,
  activeIndex
}: {
  chapters: PresenterChapter[];
  activeIndex: number;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      chapters.map((chapter, index) => {
        const angle = (index / chapters.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...chapter,
          position: [Math.cos(angle) * 2.8, 0.5 + Math.sin(index * 1.7) * 0.25, Math.sin(angle) * 0.85] as [
            number,
            number,
            number
          ]
        };
      }),
    [chapters]
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.22) * 0.08;
    group.current.position.y = Math.sin(t * 1.5) * 0.03;
  });

  return (
    <group ref={group}>
      {nodes.map((node, index) => {
        const active = index === activeIndex;
        const color = active ? node.accent : "#6b7280";
        return (
          <group key={node.id} position={node.position}>
            <mesh>
              <torusGeometry args={[active ? 0.32 : 0.2, 0.012, 12, 48]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={active ? 2.0 : 0.4}
                transparent
                opacity={active ? 0.95 : 0.4}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[active ? 0.24 : 0.14, 36]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={active ? 1.0 : 0.2}
                transparent
                opacity={active ? 0.45 : 0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ── STAGE FLOOR MATRIX ──────────────────────────────────── */
function StageFloor({ activeColor }: { activeColor: string }) {
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring1.current) ring1.current.rotation.y = t * 0.25;
    if (ring2.current) ring2.current.rotation.y = -t * 0.15;
  });

  return (
    <group position={[0, -1.35, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 96]} />
        <meshStandardMaterial color="#030408" roughness={0.5} metalness={0.3} />
      </mesh>
      <group ref={ring1}>
        {[1.3, 2.5].map((radius, index) => (
          <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01 + index * 0.006, 0]}>
            <torusGeometry args={[radius, 0.008, 8, 128]} />
            <meshStandardMaterial
              color={activeColor}
              emissive={activeColor}
              emissiveIntensity={0.8 - index * 0.15}
              transparent
              opacity={0.55 - index * 0.1}
            />
          </mesh>
        ))}
      </group>
      <group ref={ring2}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
          <torusGeometry args={[1.9, 0.01, 8, 128]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#a78bfa"
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
