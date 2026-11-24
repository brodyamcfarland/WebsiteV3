import FlowField from "./FlowField";
import Nebula from "./Nebula";

/** Page background: blue nebula shader with a GPU particle flow field on top. */
const StarryBackground = () => {
  return (
    <>
      <Nebula />
      <FlowField />
    </>
  );
};

export default StarryBackground;
