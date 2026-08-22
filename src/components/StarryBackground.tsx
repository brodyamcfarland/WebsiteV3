import { OrbitControls, Stars } from "@react-three/drei";

const StarryBackground = () => (
  <>
    <Stars depth={250} saturation={1} speed={1} count={3000} />
    <OrbitControls autoRotate autoRotateSpeed={0.2} enableZoom={false} enablePan={false} enableRotate={false} />
  </>
);

export default StarryBackground;
