"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Lamp3DModelProps {
  isOn: boolean;
  lampColor: string;
  lampRgb: [number, number, number];
  onToggle?: () => void;
}

export function Lamp3DModel({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
}: Lamp3DModelProps) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const deskSpotRef = useRef<THREE.Mesh>(null);

  const [isHovered, setIsHovered] = useState(false);

  // Materials – memoised for top-tier WebGL performance
  const matteBlack = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#181C24",
        metalness: 0.35,
        roughness: 0.6,
      }),
    []
  );

  const darkMetallic = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#282E3A",
        metalness: 0.7,
        roughness: 0.35,
      }),
    []
  );

  const brass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F59E0B",
        metalness: 0.92,
        roughness: 0.22,
        emissive: "#78350F",
        emissiveIntensity: 0.12,
      }),
    []
  );

  const shadeExterior = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#161A22",
        metalness: 0.5,
        roughness: 0.45,
        side: THREE.DoubleSide,
      }),
    []
  );

  const shadeInterior = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D1D5DB",
        metalness: 0.85,
        roughness: 0.2,
        side: THREE.BackSide,
      }),
    []
  );

  // Animated glow & lighting intensity transition
  const targetIntensity = isOn ? 1 : 0;
  const currentIntensity = useRef(isOn ? 1 : 0);

  // Volumetric light beam cone material
  const beamMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: lampColor,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Ground desk illuminated reflection material
  const deskSpotMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: lampColor,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    // Smoothly lerp light intensity for realistic switch ON/OFF fade
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      targetIntensity,
      delta * 5
    );
    const ci = currentIntensity.current;

    // SpotLight power
    if (spotLightRef.current) {
      spotLightRef.current.intensity = ci * 65;
      spotLightRef.current.color.set(lampColor);
    }
    // PointLight ambient inside shade
    if (pointLightRef.current) {
      pointLightRef.current.intensity = ci * 12;
      pointLightRef.current.color.set(lampColor);
    }

    // Bulb emissive glow
    if (bulbRef.current) {
      const mat = bulbRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = ci * 4;
      mat.emissive.set(ci > 0.05 ? lampColor : "#000000");
    }

    // Volumetric beam cone opacity & color
    if (beamRef.current) {
      beamMaterial.opacity = ci * 0.22;
      beamMaterial.color.set(lampColor);
    }

    // Ground illumination spot
    if (deskSpotRef.current) {
      deskSpotMaterial.opacity = ci * 0.35;
      deskSpotMaterial.color.set(lampColor);
    }

    // Interactive subtle head aiming / mouse tracking
    if (headGroupRef.current) {
      const targetAimX = 0.58 + state.pointer.y * -0.06;
      const targetAimY = 0.15 + state.pointer.x * 0.1;
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetAimX,
        delta * 2.5
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetAimY,
        delta * 2.5
      );
    }
  });

  return (
    <group
      position={[-0.4, -2.75, 0]}
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
    >
      {/* ══════════════════════════════════════════
          1. LAMP BASE (Circular weighted industrial base)
          ══════════════════════════════════════════ */}
      <group position={[0, 0, 0]}>
        {/* Base bottom pad */}
        <mesh position={[0, 0.05, 0]} material={matteBlack}>
          <cylinderGeometry args={[1.35, 1.45, 0.1, 48]} />
        </mesh>
        {/* Base main weighted body */}
        <mesh position={[0, 0.16, 0]} material={darkMetallic}>
          <cylinderGeometry args={[1.25, 1.35, 0.12, 48]} />
        </mesh>
        {/* Brass illuminated accent rim */}
        <mesh position={[0, 0.22, 0]} material={brass}>
          <torusGeometry args={[1.2, 0.035, 16, 48]} />
        </mesh>
        {/* Inner base disc */}
        <mesh position={[0, 0.22, 0]} material={matteBlack}>
          <cylinderGeometry args={[1.05, 1.15, 0.06, 48]} />
        </mesh>
        {/* Center stem collar */}
        <mesh position={[0, 0.32, 0]} material={darkMetallic}>
          <cylinderGeometry args={[0.22, 0.28, 0.14, 24]} />
        </mesh>
        {/* Base mounting joint knob */}
        <mesh position={[0, 0.44, 0]} material={brass}>
          <sphereGeometry args={[0.2, 24, 24]} />
        </mesh>
        <mesh position={[0.2, 0.44, 0]} material={brass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════
          2. LOWER ARTICULATED ARM (Dual chrome/dark rods)
          ══════════════════════════════════════════ */}
      <group position={[0, 0.44, 0]} rotation={[0, 0, -0.22]}>
        {/* Front rod */}
        <mesh position={[0.07, 1.45, 0.06]} material={darkMetallic}>
          <cylinderGeometry args={[0.045, 0.045, 2.9, 12]} />
        </mesh>
        {/* Back rod */}
        <mesh position={[-0.07, 1.45, -0.06]} material={darkMetallic}>
          <cylinderGeometry args={[0.045, 0.045, 2.9, 12]} />
        </mesh>
        {/* Cross support struts */}
        <mesh position={[0, 1.1, 0]} rotation={[0, 0, 0.55]} material={matteBlack}>
          <cylinderGeometry args={[0.025, 0.025, 0.38, 8]} />
        </mesh>
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, -0.55]} material={matteBlack}>
          <cylinderGeometry args={[0.025, 0.025, 0.38, 8]} />
        </mesh>

        {/* ══════════════════════════════════════════
            3. MIDDLE ELBOW PIVOT JOINT
            ══════════════════════════════════════════ */}
        <group position={[0, 2.95, 0]}>
          {/* Brass swivel sphere */}
          <mesh material={brass}>
            <sphereGeometry args={[0.23, 24, 24]} />
          </mesh>
          {/* Brass tightening thumbscrew */}
          <mesh position={[0.22, 0, 0]} material={brass} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.14, 16]} />
          </mesh>
          <mesh position={[-0.22, 0, 0]} material={brass} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.14, 16]} />
          </mesh>

          {/* ══════════════════════════════════════════
              4. UPPER ARTICULATED ARM
              ══════════════════════════════════════════ */}
          <group rotation={[0, 0, 0.58]}>
            {/* Primary arm tube */}
            <mesh position={[0, 1.35, 0]} material={darkMetallic}>
              <cylinderGeometry args={[0.055, 0.055, 2.7, 12]} />
            </mesh>
            {/* Secondary stabilizer rod */}
            <mesh position={[0.1, 1.35, 0]} material={matteBlack}>
              <cylinderGeometry args={[0.028, 0.028, 2.5, 8]} />
            </mesh>

            {/* ══════════════════════════════════════════
                5. SHADE NECK PIVOT JOINT
                ══════════════════════════════════════════ */}
            <group position={[0, 2.7, 0]}>
              <mesh material={brass}>
                <sphereGeometry args={[0.18, 24, 24]} />
              </mesh>
              <mesh position={[0.16, 0, 0]} material={brass} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
              </mesh>

              {/* ══════════════════════════════════════════
                  6. LAMPSHADE HEAD (Aimed toward auth card on right)
                  ══════════════════════════════════════════ */}
              <group ref={headGroupRef} rotation={[0.58, 0.15, 0.32]}>
                {/* Connector socket neck */}
                <mesh position={[0, 0.16, 0]} material={darkMetallic}>
                  <cylinderGeometry args={[0.11, 0.15, 0.32, 20]} />
                </mesh>

                {/* Upper dome cone of shade */}
                <mesh position={[0, -0.4, 0]} material={shadeExterior}>
                  <coneGeometry args={[0.14, 1.15, 36, 1, true]} />
                </mesh>

                {/* Main bell body of shade */}
                <mesh position={[0, -0.68, 0]} material={shadeExterior}>
                  <cylinderGeometry args={[0.82, 0.14, 0.65, 36, 1, true]} />
                </mesh>

                {/* Highly reflective interior liner */}
                <mesh position={[0, -0.68, 0]} material={shadeInterior}>
                  <cylinderGeometry args={[0.8, 0.12, 0.63, 36, 1, true]} />
                </mesh>

                {/* Polished brass rim accent around opening */}
                <mesh position={[0, -1.0, 0]} material={brass}>
                  <torusGeometry args={[0.82, 0.03, 12, 48]} />
                </mesh>

                {/* ══════════════════════════════════════════
                    7. HIGH-INTENSITY LED CORE
                    ══════════════════════════════════════════ */}
                <mesh ref={bulbRef} position={[0, -0.6, 0]}>
                  <sphereGeometry args={[0.18, 24, 24]} />
                  <meshStandardMaterial
                    color="#FFFFFF"
                    emissive={lampColor}
                    emissiveIntensity={0}
                    metalness={0.1}
                    roughness={0.15}
                  />
                </mesh>

                {/* ══════════════════════════════════════════
                    8. SPOTLIGHT & POINTLIGHT
                    ══════════════════════════════════════════ */}
                <spotLight
                  ref={spotLightRef}
                  position={[0, -0.7, 0]}
                  angle={0.72}
                  penumbra={0.65}
                  intensity={0}
                  color={lampColor}
                  distance={22}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                  shadow-bias={-0.0005}
                  target-position={[2.5, -6.5, 0.5]}
                />

                <pointLight
                  ref={pointLightRef}
                  position={[0, -0.85, 0]}
                  intensity={0}
                  color={lampColor}
                  distance={8}
                />

                {/* ══════════════════════════════════════════
                    9. VOLUMETRIC LIGHT BEAM CONE
                    ══════════════════════════════════════════ */}
                <mesh
                  ref={beamRef}
                  position={[0, -3.8, 0]}
                  material={beamMaterial}
                >
                  <coneGeometry args={[3.6, 6.2, 36, 1, true]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* ══════════════════════════════════════════
          10. INDUSTRIAL CURVED POWER CORD
          ══════════════════════════════════════════ */}
      <mesh position={[-0.85, 0.06, 0.55]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
        <meshStandardMaterial color="#11141B" roughness={0.8} />
      </mesh>
      <mesh position={[-1.4, 0.04, 0.9]} rotation={[0, 0.85, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial color="#11141B" roughness={0.8} />
      </mesh>

      {/* ══════════════════════════════════════════
          11. ILLUMINATED DESK GLOW POOL (Under Light Cone)
          ══════════════════════════════════════════ */}
      <mesh
        ref={deskSpotRef}
        position={[1.8, 0.01, 0.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={deskSpotMaterial}
      >
        <circleGeometry args={[2.8, 36]} />
      </mesh>

      {/* ══════════════════════════════════════════
          12. DESK SURFACE GROUND PLANE
          ══════════════════════════════════════════ */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial
          color="#080B11"
          metalness={0.25}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}
