"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Lamp3DModelProps {
  isOn: boolean;
  lampColor: string;
  lampRgb: [number, number, number];
  onToggle?: () => void;
  resetTrigger?: number;
}

/**
 * Helical Tension Spring Curve
 * Mathematically generates authentic coiled architect lamp springs.
 */
class HelicalSpringCurve extends THREE.Curve<THREE.Vector3> {
  radius: number;
  height: number;
  turns: number;

  constructor(radius = 0.036, height = 0.78, turns = 14) {
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
 * Generates an organic arched cable curve
 */
function createCableCurve(start: THREE.Vector3, control: THREE.Vector3, end: THREE.Vector3) {
  return new THREE.QuadraticBezierCurve3(start, control, end);
}

export function Lamp3DModel({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
  resetTrigger = 0,
}: Lamp3DModelProps) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const spotTargetRef = useRef<THREE.Object3D>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const headGroupRef = useRef<THREE.Group>(null);

  // Interactive Aim State
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const headRotOffset = useRef({ x: 0, y: 0 });

  // Reset to default neutral orientation on resetTrigger change
  useEffect(() => {
    headRotOffset.current = { x: 0, y: 0 };
  }, [resetTrigger]);

  // ══════════════════════════════════════════════════════════════
  // PBR MATERIALS — Restrained, Real-World Industrial Lighting
  // ══════════════════════════════════════════════════════════════
  const materials = useMemo(() => {
    // Matte powder-coated dark graphite (Main body & shade)
    const powderCoatedBlack = new THREE.MeshStandardMaterial({
      color: "#161920",
      metalness: 0.35,
      roughness: 0.62,
    });

    // Dark architectural structural aluminium (Rails & brackets)
    const structuralMetal = new THREE.MeshStandardMaterial({
      color: "#222732",
      metalness: 0.65,
      roughness: 0.38,
    });

    // Machined brass mechanical hardware (Thumbscrews, pins, collar rings)
    const machinedBrass = new THREE.MeshStandardMaterial({
      color: "#CFA042",
      metalness: 0.88,
      roughness: 0.28,
      emissive: "#2A1D05",
      emissiveIntensity: 0.08,
    });

    // High-tensile coiled spring steel
    const springSteel = new THREE.MeshStandardMaterial({
      color: "#9AA5B4",
      metalness: 0.85,
      roughness: 0.26,
    });

    // Parabolic shade interior reflector (Satin warm off-white)
    const reflectorInterior = new THREE.MeshStandardMaterial({
      color: "#F6F1E8",
      metalness: 0.15,
      roughness: 0.32,
      side: THREE.BackSide,
    });

    // Parabolic shade exterior (Matte deep graphite)
    const shadeExterior = new THREE.MeshStandardMaterial({
      color: "#13161D",
      metalness: 0.42,
      roughness: 0.52,
      side: THREE.FrontSide,
    });

    // Frosted LED diffuser bulb
    const frostedBulb = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      metalness: 0.02,
      roughness: 0.15,
      emissive: lampColor,
      emissiveIntensity: isOn ? 3.8 : 0,
      transparent: true,
      opacity: 0.96,
    });

    // Matte black rubber power cable
    const rubberCable = new THREE.MeshStandardMaterial({
      color: "#0F1116",
      roughness: 0.85,
      metalness: 0.05,
    });

    return {
      powderCoatedBlack,
      structuralMetal,
      machinedBrass,
      springSteel,
      reflectorInterior,
      shadeExterior,
      frostedBulb,
      rubberCable,
    };
  }, [lampColor, isOn]);

  // ══════════════════════════════════════════════════════════════
  // GEOMETRIES — Engineered with Realistic Physical Proportions
  // ══════════════════════════════════════════════════════════════
  const geometries = useMemo(() => {
    // 1. Helical Spring Geometry
    const springCurve = new HelicalSpringCurve(0.034, 0.76, 14);
    const springGeo = new THREE.TubeGeometry(springCurve, 64, 0.009, 8, false);

    // 2. Parabolic Bell Dome Shade (Lathe profile matching reference photo)
    const shadePoints: THREE.Vector2[] = [];
    // Top neck collar
    shadePoints.push(new THREE.Vector2(0.15, 0.55));
    shadePoints.push(new THREE.Vector2(0.2, 0.52));
    shadePoints.push(new THREE.Vector2(0.2, 0.32));
    // Parabolic bell curve
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const y = 0.32 - t * 0.78; // from +0.32 down to -0.46
      const r = 0.2 + Math.pow(t, 0.75) * 0.58; // from 0.20 out to 0.78
      shadePoints.push(new THREE.Vector2(r, y));
    }
    // Rolled protective rim
    shadePoints.push(new THREE.Vector2(0.79, -0.47));
    shadePoints.push(new THREE.Vector2(0.77, -0.485));
    const shadeGeo = new THREE.LatheGeometry(shadePoints, 48);

    // 3. Weighted Circular Base with beveled rim & brass groove
    const basePoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.98, 0),
      new THREE.Vector2(0.98, 0.05),
      new THREE.Vector2(0.94, 0.12),
      new THREE.Vector2(0.94, 0.16),
      new THREE.Vector2(0.88, 0.2),
      new THREE.Vector2(0.32, 0.21),
      new THREE.Vector2(0.28, 0.23),
      new THREE.Vector2(0, 0.23),
    ];
    const baseGeo = new THREE.LatheGeometry(basePoints, 48);

    // 4. Looping Power Cable Curves
    const elbowCableCurve = createCableCurve(
      new THREE.Vector3(-0.06, 1.4, -0.06),
      new THREE.Vector3(-0.35, 1.85, 0),
      new THREE.Vector3(-0.06, 0.4, 0.06)
    );
    const elbowCableGeo = new THREE.TubeGeometry(elbowCableCurve, 24, 0.016, 8, false);

    const headCableCurve = createCableCurve(
      new THREE.Vector3(0, 1.4, 0),
      new THREE.Vector3(-0.25, 1.9, 0.1),
      new THREE.Vector3(0, 0.65, 0)
    );
    const headCableGeo = new THREE.TubeGeometry(headCableCurve, 24, 0.016, 8, false);

    return {
      springGeo,
      shadeGeo,
      baseGeo,
      elbowCableGeo,
      headCableGeo,
    };
  }, []);

  // ══════════════════════════════════════════════════════════════
  // SMOOTH REAL-TIME LIGHTING TRANSITION
  // ══════════════════════════════════════════════════════════════
  const targetIntensity = isOn ? 1 : 0;
  const currentIntensity = useRef(isOn ? 1 : 0);

  useFrame((state, delta) => {
    // Smooth physical bulb filament ramp
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      targetIntensity,
      delta * 4.2
    );
    const ci = currentIntensity.current;

    // SpotLight illumination
    if (spotLightRef.current) {
      spotLightRef.current.intensity = ci * 42;
      spotLightRef.current.color.set(lampColor);
    }

    // Interior shade warm ambient fill
    if (pointLightRef.current) {
      pointLightRef.current.intensity = ci * 5.2;
      pointLightRef.current.color.set(lampColor);
    }

    // Bulb emissive surface
    if (bulbRef.current) {
      materials.frostedBulb.emissiveIntensity = ci * 3.8;
      materials.frostedBulb.emissive.set(ci > 0.02 ? lampColor : "#000000");
    }

    // Subtle natural head tracking following mouse with realistic mechanical limits
    if (headGroupRef.current) {
      const mouseAimX = state.pointer.y * -0.06 + headRotOffset.current.x;
      const mouseAimY = state.pointer.x * 0.09 + headRotOffset.current.y;

      const targetX = 0.48 + THREE.MathUtils.clamp(mouseAimX, -0.2, 0.2);
      const targetY = 0.16 + THREE.MathUtils.clamp(mouseAimY, -0.28, 0.28);

      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetX,
        delta * 2.8
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetY,
        delta * 2.8
      );
    }
  });

  // Pointer drag to articulate lamp head
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
      -0.25,
      0.25
    );
    headRotOffset.current.y = THREE.MathUtils.clamp(
      headRotOffset.current.y + dx,
      -0.35,
      0.35
    );
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <group
      position={[-0.55, -1.5, 0]}
      onClick={(e) => {
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
          1. WEIGHTED CIRCULAR BASE (Ground level Y = 0 relative to group)
          ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Base cast-metal body */}
        <mesh geometry={geometries.baseGeo} material={materials.powderCoatedBlack} castShadow receiveShadow />

        {/* Brass waist groove accent ring */}
        <mesh position={[0, 0.12, 0]} material={materials.machinedBrass}>
          <torusGeometry args={[0.95, 0.016, 12, 48]} />
        </mesh>

        {/* Central brass mounting collar */}
        <mesh position={[0, 0.32, 0]} material={materials.machinedBrass}>
          <cylinderGeometry args={[0.13, 0.15, 0.2, 24]} />
        </mesh>

        {/* Swivel stem pin */}
        <mesh position={[0, 0.44, 0]} material={materials.structuralMetal}>
          <cylinderGeometry args={[0.09, 0.09, 0.1, 20]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. LOWER ARTICULATED JOINT & TWIN STRUTS
          ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.5, 0]}>
        {/* Brass central axle */}
        <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.36, 20]} />
        </mesh>
        {/* Flanged black clamping discs */}
        <mesh position={[0.18, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
        </mesh>
        <mesh position={[-0.18, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
        </mesh>
        {/* Brass knurled thumbscrew knob */}
        <mesh position={[0.23, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
        </mesh>

        {/* Lower Arm (Pivots at -0.32 rad ~ 18 deg backward) */}
        <group rotation={[0, 0, -0.32]}>
          {/* Strut A (Front black square rail) */}
          <mesh position={[0.065, 0.95, 0.065]} material={materials.powderCoatedBlack}>
            <boxGeometry args={[0.05, 1.9, 0.05]} />
          </mesh>
          {/* Strut B (Back black square rail) */}
          <mesh position={[-0.065, 0.95, -0.065]} material={materials.powderCoatedBlack}>
            <boxGeometry args={[0.05, 1.9, 0.05]} />
          </mesh>

          {/* Lower spring anchor bracket */}
          <mesh position={[0, 0.18, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.2, 0.06, 0.14]} />
          </mesh>

          {/* Upper spring anchor bracket on lower arm */}
          <mesh position={[0, 0.95, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.2, 0.06, 0.14]} />
          </mesh>

          {/* ══════════════════════════════════════════════════════════════
              3. LOWER TENSION SPRINGS
              ══════════════════════════════════════════════════════════════ */}
          {/* Spring 1 (Front) */}
          <group position={[0.07, 0.24, 0.11]}>
            <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.006, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.77, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.006, 8, 16]} />
            </mesh>
          </group>

          {/* Spring 2 (Back) */}
          <group position={[-0.07, 0.24, -0.11]}>
            <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.006, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.77, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.006, 8, 16]} />
            </mesh>
          </group>

          {/* ══════════════════════════════════════════════════════════════
              4. ELBOW PIVOT JOINT
              ══════════════════════════════════════════════════════════════ */}
          <group position={[0, 1.9, 0]}>
            {/* Central brass hub */}
            <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.12, 0.34, 20]} />
            </mesh>
            {/* Side hinge plates */}
            <mesh position={[0.17, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.19, 0.19, 0.04, 24]} />
            </mesh>
            <mesh position={[-0.17, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.19, 0.19, 0.04, 24]} />
            </mesh>
            {/* Brass thumbscrew with cross-bar */}
            <mesh position={[0.22, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
            </mesh>
            <mesh position={[0.27, 0, 0]} material={materials.machinedBrass}>
              <boxGeometry args={[0.04, 0.22, 0.04]} />
            </mesh>

            {/* Arched Rubber Cable loop over elbow */}
            <mesh geometry={geometries.elbowCableGeo} material={materials.rubberCable} />

            {/* ══════════════════════════════════════════════════════════
                5. UPPER ARTICULATED ARM (Aimed forward-right at +0.72 rad)
                ══════════════════════════════════════════════════════════ */}
            <group rotation={[0, 0, 0.72]}>
              {/* Upper twin rails */}
              <mesh position={[0.06, 0.9, 0.05]} material={materials.powderCoatedBlack}>
                <boxGeometry args={[0.05, 1.8, 0.05]} />
              </mesh>
              <mesh position={[-0.06, 0.9, -0.05]} material={materials.powderCoatedBlack}>
                <boxGeometry args={[0.05, 1.8, 0.05]} />
              </mesh>

              {/* Upper arm cross brace */}
              <mesh position={[0, 0.85, 0]} material={materials.structuralMetal}>
                <boxGeometry args={[0.18, 0.05, 0.11]} />
              </mesh>

              {/* Upper tension spring anchors */}
              <mesh position={[0, 0.16, 0]} material={materials.machinedBrass}>
                <boxGeometry args={[0.18, 0.05, 0.12]} />
              </mesh>
              <mesh position={[0, 0.92, 0]} material={materials.machinedBrass}>
                <boxGeometry args={[0.18, 0.05, 0.12]} />
              </mesh>

              {/* Upper Tension Springs */}
              <group position={[0.065, 0.2, 0.09]}>
                <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
              </group>
              <group position={[-0.065, 0.2, -0.09]}>
                <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
              </group>

              {/* ════════════════════════════════════════════════════════
                  6. SHADE SWIVEL NECK & SOCKET
                  ════════════════════════════════════════════════════════ */}
              <group position={[0, 1.8, 0]}>
                {/* Neck pivot brass knuckle */}
                <mesh material={materials.machinedBrass}>
                  <sphereGeometry args={[0.12, 20, 20]} />
                </mesh>
                <mesh position={[0.11, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.06, 12]} />
                </mesh>

                {/* ══════════════════════════════════════════════════════
                    7. PARABOLIC BELL LAMPSHADE HEAD
                    ══════════════════════════════════════════════════════ */}
                <group ref={headGroupRef} rotation={[0.48, 0.16, 0.32]}>
                  {/* Brass top cable gland nut */}
                  <mesh position={[0, 0.65, 0]} material={materials.machinedBrass}>
                    <cylinderGeometry args={[0.08, 0.09, 0.1, 16]} />
                  </mesh>

                  {/* Arched rubber wire entering top gland */}
                  <mesh geometry={geometries.headCableGeo} material={materials.rubberCable} />

                  {/* Cylindrical socket housing */}
                  <mesh position={[0, 0.42, 0]} material={materials.powderCoatedBlack}>
                    <cylinderGeometry args={[0.18, 0.2, 0.36, 32]} />
                  </mesh>

                  {/* Brass accent collar ring between socket & dome */}
                  <mesh position={[0, 0.25, 0]} material={materials.machinedBrass}>
                    <torusGeometry args={[0.2, 0.016, 12, 32]} />
                  </mesh>

                  {/* Parabolic Bell Shade (Lathe Geometry matching reference) */}
                  <mesh geometry={geometries.shadeGeo} material={materials.shadeExterior} castShadow />

                  {/* Warm Off-White Satin Reflector Interior */}
                  <mesh geometry={geometries.shadeGeo} material={materials.reflectorInterior} />

                  {/* ════════════════════════════════════════════════════
                      8. RECESSED FROSTED DIFFUSER BULB
                      ════════════════════════════════════════════════════ */}
                  <mesh ref={bulbRef} position={[0, -0.16, 0]} material={materials.frostedBulb}>
                    <sphereGeometry args={[0.17, 32, 32]} />
                  </mesh>

                  {/* ════════════════════════════════════════════════════
                      9. REALISTIC THREE.JS SPOTLIGHT & AMBIENT FILL
                      ════════════════════════════════════════════════════ */}
                  <spotLight
                    ref={spotLightRef}
                    position={[0, -0.22, 0]}
                    angle={0.62}
                    penumbra={0.8}
                    intensity={0}
                    color={lampColor}
                    distance={22}
                    decay={2}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-bias={-0.0005}
                    target={spotTargetRef.current || undefined}
                  />

                  {/* Point light for interior warmth */}
                  <pointLight
                    ref={pointLightRef}
                    position={[0, -0.28, 0]}
                    intensity={0}
                    color={lampColor}
                    distance={7}
                    decay={2}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Target object for Spotlight on the virtual desk */}
      <object3D ref={spotTargetRef} position={[2.2, 0.02, 0.35]} />

      {/* Trailing Rubber Base Power Cord */}
      <mesh position={[-0.7, 0.03, 0.3]} rotation={[0, 0.35, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
      <mesh position={[-1.15, 0.025, 0.52]} rotation={[0, 0.65, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
    </group>
  );
}
