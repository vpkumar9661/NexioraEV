"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicLampModelProps {
  isOn: boolean;
  lampColor: string;
  onToggle?: () => void;
  resetTrigger?: number;
  reducedMotion?: boolean;
  shadowMapSize?: number;
}

/**
 * Coiled Tension Spring Generator
 * Accurately models architectural desk lamp counterbalance springs.
 */
class HelicalSpringCurve extends THREE.Curve<THREE.Vector3> {
  radius: number;
  height: number;
  turns: number;

  constructor(radius = 0.036, height = 0.85, turns = 16) {
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
function createCableCurve(
  start: THREE.Vector3,
  control: THREE.Vector3,
  end: THREE.Vector3
) {
  return new THREE.QuadraticBezierCurve3(start, control, end);
}

/**
 * Custom GLSL Volumetric Light Beam Shaders
 * Produces soft Fresnel-attenuated boundaries and longitudinal falloff
 * instead of a flat, hard-edged geometric cone.
 */
const VOLUMETRIC_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPos;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mvPosition.xyz;
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const VOLUMETRIC_FRAGMENT_SHADER = `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPos;

  void main() {
    // vUv.y = 1.0 at the top (inside shade), 0.0 at the bottom (desk level)
    float topFade = smoothstep(1.0, 0.86, vUv.y);
    float bottomFade = smoothstep(0.0, 0.58, vUv.y);
    float lengthFalloff = pow(vUv.y, 1.25) * topFade * bottomFade;

    // Fresnel edge attenuation: dissolves grazing edges smoothly into darkness
    vec3 normalDir = normalize(vNormalView);
    vec3 viewDir = normalize(vViewPos);
    float fresnel = abs(dot(normalDir, viewDir));
    float softEdge = pow(fresnel, 2.35);

    // Subtle dense inner core
    float core = smoothstep(0.25, 0.95, fresnel) * 0.45;

    float alpha = (softEdge * 0.85 + core * 0.35) * lengthFalloff * uIntensity;
    gl_FragColor = vec4(uColor, clamp(alpha, 0.0, 0.55));
  }
`;

export function CinematicLampModel({
  isOn,
  lampColor,
  onToggle,
  resetTrigger = 0,
  reducedMotion = false,
  shadowMapSize = 1024,
}: CinematicLampModelProps) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const environmentBounceLightRef = useRef<THREE.PointLight>(null);
  const spotTargetRef = useRef<THREE.Object3D>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const lowerArmGroupRef = useRef<THREE.Group>(null);
  const upperArmGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const volumetricBeamRef = useRef<THREE.Mesh>(null);
  const baseSwitchLedRef = useRef<THREE.Mesh>(null);

  // Interactive Aim State
  const [, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const headRotOffset = useRef({ x: 0, y: 0 });

  // Reset lamp orientation on trigger
  useEffect(() => {
    headRotOffset.current = { x: 0, y: 0 };
  }, [resetTrigger]);

  // Attach SpotLight target inside headGroupRef so beam follows head rotation
  useEffect(() => {
    if (spotLightRef.current && spotTargetRef.current) {
      spotLightRef.current.target = spotTargetRef.current;
      spotLightRef.current.target.updateMatrixWorld();
    }
  }, []);

  // ══════════════════════════════════════════════════════════════
  // PBR MATERIALS — Created once, updated smoothly in useFrame
  // ══════════════════════════════════════════════════════════════
  const materials = useMemo(() => {
    // Matte brushed dark graphite / anodized metal (Lamp base & shade exterior)
    const brushedDarkMetal = new THREE.MeshPhysicalMaterial({
      color: "#1B1E26",
      metalness: 0.65,
      roughness: 0.4,
      clearcoat: 0.22,
      clearcoatRoughness: 0.36,
      reflectivity: 0.72,
    });

    // Dark architectural structural steel (Parallel arm struts)
    const structuralMetal = new THREE.MeshPhysicalMaterial({
      color: "#262C38",
      metalness: 0.76,
      roughness: 0.34,
      clearcoat: 0.16,
      clearcoatRoughness: 0.38,
    });

    // Machined brass mechanical hardware (Joint pins, thumbscrews, collars)
    const machinedBrass = new THREE.MeshPhysicalMaterial({
      color: "#C89B4B",
      metalness: 0.88,
      roughness: 0.26,
      clearcoat: 0.18,
      clearcoatRoughness: 0.24,
      emissive: "#1F1404",
      emissiveIntensity: 0.08,
    });

    // High-tensile coiled spring steel
    const springSteel = new THREE.MeshStandardMaterial({
      color: "#9AA5B6",
      metalness: 0.86,
      roughness: 0.24,
    });

    // Parabolic shade interior reflector (Satin warm off-white)
    const reflectorInterior = new THREE.MeshPhysicalMaterial({
      color: "#F5EFE6",
      metalness: 0.18,
      roughness: 0.28,
      sheen: 0.3,
      sheenRoughness: 0.4,
      side: THREE.BackSide,
    });

    // Frosted LED diffuser bulb
    const frostedBulb = new THREE.MeshStandardMaterial({
      color: "#E2E8F0",
      metalness: 0.05,
      roughness: 0.18,
      emissive: new THREE.Color("#000000"),
      emissiveIntensity: 0,
      transparent: true,
      opacity: 0.96,
    });

    // Custom Shader Volumetric Light Beam
    const volumetricBeamMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#FFB547") },
        uIntensity: { value: 0 },
      },
      vertexShader: VOLUMETRIC_VERTEX_SHADER,
      fragmentShader: VOLUMETRIC_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    // Matte black rubber electrical wire
    const rubberCable = new THREE.MeshStandardMaterial({
      color: "#0F1218",
      roughness: 0.85,
      metalness: 0.06,
    });

    // Base switch ring LED
    const switchLedMat = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      emissive: new THREE.Color("#374151"),
      emissiveIntensity: 0.25,
      roughness: 0.2,
    });

    return {
      brushedDarkMetal,
      structuralMetal,
      machinedBrass,
      springSteel,
      reflectorInterior,
      frostedBulb,
      volumetricBeamMat,
      rubberCable,
      switchLedMat,
    };
  }, []);

  // ══════════════════════════════════════════════════════════════
  // GEOMETRIES — High-Resolution Smooth Parametric Geometry
  // ══════════════════════════════════════════════════════════════
  const geometries = useMemo(() => {
    // 1. High-resolution Helical Spring Geometry
    const springCurve = new HelicalSpringCurve(0.036, 0.84, 16);
    const springGeo = new THREE.TubeGeometry(springCurve, 128, 0.0095, 14, false);
    springGeo.computeVertexNormals();

    // 2. Ultra-Smooth Parabolic Bell Dome Shade (Lathe with smooth bevels & rolled lip)
    const shadePoints: THREE.Vector2[] = [];
    // Smooth top dome cap transition
    shadePoints.push(new THREE.Vector2(0.15, 0.62));
    shadePoints.push(new THREE.Vector2(0.195, 0.615));
    shadePoints.push(new THREE.Vector2(0.215, 0.595));
    shadePoints.push(new THREE.Vector2(0.22, 0.56));
    shadePoints.push(new THREE.Vector2(0.22, 0.38));
    // Smooth shoulder transition into parabolic bell
    shadePoints.push(new THREE.Vector2(0.228, 0.35));
    for (let i = 1; i <= 48; i++) {
      const t = i / 48;
      const y = 0.35 - t * 0.91; // from +0.35 down to -0.56
      const r = 0.228 + Math.pow(t, 0.76) * 0.672; // from 0.228 out to 0.90
      shadePoints.push(new THREE.Vector2(r, y));
    }
    // Smooth 5-point rounded rolled protective rim lip
    shadePoints.push(new THREE.Vector2(0.912, -0.566));
    shadePoints.push(new THREE.Vector2(0.922, -0.575));
    shadePoints.push(new THREE.Vector2(0.916, -0.586));
    shadePoints.push(new THREE.Vector2(0.902, -0.592));
    shadePoints.push(new THREE.Vector2(0.888, -0.586));
    const shadeGeo = new THREE.LatheGeometry(shadePoints, 96);
    shadeGeo.computeVertexNormals();

    // 3. Ultra-Smooth Weighted Circular Base with chamfered bevels
    const basePoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.07, 0),
      new THREE.Vector2(1.08, 0.012),
      new THREE.Vector2(1.08, 0.05),
      new THREE.Vector2(1.065, 0.078),
      new THREE.Vector2(1.035, 0.112),
      new THREE.Vector2(1.02, 0.135),
      new THREE.Vector2(1.02, 0.155),
      new THREE.Vector2(1.0, 0.18),
      new THREE.Vector2(0.965, 0.202),
      new THREE.Vector2(0.935, 0.212),
      new THREE.Vector2(0.36, 0.222),
      new THREE.Vector2(0.31, 0.236),
      new THREE.Vector2(0.28, 0.25),
      new THREE.Vector2(0, 0.25),
    ];
    const baseGeo = new THREE.LatheGeometry(basePoints, 96);
    baseGeo.computeVertexNormals();

    // 4. Open-ended Frustum Cone for Volumetric Shader Beam
    const coneGeo = new THREE.CylinderGeometry(0.46, 2.55, 4.4, 64, 1, true);

    // 5. High-resolution Arched Rubber Cable Curves
    const elbowCableCurve = createCableCurve(
      new THREE.Vector3(-0.05, 1.45, -0.05),
      new THREE.Vector3(-0.36, 1.95, 0),
      new THREE.Vector3(-0.05, 0.48, 0.05)
    );
    const elbowCableGeo = new THREE.TubeGeometry(
      elbowCableCurve,
      48,
      0.017,
      14,
      false
    );
    elbowCableGeo.computeVertexNormals();

    const headCableCurve = createCableCurve(
      new THREE.Vector3(0, 1.45, 0),
      new THREE.Vector3(-0.28, 1.95, 0.1),
      new THREE.Vector3(0, 0.72, 0)
    );
    const headCableGeo = new THREE.TubeGeometry(
      headCableCurve,
      48,
      0.017,
      14,
      false
    );
    headCableGeo.computeVertexNormals();

    return {
      springGeo,
      shadeGeo,
      baseGeo,
      coneGeo,
      elbowCableGeo,
      headCableGeo,
    };
  }, []);

  // Dispose geometries and materials cleanly on unmount
  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [geometries, materials]);

  // ══════════════════════════════════════════════════════════════
  // SMOOTH REAL-TIME LIGHTING & ARTICULATED MOVEMENT
  // ══════════════════════════════════════════════════════════════
  const targetIntensity = isOn ? 1 : 0;
  const currentIntensity = useRef(isOn ? 1 : 0);
  const targetColorObj = useMemo(() => new THREE.Color(lampColor), [lampColor]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const rampSpeed = reducedMotion ? 20 : 4.2;

    // Smooth physical filament power ramp
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      targetIntensity,
      safeDelta * rampSpeed
    );
    const ci = currentIntensity.current;

    // Main SpotLight illumination casting real shadows onto the desk
    if (spotLightRef.current) {
      spotLightRef.current.intensity = ci * 56;
      spotLightRef.current.color.lerp(targetColorObj, safeDelta * 8);
    }

    // Interior shade warm point light (illuminates inner reflector + upper arm)
    if (pointLightRef.current) {
      pointLightRef.current.intensity = ci * 7.5;
      pointLightRef.current.color.lerp(targetColorObj, safeDelta * 8);
    }

    // Soft bounce light rising off the desk to illuminate the articulated metal arms
    if (environmentBounceLightRef.current) {
      environmentBounceLightRef.current.intensity = ci * 3.2;
      environmentBounceLightRef.current.color.lerp(targetColorObj, safeDelta * 8);
    }

    // Bulb emissive glow (subtle standby ember when OFF, bright diffuser when ON)
    if (bulbRef.current) {
      if (ci > 0.015) {
        materials.frostedBulb.emissive.lerp(targetColorObj, safeDelta * 8);
        materials.frostedBulb.emissiveIntensity = 0.08 + ci * 4.4;
      } else {
        materials.frostedBulb.emissive.set("#1E2430");
        materials.frostedBulb.emissiveIntensity = 0.12;
      }
    }

    // Volumetric Shader Beam uniforms
    if (volumetricBeamRef.current) {
      const { uIntensity, uColor } = materials.volumetricBeamMat.uniforms;
      if (uIntensity) {
        uIntensity.value = ci * 0.42;
      }
      if (uColor) {
        (uColor.value as THREE.Color).lerp(targetColorObj, safeDelta * 8);
      }
      volumetricBeamRef.current.visible = ci > 0.005;
    }

    // Base switch LED
    if (baseSwitchLedRef.current) {
      if (ci > 0.1) {
        materials.switchLedMat.emissive.lerp(targetColorObj, safeDelta * 8);
        materials.switchLedMat.emissiveIntensity = 2.4;
      } else {
        materials.switchLedMat.emissive.set("#475569");
        materials.switchLedMat.emissiveIntensity = 0.35;
      }
    }

    // Articulated movement responding smoothly to cursor within mechanical constraints
    const px = reducedMotion ? 0 : state.pointer.x;
    const py = reducedMotion ? 0 : state.pointer.y;

    if (lowerArmGroupRef.current) {
      const targetLowerZ = 0.34 + THREE.MathUtils.clamp(px * -0.025, -0.03, 0.03);
      lowerArmGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        lowerArmGroupRef.current.rotation.z,
        targetLowerZ,
        safeDelta * 2.5
      );
    }

    if (upperArmGroupRef.current) {
      const targetUpperZ = -1.06 + THREE.MathUtils.clamp(py * 0.035, -0.04, 0.04);
      upperArmGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        upperArmGroupRef.current.rotation.z,
        targetUpperZ,
        safeDelta * 2.8
      );
    }

    if (headGroupRef.current) {
      const mouseAimX = py * -0.08 + headRotOffset.current.x;
      const mouseAimY = px * 0.12 + headRotOffset.current.y;

      const targetX = -0.18 + THREE.MathUtils.clamp(mouseAimX, -0.18, 0.18);
      const targetY = 0.22 + THREE.MathUtils.clamp(mouseAimY, -0.25, 0.25);

      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetX,
        safeDelta * 3.5
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetY,
        safeDelta * 3.5
      );
    }
  });

  // Pointer drag to articulate lamp head without firing toggle click
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDragging.current = true;
    dragMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragMoved.current = true;
    }
    headRotOffset.current.x = THREE.MathUtils.clamp(
      headRotOffset.current.x + dy * 0.003,
      -0.25,
      0.25
    );
    headRotOffset.current.y = THREE.MathUtils.clamp(
      headRotOffset.current.y + dx * 0.003,
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
      position={[-0.7, -1.8, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (!dragMoved.current) {
          onToggle?.();
        }
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
        isDragging.current = false;
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
        <mesh
          geometry={geometries.baseGeo}
          material={materials.brushedDarkMetal}
          castShadow
          receiveShadow
        />

        {/* Brass waist groove accent ring */}
        <mesh position={[0, 0.135, 0]} material={materials.machinedBrass}>
          <torusGeometry args={[1.03, 0.016, 20, 96]} />
        </mesh>

        {/* Central brass mounting collar */}
        <mesh position={[0, 0.34, 0]} material={materials.machinedBrass}>
          <cylinderGeometry args={[0.14, 0.16, 0.21, 48]} />
        </mesh>

        {/* Swivel stem pin */}
        <mesh position={[0, 0.47, 0]} material={materials.structuralMetal}>
          <cylinderGeometry args={[0.095, 0.095, 0.11, 48]} />
        </mesh>

        {/* Tactile Power Switch directly integrated into the base */}
        <group position={[0.54, 0.215, 0.48]}>
          <mesh material={materials.machinedBrass}>
            <cylinderGeometry args={[0.068, 0.078, 0.04, 36]} />
          </mesh>
          <mesh
            ref={baseSwitchLedRef}
            position={[0, 0.028, 0]}
            material={materials.switchLedMat}
          >
            <cylinderGeometry args={[0.038, 0.038, 0.02, 36]} />
          </mesh>
        </group>
      </group>

      {/* ══════════════════════════════════════════════════════════════
          2. LOWER ARTICULATED JOINT & TWIN STRUTS
          ══════════════════════════════════════════════════════════════ */}
      <group position={[0, 0.55, 0]}>
        {/* Brass central axle */}
        <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.105, 0.105, 0.38, 48]} />
        </mesh>
        {/* Flanged black clamping discs */}
        <mesh
          position={[0.19, 0, 0]}
          material={materials.brushedDarkMetal}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.19, 0.19, 0.042, 64]} />
        </mesh>
        <mesh
          position={[-0.19, 0, 0]}
          material={materials.brushedDarkMetal}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.19, 0.19, 0.042, 64]} />
        </mesh>
        {/* Brass knurled thumbscrew knob */}
        <mesh
          position={[0.25, 0, 0]}
          material={materials.machinedBrass}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.085, 0.085, 0.068, 36]} />
        </mesh>

        {/* Lower Arm (Pivots backward-left at +0.34 rad) */}
        <group ref={lowerArmGroupRef} rotation={[0, 0, 0.34]}>
          <mesh
            position={[0.065, 1.05, 0.065]}
            material={materials.brushedDarkMetal}
            castShadow
          >
            <boxGeometry args={[0.052, 2.1, 0.052]} />
          </mesh>
          <mesh
            position={[-0.065, 1.05, -0.065]}
            material={materials.brushedDarkMetal}
            castShadow
          >
            <boxGeometry args={[0.052, 2.1, 0.052]} />
          </mesh>

          {/* Lower spring anchor bracket */}
          <mesh position={[0, 0.19, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.21, 0.06, 0.15]} />
          </mesh>

          {/* Upper spring anchor bracket on lower arm */}
          <mesh position={[0, 1.05, 0]} material={materials.machinedBrass}>
            <boxGeometry args={[0.21, 0.06, 0.15]} />
          </mesh>

          {/* ══════════════════════════════════════════════════════════
              3. LOWER TENSION SPRINGS
              ══════════════════════════════════════════════════════════ */}
          <group position={[0.075, 0.24, 0.11]}>
            <mesh
              geometry={geometries.springGeo}
              material={materials.springSteel}
              castShadow
            />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.007, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.84, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.007, 8, 16]} />
            </mesh>
          </group>

          <group position={[-0.075, 0.24, -0.11]}>
            <mesh
              geometry={geometries.springGeo}
              material={materials.springSteel}
              castShadow
            />
            <mesh position={[0, 0, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.007, 8, 16]} />
            </mesh>
            <mesh position={[0, 0.84, 0]} material={materials.machinedBrass}>
              <torusGeometry args={[0.026, 0.007, 8, 16]} />
            </mesh>
          </group>

          {/* ══════════════════════════════════════════════════════════
              4. ELBOW PIVOT JOINT
              ══════════════════════════════════════════════════════════ */}
          <group position={[0, 2.1, 0]}>
            <mesh material={materials.machinedBrass} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.125, 0.125, 0.36, 48]} />
            </mesh>
            <mesh
              position={[0.18, 0, 0]}
              material={materials.brushedDarkMetal}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.2, 0.2, 0.042, 64]} />
            </mesh>
            <mesh
              position={[-0.18, 0, 0]}
              material={materials.brushedDarkMetal}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.2, 0.2, 0.042, 64]} />
            </mesh>
            <mesh
              position={[0.24, 0, 0]}
              material={materials.machinedBrass}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.095, 0.095, 0.085, 36]} />
            </mesh>
            <mesh position={[0.29, 0, 0]} material={materials.machinedBrass}>
              <boxGeometry args={[0.042, 0.24, 0.042]} />
            </mesh>

            {/* Arched Rubber Cable loop over elbow */}
            <mesh
              geometry={geometries.elbowCableGeo}
              material={materials.rubberCable}
            />

            {/* ════════════════════════════════════════════════════════
                5. UPPER ARTICULATED ARM (Leans forward-right at -1.06 rad)
                ════════════════════════════════════════════════════════ */}
            <group ref={upperArmGroupRef} rotation={[0, 0, -1.06]}>
              <mesh
                position={[0.06, 0.95, 0.055]}
                material={materials.brushedDarkMetal}
                castShadow
              >
                <boxGeometry args={[0.052, 1.9, 0.052]} />
              </mesh>
              <mesh
                position={[-0.06, 0.95, -0.055]}
                material={materials.brushedDarkMetal}
                castShadow
              >
                <boxGeometry args={[0.052, 1.9, 0.052]} />
              </mesh>

              {/* Upper arm cross brace */}
              <mesh position={[0, 0.9, 0]} material={materials.structuralMetal}>
                <boxGeometry args={[0.19, 0.05, 0.12]} />
              </mesh>

              {/* Upper tension spring anchors */}
              <mesh position={[0, 0.17, 0]} material={materials.machinedBrass}>
                <boxGeometry args={[0.19, 0.05, 0.13]} />
              </mesh>
              <mesh position={[0, 1.0, 0]} material={materials.machinedBrass}>
                <boxGeometry args={[0.19, 0.05, 0.13]} />
              </mesh>

              {/* Upper Tension Springs */}
              <group position={[0.065, 0.21, 0.095]}>
                <mesh
                  geometry={geometries.springGeo}
                  material={materials.springSteel}
                  castShadow
                />
              </group>
              <group position={[-0.065, 0.21, -0.095]}>
                <mesh
                  geometry={geometries.springGeo}
                  material={materials.springSteel}
                  castShadow
                />
              </group>

              {/* ══════════════════════════════════════════════════════
                  6. SHADE SWIVEL NECK & SOCKET
                  ══════════════════════════════════════════════════════ */}
              <group position={[0, 1.9, 0]}>
                <mesh material={materials.machinedBrass}>
                  <sphereGeometry args={[0.13, 40, 40]} />
                </mesh>
                <mesh
                  position={[0.12, 0, 0]}
                  material={materials.machinedBrass}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <cylinderGeometry args={[0.052, 0.052, 0.065, 32]} />
                </mesh>

                {/* ════════════════════════════════════════════════════
                    7. PARABOLIC BELL LAMPSHADE HEAD
                    ════════════════════════════════════════════════════ */}
                <group ref={headGroupRef} rotation={[-0.18, 0.22, 0.35]}>
                  {/* Brass top cable gland nut */}
                  <mesh position={[0, 0.71, 0]} material={materials.machinedBrass}>
                    <cylinderGeometry args={[0.085, 0.095, 0.1, 36]} />
                  </mesh>

                  {/* Arched rubber wire entering top gland */}
                  <mesh
                    geometry={geometries.headCableGeo}
                    material={materials.rubberCable}
                  />

                  {/* Cylindrical socket housing */}
                  <mesh
                    position={[0, 0.46, 0]}
                    material={materials.brushedDarkMetal}
                  >
                    <cylinderGeometry args={[0.19, 0.21, 0.38, 64]} />
                  </mesh>

                  {/* Brass accent collar ring between socket & dome */}
                  <mesh position={[0, 0.27, 0]} material={materials.machinedBrass}>
                    <torusGeometry args={[0.205, 0.017, 20, 64]} />
                  </mesh>

                  {/* Parabolic Bell Shade (Lathe Geometry) */}
                  <mesh
                    geometry={geometries.shadeGeo}
                    material={materials.brushedDarkMetal}
                    castShadow
                  />

                  {/* Warm Off-White Satin Reflector Interior */}
                  <mesh
                    geometry={geometries.shadeGeo}
                    material={materials.reflectorInterior}
                  />

                  {/* ══════════════════════════════════════════════════
                      8. RECESSED FROSTED DIFFUSER BULB
                      ══════════════════════════════════════════════════ */}
                  <mesh
                    ref={bulbRef}
                    position={[0, -0.18, 0]}
                    material={materials.frostedBulb}
                  >
                    <sphereGeometry args={[0.18, 32, 32]} />
                  </mesh>

                  {/* ══════════════════════════════════════════════════
                      9. THREE.JS SPOTLIGHT & AMBIENT FILL
                      ══════════════════════════════════════════════════ */}
                  <spotLight
                    ref={spotLightRef}
                    position={[0, -0.22, 0]}
                    angle={0.62}
                    penumbra={0.88}
                    intensity={0}
                    color={lampColor}
                    distance={22}
                    decay={1.85}
                    castShadow
                    shadow-mapSize-width={shadowMapSize}
                    shadow-mapSize-height={shadowMapSize}
                    shadow-bias={-0.0003}
                    shadow-normalBias={0.02}
                    shadow-radius={4}
                  />

                  {/* Target object anchored inside headGroupRef so beam follows head */}
                  <object3D ref={spotTargetRef} position={[0, -4.0, 0]} />

                  {/* Point light for interior shade reflection */}
                  <pointLight
                    ref={pointLightRef}
                    position={[0, -0.3, 0]}
                    intensity={0}
                    color={lampColor}
                    distance={7}
                    decay={2}
                  />

                  {/* ══════════════════════════════════════════════════
                      10. VOLUMETRIC CUSTOM SHADER LIGHT BEAM
                      ══════════════════════════════════════════════════ */}
                  <mesh
                    ref={volumetricBeamRef}
                    position={[0, -2.4, 0]}
                    material={materials.volumetricBeamMat}
                    geometry={geometries.coneGeo}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Soft bounce light rising from desk surface when lamp is ON */}
      <pointLight
        ref={environmentBounceLightRef}
        position={[1.4, 0.35, 0.6]}
        intensity={0}
        color={lampColor}
        distance={8}
        decay={2}
      />

      {/* Trailing Rubber Base Power Cord */}
      <mesh position={[-0.78, 0.025, 0.32]} rotation={[0, 0.35, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.85, 20]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
      <mesh position={[-1.25, 0.022, 0.56]} rotation={[0, 0.65, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 20]} />
        <meshStandardMaterial color="#0E1015" roughness={0.85} />
      </mesh>
    </group>
  );
}
