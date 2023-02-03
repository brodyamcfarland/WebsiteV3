import React from "react";
import Image from "next/image";

const Projects = () => {
    return (
        <div className="mx-5 mt-10 flex max-w-6xl flex-col items-center border-t border-gray-600/75 bg-gradient-to-t from-blue-800/10 to-transparent p-10 px-2 pb-5 text-center md:mx-auto">
            <div className="flex items-center justify-center gap-5 overflow-x-scroll scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50">
                <div className="flex flex-col border pb-4">
                    <Image
                        src="/REACT.png"
                        className="h-full w-full border-b object-contain"
                        width={1000}
                        height={1000}
                        alt="Project 1 Image"
                        priority={true}
                    />
                    <h3>Coin Camp</h3>
                    <p>Description</p>
                    <div className="flex items-center justify-center gap-20 px-5">
                        <button className="rounded-lg border px-4 py-2">
                            Code
                        </button>
                        <button className="rounded-lg border px-4 py-2">
                            Demo
                        </button>
                    </div>
                </div>

                <div className="flex flex-col border pb-4">
                    <Image
                        src="/REACT.png"
                        className="h-full w-full border-b object-contain"
                        width={1000}
                        height={1000}
                        alt="Project 1 Image"
                        priority={true}
                    />
                    <h3>Coin Camp</h3>
                    <p>Description</p>
                    <div className="flex items-center justify-center gap-20 px-5">
                        <button className="rounded-lg border px-4 py-2">
                            Code
                        </button>
                        <button className="rounded-lg border px-4 py-2">
                            Demo
                        </button>
                    </div>
                </div>

                <div className="flex flex-col border pb-4">
                    <Image
                        src="/REACT.png"
                        className="h-full w-full border-b object-contain"
                        width={1000}
                        height={1000}
                        alt="Project 1 Image"
                        priority={true}
                    />
                    <h3>Coin Camp</h3>
                    <p>Description</p>
                    <div className="flex items-center justify-center gap-20 px-5">
                        <button className="rounded-lg border px-4 py-2">
                            Code
                        </button>
                        <button className="rounded-lg border px-4 py-2">
                            Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
