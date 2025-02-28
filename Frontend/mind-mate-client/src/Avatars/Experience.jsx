import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { ClaraComponent } from "./ClaraComponent";
import { useThree } from "@react-three/fiber";

export const Experience = () => {
  // const texture = useTexture("textures/therapist-bg.jpg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      {/* <OrbitControls args={[viewport.width, viewport.height]} target={[0, 0, 0]}/> */}
      <OrbitControls
        enableRotate={true}
        enablePan={true}
        enableZoom={false}
        minPolarAngle={(Math.PI / 2)*0.85}
        maxPolarAngle={(Math.PI / 2)*0.85}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
      />
      <ClaraComponent position={[0, -15, 0]} scale={10} />
      <Environment preset="warehouse" />
      <mesh>
        {/* <planeGeometry args={[viewport.width, viewport.height]} /> */}
        {/* <meshBasicMaterial /> */}
      </mesh>
    </>
  );
};
