import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";

const SocialLinks = () => {
    return (
        <nav className="z-2 fixed -bottom-2 left-[50%] flex -translate-x-1/2 scale-75 gap-12 border-gray-600 px-4 py-2 md:left-[94%] md:bottom-[49%] md:scale-100 md:flex-col md:gap-4 md:border-l md:border-t-0 md:px-2 md:py-4 xl:left-[80%]">
            <Link
                href="/"
                className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-purple-500/30"
            >
                <BsGithub size={20} />
            </Link>
            <Link
                href="/"
                className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-blue-700/30"
            >
                <BsLinkedin size={20} />
            </Link>
            <Link
                href="/"
                className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-blue-400/30"
            >
                <BsTwitter size={20} />
            </Link>
            <Link
                href="/"
                className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-yellow-500/30"
            >
                <SiLeetcode size={20} />
            </Link>
        </nav>
    );
};

export default SocialLinks;
