import { useMemo } from "react";
import FlowField from "./FlowField";
import Nebula from "./Nebula";
import { isPhone } from "../lib/device";

/**
 * Page background: graphite nebula shader with a GPU particle flow field on
 * top. Phones skip the nebula (a full-screen noise shader is the single most
 * expensive thing for a phone GPU, and it's barely visible at that size).
 */
const StarryBackground = () => {
  const phone = useMemo(isPhone, []);
  return (
    <>
      {!phone && <Nebula />}
      <FlowField />
    </>
  );
};

export default StarryBackground;
