"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicLampModelProps {
  isOn: boolean;
  lampColor: string;
  lampRgb: [number, number, number];
  onToggle?: () => void;
  resetTrigger?: number;
}

/**
 * Coiled Tension Spring Generator
 * Accurately models real architectural desk lamp counterbalance springs.
 */
class HelicalSpringCurve extends THREE.Curve<THREE.Vector3> {
  radius: number;
  height: number;
  turns: number;

  constructor(radius = 0.038, height = 0.9, turns = 15) {
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
 * Curved electrical wire generator
 */
function createCableCurve(start: THREE.Vector3, control: THREE.Vector3, end: THREE.Vector3) {
  return new THREE.QuadraticBezierCurve3(start, control, end);
}

export function CinematicLampModel({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
  resetTrigger = 0,
}: CinematicLampModelProps) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const spotTargetRef = useRef<THREE.Object3D>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const volumetricBeamRef = useRef<THREE.Mesh>(null);
  const baseSwitchLedRef = useRef<THREE.Mesh>(null);

  // Interactive Aim State
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const headRotOffset = useRef({ x: 0, y: 0 });

  // Reset lamp orientation on trigger
  useEffect(() => {
    headRotOffset.current = { x: 0, y: 0 };
  }, [resetTrigger]);

  // ══════════════════════════════════════════════════════════════
  // PBR MATERIALS — Real Industrial Materials
  // ══════════════════════════════════════════════════════════════
  const materials = useMemo(() => {
    // Matte powder-coated dark graphite (Lamp body & shade exterior)
    const powderCoatedBlack = new THREE.MeshStandardMaterial({
      color: "#181B22",
      metalness: 0.35,
      roughness: 0.58,
    });

    // Dark architectural structural steel (Parallel arm struts)
    const structuralMetal = new THREE.MeshStandardMaterial({
      color: "#252B36",
      metalness: 0.72,
      roughness: 0.32,
    });

    // Machined brass mechanical hardware (Joint pins, thumbscrews, collars)
    const machinedBrass = new THREE.MeshStandardMaterial({
      color: "#D4A044",
      metalness: 0.88,
      roughness: 0.26,
      emissive: "#2E1F06",
      emissiveIntensity: 0.1,
    });

    // High-tensile coiled spring steel
    const springSteel = new THREE.MeshStandardMaterial({
      color: "#9CA7B8",
      metalness: 0.86,
      roughness: 0.22,
    });

    // Parabolic shade interior reflector (Warm satin off-white)
    const reflectorInterior = new THREE.MeshStandardMaterial({
      color: "#FAF4EB",
      metalness: 0.18,
      roughness: 0.28,
      side: THREE.BackSide,
    });

    // Frosted LED diffuser bulb
    const frostedBulb = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      metalness: 0.05,
      roughness: 0.15,
      emissive: lampColor,
      emissiveIntensity: isOn ? 4.5 : 0,
      transparent: true,
      opacity: 0.98,
    });

    // Volumetric light beam cone (Additive blending)
    const volumetricBeamMat = new THREE.MeshBasicMaterial({
      color: lampColor,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Matte black rubber electrical wire
    const rubberCable = new THREE.MeshStandardMaterial({
      color: "#101218",
      roughness: 0.85,
      metalness: 0.05,
    });

    // Base switch ring LED
    const switchLedMat = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      emissive: isOn ? lampColor : "#2D3748",
      emissiveIntensity: isOn ? 2.5 : 0.2,
      roughness: 0.2,
    });

    return {
      powderCoatedBlack,
      structuralMetal,
      machinedBrass,
      springSteel,
      reflectorInterior,
      frostedBulb,
      volumetricBeamMat,
      rubberCable,
      switchLedMat,
    };
  }, [lampColor, isOn]);

  // ══════════════════════════════════════════════════════════════
  // GEOMETRIES — Parametric High-Fidelity Geometry
  // ══════════════════════════════════════════════════════════════
  const geometries = useMemo(() => {
    // 1. Helical Spring Geometry
    const springCurve = new HelicalSpringCurve(0.038, 0.88, 15);
    const springGeo = new THREE.TubeGeometry(springCurve, 64, 0.01, 8, false);

    // 2. Parabolic Bell Dome Shade (Profile generated via Lathe)
    const shadePoints: THREE.Vector2[] = [];
    shadePoints.push(new THREE.Vector2(0.18, 0.65));
    shadePoints.push(new THREE.Vector2(0.24, 0.62));
    shadePoints.push(new THREE.Vector2(0.24, 0.38));
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const y = 0.38 - t * 0.95; // from +0.38 down to -0.57
      const r = 0.24 + Math.pow(t, 0.78) * 0.7; // from 0.24 out to 0.94
      shadePoints.push(new THREE.Vector2(r, y));
    }
    // Rolled protective lip
    shadePoints.push(new THREE.Vector2(0.96, -0.58));
    shadePoints.push(new THREE.Vector2(0.93, -0.6));
    const shadeGeo = new THREE.LatheGeometry(shadePoints, 48);

    // 3. Weighted Circular Base with beveled rim & brass groove
    const basePoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.12, 0),
      new THREE.Vector2(1.12, 0.06),
      new THREE.Vector2(1.06, 0.14),
      new THREE.Vector2(1.06, 0.18),
      new THREE.Vector2(0.98, 0.23),
      new THREE.Vector2(0.36, 0.24),
      new THREE.Vector2(0.3, 0.27),
      new THREE.Vector2(0, 0.27),
    ];
    const baseGeo = new THREE.LatheGeometry(basePoints, 48);

    // 4. Volumetric Light Cone Geometry
    const coneGeo = new THREE.ConeGeometry(2.4, 4.8, 36, 1, true);

    // 5. Arched Rubber Cable Curves
    const elbowCableCurve = createCableCurve(
      new THREE.Vector3(-0.06, 1.6, -0.06),
      new THREE.Vector3(-0.4, 2.1, 0),
      new THREE.Vector3(-0.06, 0.5, 0.06)
    );
    const elbowCableGeo = new THREE.TubeGeometry(elbowCableCurve, 24, 0.018, 8, false);

    const headCableCurve = createCableCurve(
      new THREE.Vector3(0, 1.6, 0),
      new THREE.Vector3(-0.3, 2.1, 0.12),
      new THREE.Vector3(0, 0.75, 0)
    );
    const headCableGeo = new THREE.TubeGeometry(headCableCurve, 24, 0.018, 8, false);

    return {
      springGeo,
      shadeGeo,
      baseGeo,
      coneGeo,
      elbowCableGeo,
      headCableGeo,
    };
  }, []);

  // ══════════════════════════════════════════════════════════════
  // SMOOTH REAL-TIME LIGHTING & HEAD MOVEMENT
  // ══════════════════════════════════════════════════════════════
  const targetIntensity = isOn ? 1 : 0;
  const currentIntensity = useRef(isOn ? 1 : 0);

  useFrame((state, delta) => {
    // Smooth physical filament power ramp
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      targetIntensity,
      delta * 4.5
    );
    const ci = currentIntensity.current;

    // SpotLight illumination
    if (spotLightRef.current) {
      spotLightRef.current.intensity = ci * 48;
      spotLightRef.current.color.set(lampColor);
    }

    // Interior shade warm point light
    if (pointLightRef.current) {
      pointLightRef.current.intensity = ci * 6.5;
      pointLightRef.current.color.set(lampColor);
    }

    // Bulb emissive glow
    if (bulbRef.current) {
      materials.frostedBulb.emissiveIntensity = ci * 4.5;
      materials.frostedBulb.emissive.set(ci > 0.02 ? lampColor : "#000000");
    }

    // Volumetric beam opacity & color
    if (volumetricBeamRef.current) {
      materials.volumetricBeamMat.opacity = ci * 0.14;
      materials.volumetricBeamMat.color.set(lampColor);
    }

    // Base switch LED
    if (baseSwitchLedRef.current) {
      materials.switchLedMat.emissive.set(ci > 0.1 ? lampColor : "#374151");
      materials.switchLedMat.emissiveIntensity = ci > 0.1 ? 2.5 : 0.3;
    }

    // Subtle natural head tracking following mouse with realistic mechanical limits
    if (headGroupRef.current) {
      const mouseAimX = state.pointer.y * -0.06 + headRotOffset.current.x;
      const mouseAimY = state.pointer.x * 0.09 + headRotOffset.current.y;

      const targetX = 0.46 + THREE.MathUtils.clamp(mouseAimX, -0.18, 0.18);
      const targetY = 0.18 + THREE.MathUtils.clamp(mouseAimY, -0.25, 0.25);

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
      position={[-0.45, -1.8, 0]}
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
        <mesh position={[0, 0.14, 0]} material={materials.machinedBrass}>
          <torusGeometry args={[1.08, 0.018, 12, 48]} />
        </mesh>

        {/* Central brass mounting collar */}
        <mesh position={[0, 0.36, 0]} material={materials.machinedBrass}>
          <cylinderGeometry args={[0.15, 0.17, 0.22, 24]} />
        </mesh>

        {/* Swivel stem pin */}
        <mesh position={[0, 0.5, 0]} material={materials.structuralMetal}>
          <cylinderGeometry args={[0.1, 0.1, 0.12, 20]} />
        </mesh>

        {/* Tactile Power Switch directly integrated into the base */}
        <group position={[0.55, 0.23, 0.5]}>
          <mesh material={materials.machinedBrass}>
            <cylinderGeometry args={[0.07, 0.08, 0.04, 16]} />
          </mesh>
          <mesh ref={baseSwitchLedRef} position={[0, 0.03, 0]} material={materials.switchLedMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          </mesh>
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. LOWER ARTICULATED JOINT & TWIN STRUTS
          ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.58, 0]}>
        {/* Brass central axle */}
        <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.4, 20]} />
        </mesh>
        {/* Flanged black clamping discs */}
        <mesh position={[0.2, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.045, 24]} />
        </mesh>
        <mesh position={[-0.2, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.045, 24]} />
        </mesh>
        {/* Brass knurled thumbscrew knob */}
        <mesh position={[0.26, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.07, 16]} />
        </mesh>

        {/* Lower Arm (Pivots at -0.32 rad ~ 18 deg backward) */}
        <group rotation={[0, 0, -0.32]}>
          {/* Strut A (Front black square rail) */}
          <mesh position={[0.07, 1.1, 0.07]} material={materials.powderCoatedBlack}>
            <boxGeometry args={[0.055, 2.2, 0.055]} />
          </mesh>
          {/* Strut B (Back black square rail) */}
          <mesh position={[-0.07, 1.1, -0.07]} material={materials.powderCoatedBlack}>
            <boxGeometry args={[0.055, 2.2, 0.055]} />
          </mesh>

          {/* Lower spring anchor bracket */}
          <mesh position={[0, 0.2, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.22, 0.065, 0.16]} />
          </mesh>

          {/* Upper spring anchor bracket on lower arm */}
          <mesh position={[0, 1.1, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.22, 0.065, 0.16]} />
          </mesh>

          {/* ══════════════════════════════════════════════════════════════
              3. LOWER TENSION SPRINGS
              ══════════════════════════════════════════════════════════════ */}
          {/* Spring 1 (Front) */}
          <group position={[0.08, 0.26, 0.12]}>
            <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.028, 0.007, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.88, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.028, 0.007, 8, 16]} />
            </mesh>
          </group>

          {/* Spring 2 (Back) */}
          <group position={[-0.08, 0.26, -0.12]}>
            <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.028, 0.007, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.88, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.028, 0.007, 8, 16]} />
            </mesh>
          </group>

          {/* ══════════════════════════════════════════════════════════════
              4. ELBOW PIVOT JOINT
              ══════════════════════════════════════════════════════════════ */}
          <group position={[0, 2.2, 0]}>
            {/* Central brass hub */}
            <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.13, 0.13, 0.38, 20]} />
            </mesh>
            {/* Side hinge plates */}
            <mesh position={[0.19, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.21, 0.21, 0.045, 24]} />
            </mesh>
            <mesh position={[-0.19, 0, 0]} material={materials.powderCoatedBlack} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.21, 0.21, 0.045, 24]} />
            </mesh>
            {/* Brass thumbscrew with cross-bar */}
            <mesh position={[0.25, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.09, 16]} />
            </mesh>
            <mesh position={[0.31, 0, 0]} material={materials.machinedBrass}>
              <boxGeometry args={[0.045, 0.25, 0.045]} />
            </mesh>

            {/* Arched Rubber Cable loop over elbow */}
            <mesh geometry={geometries.elbowCableGeo} material={materials.rubberCable} />

            {/* ══════════════════════════════════════════════════════════
                5. UPPER ARTICULATED ARM (Aimed forward-right at +0.75 rad)
                ══════════════════════════════════════════════════════════ */}
            <group rotation={[0, 0, 0.75]}>
              {/* Upper twin rails */}
              <mesh position={[0.065, 1.0, 0.06]} material={materials.powderCoatedBlack}>
                <boxGeometry args={[0.055, 2.0, 0.055]} />
              </mesh>
              <mesh position={[-0.065, 1.0, -0.06]} material={materials.powderCoatedBlack}>
                <boxGeometry args={[0.055, 2.0, 0.055]} />
              </mesh>

              {/* Upper arm cross brace */}
              <mesh position={[0, 0.95, 0]} material={materials.structuralMetal}>
                <boxGeometry args={[0.2, 0.055, 0.13]} />
              </mesh>

              {/* Upper tension spring anchors */}
              <mesh position={[0, 0.18, 0]} material={materials.machinedBrass}>
                <boxGeometry args={[0.2, 0.055, 0.14]} />
              </mesh>
              <mesh position={[0, 1.05, 0]} material={materials.machinedBrass}>
                <boxGeometry args={[0.2, 0.055, 0.14]} />
              </mesh>

              {/* Upper Tension Springs */}
              <group position={[0.07, 0.22, 0.1]}>
                <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
              </group>
              <group position={[-0.07, 0.22, -0.1]}>
                <mesh geometry={geometries.springGeo} material={materials.springSteel} castShadow />
              </group>

              {/* ════════════════════════════════════════════════════════
                  6. SHADE SWIVEL NECK & SOCKET
                  ════════════════════════════════════════════════════════ */}
              <group position={[0, 2.0, 0]}>
                {/* Neck pivot brass knuckle */}
                <mesh material={materials.machinedBrass}>
                  <sphereGeometry args={[0.14, 20, 20]} />
                </mesh>
                <mesh position={[0.13, 0, 0]} material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.055, 0.055, 0.07, 12]} />
                </mesh>

                {/* ══════════════════════════════════════════════════════
                    7. PARABOLIC BELL LAMPSHADE HEAD
                    ══════════════════════════════════════════════════════ */}
                <group ref={headGroupRef} rotation={[0.46, 0.18, 0.32]}>
                  {/* Brass top cable gland nut */}
                  <mesh position={[0, 0.74, 0]} material={materials.machinedBrass}>
                    <cylinderGeometry args={[0.09, 0.1, 0.11, 16]} />
                  </mesh>

                  {/* Arched rubber wire entering top gland */}
                  <mesh geometry={geometries.headCableGeo} material={materials.rubberCable} />

                  {/* Cylindrical socket housing */}
                  <mesh position={[0, 0.48, 0]} material={materials.powderCoatedBlack}>
                    <cylinderGeometry args={[0.2, 0.23, 0.4, 32]} />
                  </mesh>

                  {/* Brass accent collar ring between socket & dome */}
                  <mesh position={[0, 0.28, 0]} material={materials.machinedBrass}>
                    <torusGeometry args={[0.22, 0.018, 12, 32]} />
                  </mesh>

                  {/* Parabolic Bell Shade (Lathe Geometry) */}
                  <mesh geometry={geometries.shadeGeo} material={materials.powderCoatedBlack} castShadow />

                  {/* Warm Off-White Satin Reflector Interior */}
                  <mesh geometry={geometries.shadeGeo} material={materials.reflectorInterior} />

                  {/* ════════════════════════════════════════════════════
                      8. RECESSED FROSTED DIFFUSER BULB
                      ════════════════════════════════════════════════════ */}
                  <mesh ref={bulbRef} position={[0, -0.18, 0]} material={materials.frostedBulb}>
                    <sphereGeometry args={[0.19, 32, 32]} />
                  </mesh>

                  {/* ════════════════════════════════════════════════════
                      9. THREE.JS SPOTLIGHT & AMBIENT FILL
                      ════════════════════════════════════════════════════ */}
                  <spotLight
                    ref={spotLightRef}
                    position={[0, -0.24, 0]}
                    angle={0.65}
                    penumbra={0.85}
                    intensity={0}
                    color={lampColor}
                    distance={25}
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
                    position={[0, -0.32, 0]}
                    intensity={0}
                    color={lampColor}
                    distance={8}
                    decay={2}
                  />

                  {/* ════════════════════════════════════════════════════
                      10. VOLUMETRIC ATMOSPHERIC LIGHT CONE
                      ════════════════════════════════════════════════════ */}
                  <mesh
                    ref={volumetricBeamRef}
                    position={[0, -2.5, 0]}
                    material={materials.volumetricBeamMat}
                    geometry={geometries.coneGeo}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Target object for Spotlight anchored on the desk surface */}
      <object3D ref={spotTargetRef} position={[2.4, 0.05, 0.4]} />

      {/* Trailing Rubber Base Power Cord */}
      <mesh position={[-0.8, 0.03, 0.35]} rotation={[0, 0.35, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 0.9, 8]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
      <mesh position={[-1.3, 0.025, 0.6]} rotation={[0, 0.65, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 0.7, 8]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
    </group>
  );
}
