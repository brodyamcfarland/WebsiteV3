import Link from "next/link";
import { BsBoxes } from "react-icons/bs";

const ThreeFiber = () => {
  return (
    <Link
      href="https://3d-website-indol.vercel.app/"
      target="_blank"
      title="3D-Website"
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-accent/40 bg-ink/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent backdrop-blur transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-glow md:px-6 md:py-2 md:text-sm"
    >
      <BsBoxes size={14} />
      <span className="hidden md:inline">View in 3-D</span>
      <span className="md:hidden">3-D</span>
    </Link>
  );
};

export default ThreeFiber;
