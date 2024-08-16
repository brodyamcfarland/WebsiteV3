import Link from "next/link";

const ThreeFiber = () => {
  return (
    <Link
      href="https://3d-website-indol.vercel.app/"
      target="_blank"
      title="3D-Website"
      className="relative mt-6 rounded-full border border-gray-600/50 bg-red-800/50 py-1 px-3 text-sm duration-300 hover:bg-red-800/90 md:mt-14 md:py-2 md:px-6"
    >
      View in 3-D
    </Link>
  );
};

export default ThreeFiber;
