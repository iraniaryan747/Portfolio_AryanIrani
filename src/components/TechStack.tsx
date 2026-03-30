import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

/** Short labels read best; edit this list anytime. */
const KEYWORDS = [
  "Power BI",
  "Python",
  "SQL",
  "OpenCV",
  "MediaPipe",
  "ETL",
  "React",
  "TypeScript",
  "Pandas",
  "NumPy",
  "Deep learning",
  "TensorFlow",
  "C++",
  "Dashboards",
  "Research",
];

/** Flat face texture: smaller type + pill chip (matches .what-tags feel). */
function createKeywordTexture(text: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D context unavailable for keyword texture");
  }

  const g = ctx.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, "#1a0f28");
  g.addColorStop(1, "#12081c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let fontSize = 40;
  ctx.font = `600 ${fontSize}px system-ui, "Segoe UI", sans-serif`;
  while (ctx.measureText(text).width > size * 0.72 && fontSize > 14) {
    fontSize -= 2;
    ctx.font = `600 ${fontSize}px system-ui, "Segoe UI", sans-serif`;
  }

  const tw = ctx.measureText(text).width;
  const th = fontSize * 1.2;
  const cx = size / 2;
  const cy = size / 2;
  const padX = 20;
  const padY = 10;
  const corner = 20;

  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  ctx.beginPath();
  ctx.roundRect(
    cx - tw / 2 - padX,
    cy - th / 2 - padY,
    tw + padX * 2,
    th + padY * 2,
    corner
  );
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#f4f0ff";
  ctx.fillText(text, cx, cy);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const blocks = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type BlockProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  materials: THREE.MeshPhysicalMaterial[];
  isActive: boolean;
};

/**
 * Physics cube with keyword on +Z face (toward default camera); other faces are matte sides.
 */
function KeywordBlock({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  materials,
  isActive,
}: BlockProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.38}
      friction={0.32}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.5 * scale, 0.5 * scale, 0.5 * scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={boxGeometry}
        material={materials}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const el = document.getElementById("work");
      if (!el) return;
      const threshold = el.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sideMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#151022"),
        metalness: 0.38,
        roughness: 0.92,
        clearcoat: 0.06,
      }),
    []
  );

  const blockMaterialSets = useMemo((): THREE.MeshPhysicalMaterial[][] => {
    return KEYWORDS.map((keyword) => {
      const texture = createKeywordTexture(keyword);
      const face = new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#e8e0ff",
        emissiveMap: texture,
        emissiveIntensity: 0.18,
        metalness: 0.4,
        roughness: 0.9,
        clearcoat: 0.12,
      });
      // +X, -X, +Y, -Y, +Z (front toward camera), -Z
      return [
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        face,
        sideMaterial,
      ];
    });
  }, [sideMaterial]);

  useEffect(() => {
    return () => {
      blockMaterialSets.forEach((set) => {
        const front = set[4];
        front.map?.dispose();
        front.dispose();
      });
      sideMaterial.dispose();
    };
  }, [blockMaterialSets, sideMaterial]);

  return (
    <div className="techstack" id="skills">
      <h2 className="title">Stack &amp; velocity</h2>
      <p className="techstack-lede">
        Power BI, Python, SQL, OpenCV, MediaPipe, deep learning, ETL pipelines,
        dashboard systems, and AI-assisted research workflows
      </p>

      <div className="techstack-canvas-wrap">
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {blocks.map((props, i) => (
              <KeywordBlock
                key={i}
                {...props}
                materials={blockMaterialSets[i % blockMaterialSets.length]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default TechStack;
