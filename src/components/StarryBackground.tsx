import { OrbitControls, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const StarryBackground = () => {
  const width = useThree((s) => s.size.width);
  const count = width < 768 ? 1200 : 3000;

  return (
    <>
      <Stars depth={250} saturation={1} speed={1} count={count} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.2}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
};

export default StarryBackground;
