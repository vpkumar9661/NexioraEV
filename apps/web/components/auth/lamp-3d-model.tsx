"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Lamp3DModelProps {
  isOn: boolean;
  lampColor: string;
  lampRgb: [number, number, number];
  onToggle?: () => void;
  resetTrigger?: number;
}

/**
 * Procedural 3D Helical Coil Spring
 * Exactly matches real architect desk lamp tension springs.
 */
class HelicalSpringCurve extends THREE.Curve<THREE.Vector3> {
  radius: number;
  height: number;
  turns: number;

  constructor(radius = 0.05, height = 0.95, turns = 13) {
    super();
    this.radius = radius;
    this.height = height;
    this.turns = turns;
  }

  override getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * this.turns;
    const x = Math.cos(angle) * this.radius;
    const z = Math.sin(angle) * this.radius;
    const y = t * this.height;
    return optionalTarget.set(x, y, z);
  }
}

/**
 * Creates a procedural dark studio wood texture for the desk surface.
 */
function createStudioWoodTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base dark walnut studio tone
  ctx.fillStyle = "#15181F";
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle wood planks & grain lines
  for (let y = 0; y < 1024; y += 4) {
    const darkness = Math.sin(y * 0.02) * 0.03 + Math.random() * 0.04;
    ctx.fillStyle = `rgba(32, 38, 48, ${0.15 + darkness})`;
    ctx.fillRect(0, y, 1024, 2 + Math.random() * 2);
  }

  // Fine wood fibers
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const len = 40 + Math.random() * 120;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.015 + Math.random() * 0.02})`;
    ctx.fillRect(x, y, len, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function Lamp3DModel({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
  resetTrigger = 0,
}: Lamp3DModelProps) {
  const { viewport } = useThree();

  // References for light & joints
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const spotTargetRef = useRef<THREE.Object3D>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const upperArmGroupRef = useRef<THREE.Group>(null);
  const lowerArmGroupRef = useRef<THREE.Group>(null);
  const deskSpotRef = useRef<THREE.Mesh>(null);

  // Interactive Drag & Aim State
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const headRotOffset = useRef({ x: 0, y: 0 });

  // Reset lamp to default neutral orientation on resetTrigger change
  useEffect(() => {
    headRotOffset.current = { x: 0, y: 0 };
  }, [resetTrigger]);

  // Procedural wood desk texture
  const woodTexture = useMemo(() => createStudioWoodTexture(), []);

  // ══════════════════════════════════════════════════════════════
  // PBR MATERIALS — Real Studio Quality
  // ══════════════════════════════════════════════════════════════
  const materials = useMemo(() => {
    // Matte powder-coated dark graphite (Main body & shade)
    const powderCoatedBlack = new THREE.MeshStandardMaterial({
      color: "#181B22",
      metalness: 0.38,
      roughness: 0.58,
    });

    // Dark architectural brushed aluminium (Arms & brackets)
    const brushedGraphite = new THREE.MeshStandardMaterial({
      color: "#242A35",
      metalness: 0.72,
      roughness: 0.32,
    });

    // Machined brass mechanical accents (Thumbscrews, collars, rivets)
    const machinedBrass = new THREE.MeshStandardMaterial({
      color: "#D49B35",
      metalness: 0.88,
      roughness: 0.28,
      emissive: "#3A2605",
      emissiveIntensity: 0.1,
    });

    // High-tensile steel springs
    const springSteel = new THREE.MeshStandardMaterial({
      color: "#8C96A6",
      metalness: 0.85,
      roughness: 0.25,
    });

    // Parabolic shade interior reflector (warm metallic satin)
    const reflectorWhite = new THREE.MeshStandardMaterial({
      color: "#F3EDE2",
      metalness: 0.25,
      roughness: 0.35,
      side: THREE.BackSide,
    });

    // Parabolic shade exterior (Deep matte black enamel)
    const shadeExterior = new THREE.MeshStandardMaterial({
      color: "#151820",
      metalness: 0.45,
      roughness: 0.5,
      side: THREE.FrontSide,
    });

    // Frosted LED diffuser bulb
    const frostedBulb = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      metalness: 0.05,
      roughness: 0.2,
      emissive: lampColor,
      emissiveIntensity: isOn ? 3.5 : 0,
      transparent: true,
      opacity: 0.98,
    });

    // Studio wooden desk surface
    const studioDeskMat = new THREE.MeshStandardMaterial({
      color: "#181C24",
      map: woodTexture || undefined,
      metalness: 0.18,
      roughness: 0.55,
    });

    // Realistic floor illumination pool
    const deskGlowMat = new THREE.MeshBasicMaterial({
      color: lampColor,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return {
      powderCoatedBlack,
      brushedGraphite,
      machinedBrass,
      springSteel,
      reflectorWhite,
      shadeExterior,
      frostedBulb,
      studioDeskMat,
      deskGlowMat,
    };
  }, [woodTexture, lampColor, isOn]);

  // ══════════════════════════════════════════════════════════════
  // GEOMETRIES — Engineered for exact architect lamp fidelity
  // ══════════════════════════════════════════════════════════════
  const geometries = useMemo(() => {
    // 1. Helical Tension Spring (13 coils)
    const springCurve = new HelicalSpringCurve(0.045, 0.92, 13);
    const springGeo = new THREE.TubeGeometry(springCurve, 72, 0.012, 8, false);

    // 2. Parabolic Bell Dome Shade (Profile generated via Lathe)
    const shadePoints: THREE.Vector2[] = [];
    // Top collar
    shadePoints.push(new THREE.Vector2(0.18, 0.72));
    shadePoints.push(new THREE.Vector2(0.24, 0.68));
    shadePoints.push(new THREE.Vector2(0.24, 0.38));
    // Parabolic expansion curve
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const y = 0.38 - t * 0.98; // from +0.38 down to -0.60
      const r = 0.24 + Math.pow(t, 0.8) * 0.72; // from 0.24 out to 0.96
      shadePoints.push(new THREE.Vector2(r, y));
    }
    // Subtle rolled flanged rim
    shadePoints.push(new THREE.Vector2(0.98, -0.61));
    shadePoints.push(new THREE.Vector2(0.95, -0.63));
    const shadeGeo = new THREE.LatheGeometry(shadePoints, 48);

    // 3. Heavy Weighted Base Disc (Bevelled profile)
    const basePoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.38, 0),
      new THREE.Vector2(1.38, 0.06),
      new THREE.Vector2(1.32, 0.16),
      new THREE.Vector2(1.22, 0.22),
      new THREE.Vector2(0.4, 0.23),
      new THREE.Vector2(0.35, 0.26),
      new THREE.Vector2(0, 0.26),
    ];
    const baseGeo = new THREE.LatheGeometry(basePoints, 48);

    return {
      springGeo,
      shadeGeo,
      baseGeo,
    };
  }, []);

  // ══════════════════════════════════════════════════════════════
  // ANIMATION & REAL-TIME LIGHTING LERP
  // ══════════════════════════════════════════════════════════════
  const targetIntensity = isOn ? 1 : 0;
  const currentIntensity = useRef(isOn ? 1 : 0);

  useFrame((state, delta) => {
    // Smooth, photorealistic light switch ramp
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      targetIntensity,
      delta * 4.5
    );
    const ci = currentIntensity.current;

    // SpotLight power & color
    if (spotLightRef.current) {
      spotLightRef.current.intensity = ci * 48;
      spotLightRef.current.color.set(lampColor);
    }

    // Interior shade ambient warmth
    if (pointLightRef.current) {
      pointLightRef.current.intensity = ci * 6.5;
      pointLightRef.current.color.set(lampColor);
    }

    // Bulb emissive
    if (bulbRef.current) {
      materials.frostedBulb.emissiveIntensity = ci * 4.2;
      materials.frostedBulb.emissive.set(ci > 0.03 ? lampColor : "#000000");
    }

    // Desk surface warm light pool
    if (deskSpotRef.current) {
      materials.deskGlowMat.opacity = ci * 0.38;
      materials.deskGlowMat.color.set(lampColor);
    }

    // Subtle natural head tracking following mouse pointer with realistic constraints
    if (headGroupRef.current) {
      const mouseAimX = state.pointer.y * -0.08 + headRotOffset.current.x;
      const mouseAimY = state.pointer.x * 0.12 + headRotOffset.current.y;

      const targetX = 0.52 + THREE.MathUtils.clamp(mouseAimX, -0.25, 0.25);
      const targetY = 0.18 + THREE.MathUtils.clamp(mouseAimY, -0.35, 0.35);

      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetX,
        delta * 3
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetY,
        delta * 3
      );
    }
  });

  // Pointer drag to manually articulate / tilt the lamp head
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - dragStart.current.x) * 0.003;
    const dy = (e.clientY - dragStart.current.y) * 0.003;
    headRotOffset.current.x = THREE.MathUtils.clamp(
      headRotOffset.current.x + dy,
      -0.3,
      0.3
    );
    headRotOffset.current.y = THREE.MathUtils.clamp(
      headRotOffset.current.y + dx,
      -0.4,
      0.4
    );
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <group
      position={[-0.45, -2.65, 0]}
      onClick={(e) => {
        // Toggle power when clicking the lamp
        e.stopPropagation();
        onToggle?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        setIsHovered(false);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "auto";
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* ══════════════════════════════════════════════════════════════
          1. HEAVY WEIGHTED BASE (With chamfered rim & brass collar)
          ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Base cast metal body */}
        <mesh geometry={geometries.baseGeo} material={materials.powderCoatedBlack} castShadow receiveShadow />

        {/* Polished brass rim accent inset */}
        <mesh position={[0, 0.16, 0]} material={materials.machinedBrass}>
          <torusGeometry args={[1.26, 0.02, 12, 48]} />
        </mesh>

        {/* Vertical brass mounting collar (where lower arm pivots) */}
        <mesh position={[0, 0.38, 0]} material={materials.machinedBrass}>
          <cylinderGeometry args={[0.16, 0.18, 0.26, 24]} />
        </mesh>

        {/* Base swivel pin */}
        <mesh position={[0, 0.54, 0]} material={materials.brushedGraphite}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 20]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. LOWER ARTICULATED JOINT & PARALLEL STRUTS
          ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.62, 0]}>
        {/* Central brass joint axle */}
        <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.44, 20]} />
        </mesh>
        {/* Outer clamping disc flanges */}
        <mesh position={[0.22, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
        </mesh>
        <mesh position={[-0.22, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
        </mesh>
        {/* Brass knurled thumbscrew knob on side (Reference photo detail!) */}
        <mesh position={[0.28, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
        </mesh>

        {/* Lower Arm Assembly (Pivots at ~ -20 deg angle) */}
        <group ref={lowerArmGroupRef} rotation={[0, 0, -0.32]}>
          {/* Strut A (Front square profile) */}
          <mesh position={[0.08, 1.35, 0.08]} material={materials.powderCoatedBlack}>
            <boxGeometry args={[0.07, 2.7, 0.07]} />
          </mesh>
          {/* Strut B (Back square profile) */}
          <mesh position={[-0.08, 1.35, -0.08]} material={materials.powderCoatedBlack}>
            <boxGeometry args={[0.07, 2.7, 0.07]} />
          </mesh>

          {/* Lower Spring Anchor Bracket */}
          <mesh position={[0, 0.25, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.26, 0.08, 0.18]} />
          </mesh>

          {/* Upper Spring Anchor Bracket */}
          <mesh position={[0, 1.3, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.26, 0.08, 0.18]} />
          </mesh>

          {/* ══════════════════════════════════════════════════════════════
              3. COILED TENSION SPRINGS (Signature Architect Lamp Detail!)
              ══════════════════════════════════════════════════════════════ */}
          {/* Spring 1 (Front-right) */}
          <group position={[0.09, 0.32, 0.14]}>
            <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
            {/* Top & bottom anchor hook rings */}
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.035, 0.008, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.94, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.035, 0.008, 8, 16]} />
            </mesh>
          </group>

          {/* Spring 2 (Back-left) */}
          <group position={[-0.09, 0.32, -0.14]}>
            <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.035, 0.008, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.94, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.035, 0.008, 8, 16]} />
            </mesh>
          </group>

          {/* ══════════════════════════════════════════════════════════════
              4. MIDDLE ELBOW PIVOT MECHANISM
              ══════════════════════════════════════════════════════════════ */}
          <group position={[0, 2.7, 0]}>
            {/* Central brass hinge hub */}
            <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.42, 24]} />
            </mesh>
            {/* Side hinge plates */}
            <mesh position={[0.22, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.24, 0.24, 0.05, 24]} />
            </mesh>
            <mesh position={[-0.22, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.24, 0.24, 0.05, 24]} />
            </mesh>
            {/* Brass tightening thumbscrew with cross-bar */}
            <mesh position={[0.28, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.11, 0.11, 0.1, 16]} />
            </mesh>
            <mesh position={[0.34, 0, 0]} material={materials.machinedBrass}>
              <boxGeometry args={[0.05, 0.28, 0.05]} />
            </mesh>

            {/* ══════════════════════════════════════════════════════════
                5. UPPER ARTICULATED ARM (Aimed forward-right)
                ══════════════════════════════════════════════════════════ */}
            <group ref={upperArmGroupRef} rotation={[0, 0, 0.72]}>
              {/* Upper twin rods */}
              <mesh position={[0.07, 1.25, 0.06]} material={materials.powderCoatedBlack}>
                <boxGeometry args={[0.065, 2.5, 0.065]} />
              </mesh>
              <mesh position={[-0.07, 1.25, -0.06]} material={materials.powderCoatedBlack}>
                <boxGeometry args={[0.065, 2.5, 0.065]} />
              </mesh>

              {/* Upper arm cross brace */}
              <mesh position={[0, 1.1, 0]} material={materials.brushedGraphite}>
                <boxGeometry args={[0.22, 0.06, 0.14]} />
              </mesh>

              {/* ════════════════════════════════════════════════════════
                  6. SHADE SWIVEL NECK & SOCKET
                  ════════════════════════════════════════════════════════ */}
              <group position={[0, 2.5, 0]}>
                {/* Neck pivot sphere & brass knuckle */}
                <mesh material={materials.machinedBrass}>
                  <sphereGeometry args={[0.15, 20, 20]} />
                </mesh>
                <mesh position={[0.14, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
                </mesh>

                {/* ══════════════════════════════════════════════════════
                    7. PARABOLIC LAMPSHADE HEAD (Exact reference dome!)
                    ══════════════════════════════════════════════════════ */}
                <group ref={headGroupRef} rotation={[0.52, 0.18, 0.35]}>
                  {/* Brass knurled finial nut at top of shade (Reference detail!) */}
                  <mesh position={[0, 0.82, 0]} material={materials.machinedBrass}>
                    <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
                  </mesh>

                  {/* Cylindrical socket housing neck */}
                  <mesh position={[0, 0.52, 0]} material={materials.powderCoatedBlack}>
                    <cylinderGeometry args={[0.22, 0.25, 0.45, 32]} />
                  </mesh>

                  {/* Brass accent collar ring between socket and shade */}
                  <mesh position={[0, 0.32, 0]} material={materials.machinedBrass}>
                    <torusGeometry args={[0.25, 0.02, 12, 32]} />
                  </mesh>

                  {/* Realistic Parabolic Bell Shade (Lathe Geometry) */}
                  <mesh geometry={geometries.shadeGeo} material={materials.shadeExterior} castShadow />

                  {/* Interior White/Satin Reflector Liner */}
                  <mesh geometry={geometries.shadeGeo} material={materials.reflectorWhite} />

                  {/* ════════════════════════════════════════════════════
                      8. RECESSED FROSTED BULB / LED EMITTER
                      ════════════════════════════════════════════════════ */}
                  <mesh ref={bulbRef} position={[0, -0.22, 0]} material={materials.frostedBulb}>
                    <sphereGeometry args={[0.22, 32, 32]} />
                  </mesh>

                  {/* ════════════════════════════════════════════════════
                      9. PHOTOREALISTIC THREE.JS SPOTLIGHT & FILL LIGHT
                      ════════════════════════════════════════════════════ */}
                  <spotLight
                    ref={spotLightRef}
                    position={[0, -0.3, 0]}
                    angle={0.58}
                    penumbra={0.75}
                    intensity={0}
                    color={lampColor}
                    distance={26}
                    decay={2}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-bias={-0.0006}
                    target={spotTargetRef.current || undefined}
                  />

                  {/* Soft local point fill inside the shade opening */}
                  <pointLight
                    ref={pointLightRef}
                    position={[0, -0.4, 0]}
                    intensity={0}
                    color={lampColor}
                    distance={9}
                    decay={2}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Target object for the spotlight (Anchored to desk surface) */}
      <object3D ref={spotTargetRef} position={[2.6, 0.05, 0.4]} />

      {/* ══════════════════════════════════════════════════════════════
          10. INDUSTRIAL POWER CABLE (Black rubber cord)
          ══════════════════════════════════════════════════════════════ */}
      {/* Cable trailing from back of base onto desk */}
      <mesh position={[-0.9, 0.04, 0.4]} rotation={[0, 0.4, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
      <mesh position={[-1.45, 0.03, 0.7]} rotation={[0, 0.75, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════
          11. DESK LIGHT POOL (Soft warm elliptical falloff)
          ══════════════════════════════════════════════════════════════ */}
      <mesh
        ref={deskSpotRef}
        position={[2.2, 0.015, 0.35]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.deskGlowMat}
      >
        <circleGeometry args={[2.9, 48]} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════
          12. PHOTOREALISTIC STUDIO WOOD DESK SURFACE
          ══════════════════════════════════════════════════════════════ */}
      <mesh position={[1.5, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.studioDeskMat}>
        <planeGeometry args={[28, 18]} />
      </mesh>
    </group>
  );
}
