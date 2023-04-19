import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

const StarryBackground = () => {
     const starsRef = useRef();

     return (
          <>
               <Stars
                    ref={starsRef}
                    depth={250}
                    saturation={1}
                    speed={1}
                    count={3000}
               />
               <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.2}
                    enableZoom={false}
               />
          </>
     );
};

export default StarryBackground;
