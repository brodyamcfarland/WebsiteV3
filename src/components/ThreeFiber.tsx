import Link from "next/link";
import { BsBoxes } from "react-icons/bs";

const ThreeFiber = () => {
  return (
    <Link
      href="https://3d.brodymcfarland.com/"
      target="_blank"
      title="3D-Website"
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-ink/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-white backdrop-blur transition-all duration-300 hover:border-accent/70 hover:text-accent-soft hover:shadow-glow md:px-6 md:py-2 md:text-sm"
    >
      <BsBoxes size={14} />
      <span className="hidden md:inline">View in 3-D</span>
      <span className="md:hidden">3-D</span>
    </Link>
  );
};

export default ThreeFiber;
