import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <div
            className="relative mx-auto mt-10 flex max-w-6xl flex-col items-center p-10 pb-5 text-center"
            id="#"
        >
            <h1 className="z-30 text-xl font-semibold uppercase tracking-widest">
                Brody McFarland
            </h1>
            <h2 className="uppercase tracking-wider text-gray-400">
                Web Developer
            </h2>
            <div className="absolute top-24 right-[50%] z-0 h-40 w-40 animate-pulse-slow bg-yellow-900 mix-blend-screen blur-3xl" />
            <div className="absolute top-24 left-[50%] z-0 h-40 w-40 animate-pulse-slow bg-red-900 mix-blend-screen blur-3xl" />
            <div className="absolute top-56 right-[50%] z-0 h-40 w-40 animate-pulse-slow bg-blue-900 mix-blend-screen blur-3xl" />
            <div className="absolute top-56 left-[50%] z-0 h-40 w-40 animate-pulse-slow bg-purple-900 mix-blend-screen blur-3xl" />
            <div className="z-20 my-7 h-52 w-52 rounded-full bg-gray-900 md:h-64 md:w-64">
                <Image
                    src="/MeteorPic.png"
                    className="h-full w-full rounded-full border-[1px] object-cover"
                    width={1000}
                    height={1000}
                    alt="Hero Image"
                    priority={true}
                />
            </div>

            <p className="text-md z-30 tracking-wider text-gray-200">
                Building modern web experiences and applications with modern
                tools.
            </p>
        </div>
    );
};

export default Hero;
