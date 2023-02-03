import React from "react";
import Image from "next/image";

const Projects = () => {
    return (
        <div className="mx-5 mt-10 flex overflow-x-scroll scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50 max-w-3xl flex-col items-center border-t border-gray-600/75 bg-gradient-to-t from-blue-500/10 to-transparent p-10 pl-56 pb-5 text-center md:mx-auto">
            <div className="flex items-center gap-5">
                <div className="flex flex-col border border-gray-600/50 shadow-md pb-4 bg-gradient-to-t from-[#0f0f0f] to-purple-600/50 rounded-md">
                    <Image
                        src="/REACT.png"
                        className="h-full w-full border-b object-contain border-gray-500/50"
                        width={1000}
                        height={1000}
                        alt="Project 1 Image"
                        priority={true}
                    />
                    <h3 className="tracking-widest pt-2">Coin Camp</h3>
                    <p className="text-xs text-left px-3 text-gray-400 pt-2 pb-4">Crowdfunding Website built with NextJS, Typescript, Tailwind, Thirdweb, powered by Polygon (MATIC).</p>
                    <div className="flex items-center justify-center gap-20 px-5">
                        <button className="rounded-lg border px-4 py-2 border-gray-600/50 backdrop-blur-xl bg-white/20 opacity-75 hover:opacity-100 duration-300">
                            Code
                        </button>
                        <button className="rounded-lg border px-4 py-2 border-gray-600/50 backdrop-blur-xl bg-white/40 opacity-75 hover:opacity-100 duration-300">
                            Demo
                        </button>
                    </div>
                </div>

                <div className="flex flex-col border border-gray-600/50 shadow-md pb-4 bg-gradient-to-t from-[#0f0f0f] to-red-600/50 rounded-md">
                    <Image
                        src="/REACT.png"
                        className="h-full w-full border-b border-gray-500/50 object-contain"
                        width={1000}
                        height={1000}
                        alt="Project 1 Image"
                        priority={true}
                    />
                    <h3 className="tracking-widest pt-2">Coin Camp</h3>
                    <p className="text-xs text-left px-3 text-gray-400 pt-2 pb-4">Crowdfunding Website built with NextJS, Typescript, Tailwind, Thirdweb, powered by Polygon (MATIC).</p>
                    <div className="flex items-center justify-center gap-20 px-5">
                    <button className="rounded-lg border px-4 py-2 border-gray-600/50 backdrop-blur-xl bg-white/20 opacity-75 hover:opacity-100 duration-300">
                            Code
                        </button>
                        <button className="rounded-lg border px-4 py-2 border-gray-600/50 backdrop-blur-xl bg-white/40 opacity-75 hover:opacity-100 duration-300">
                            Demo
                        </button>
                    </div>
                </div>

                <div className="flex flex-col border border-gray-600/50 shadow-md pb-4 bg-gradient-to-t from-[#0f0f0f] to-yellow-600/50 rounded-md">
                    <Image
                        src="/REACT.png"
                        className="h-full w-full border-b object-contain border-gray-500/50"
                        width={1000}
                        height={1000}
                        alt="Project 1 Image"
                        priority={true}
                    />
                    <h3 className="tracking-widest pt-2">Coin Camp</h3>
                    <p className="text-xs text-left px-3 text-gray-400 pt-2 pb-4">Crowdfunding Website built with NextJS, Typescript, Tailwind, Thirdweb, powered by Polygon (MATIC).</p>
                    <div className="flex items-center justify-center gap-20 px-5">
                    <button className="rounded-lg border px-4 py-2 border-gray-600/50 backdrop-blur-xl bg-white/20 opacity-75 hover:opacity-100 duration-300">
                            Code
                        </button>
                        <button className="rounded-lg border px-4 py-2 border-gray-600/50 backdrop-blur-xl bg-white/40 opacity-75 hover:opacity-100 duration-300">
                            Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
