import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <div className="relative mx-auto mt-10 flex max-w-6xl flex-col items-center p-10 pb-5 text-center">
            <span className="z-30 text-xl font-semibold uppercase tracking-widest">
                Brody McFarland
            </span>
            <p className="uppercase tracking-wider text-gray-400">
                Web Developer
            </p>
            <div className="absolute top-32 right-[51%] z-0 h-32 w-32 animate-pulse border bg-yellow-900 blur-3xl" />
            <div className="absolute top-32 left-[51%] z-0 h-32 w-32 animate-pulse border bg-red-900 blur-3xl" />
            <div className="absolute top-64 right-[51%] z-0 h-32 w-32 animate-pulse border bg-blue-900 blur-3xl" />
            <div className="absolute top-64 left-[51%] z-0 h-32 w-32 animate-pulse border bg-purple-900 blur-3xl" />
            <div className="z-20 my-7 h-52 w-52 rounded-full bg-gray-900 md:h-64 md:w-64">
                <Image
                    src="/REACT.png"
                    className="h-auto w-auto object-contain"
                    width={1000}
                    height={1000}
                    alt="Hero Image"
                    priority={true}
                />
            </div>

            <p className="text-md z-30 tracking-wider text-gray-200">
                Building mordern web experiences and applications with modern
                tools.
            </p>
        </div>
    );
};

export default Hero;
