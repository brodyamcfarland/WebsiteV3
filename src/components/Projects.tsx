import React from "react";
import Image from "next/image";

const Projects = () => {
    return (
        <div>
            <h1 className="z-30 mt-20 text-center text-xl uppercase tracking-widest">
                PROJECTS
            </h1>
            <div className="mx-5 mt-2 flex max-w-3xl flex-col items-center overflow-x-scroll border-t border-gray-600/75 bg-gradient-to-t from-blue-500/10 to-transparent p-10 pb-5 text-center shadow-inner scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50 md:mx-auto">
                <div className="flex items-center gap-5 pl-[32rem] md:pl-[10rem] lg:pl-[5rem]">
                    <div className="flex flex-col rounded-md border border-gray-600/50 bg-gradient-to-t from-[#0f0f0f] to-purple-600/50 pb-4 shadow-md">
                        <Image
                            src="/REACT.png"
                            className="h-full w-full border-b border-gray-500/50 object-contain"
                            width={1000}
                            height={1000}
                            alt="Project 1 Image"
                            priority={true}
                        />
                        <h3 className="pt-2 tracking-widest">Coin Camp</h3>
                        <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                            Crowdfunding Website built with NextJS, Typescript,
                            Tailwind, Thirdweb, powered by Polygon (MATIC).
                        </p>
                        <div className="flex items-center justify-center gap-20 px-5">
                            <button className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10">
                                Code
                            </button>
                            <button className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500">
                                Demo
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col rounded-md border border-gray-600/50 bg-gradient-to-t from-[#0f0f0f] to-red-600/50 pb-4 shadow-md">
                        <Image
                            src="/REACT.png"
                            className="h-full w-full border-b border-gray-500/50 object-contain"
                            width={1000}
                            height={1000}
                            alt="Project 1 Image"
                            priority={true}
                        />
                        <h3 className="pt-2 tracking-widest">Coin Camp</h3>
                        <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                            Crowdfunding Website built with NextJS, Typescript,
                            Tailwind, Thirdweb, powered by Polygon (MATIC).
                        </p>
                        <div className="flex items-center justify-center gap-20 px-5">
                            <button className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10">
                                Code
                            </button>
                            <button className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500">
                                Demo
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col rounded-md border border-gray-600/50 bg-gradient-to-t from-[#0f0f0f] to-yellow-600/50 pb-4 shadow-md">
                        <Image
                            src="/REACT.png"
                            className="h-full w-full border-b border-gray-500/50 object-contain"
                            width={1000}
                            height={1000}
                            alt="Project 1 Image"
                            priority={true}
                        />
                        <h3 className="pt-2 tracking-widest">Coin Camp</h3>
                        <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                            Crowdfunding Website built with NextJS, Typescript,
                            Tailwind, Thirdweb, powered by Polygon (MATIC).
                        </p>
                        <div className="flex items-center justify-center gap-20 px-5">
                            <button className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10">
                                Code
                            </button>
                            <button className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500">
                                Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
