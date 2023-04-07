import Link from "next/link";

const ThreeFiber = () => {
     return (
          <Link
               href="https://3d-website-indol.vercel.app/"
               target="_blank"
               title="Github"
               className="mb-2 rounded-md border border-gray-600/50 bg-red-800/50 py-1 px-3 text-sm duration-300 hover:bg-red-800/90"
          >
               View in 3-D
          </Link>
     );
};

export default ThreeFiber;
