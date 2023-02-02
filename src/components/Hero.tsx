import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center p-10 pb-5 text-center">
            <span className="text-xl font-semibold uppercase tracking-widest">
                Brody McFarland
            </span>
            <p className="uppercase tracking-wider text-gray-400">
                Web Developer
            </p>
            <div className="my-7 h-52 w-52 rounded-full border bg-gray-900 md:h-64 md:w-64">
                <Image
                    src="/REACT.png"
                    className="h-auto w-auto object-contain"
                    width={1000}
                    height={1000}
                    alt="Hero Image"
                    priority={true}
                />
            </div>

            <p className="md:text-md text-sm text-gray-200">
                Building mordern web experiences and applications with modern
                tools.
            </p>
        </div>
    );
};

export default Hero;
