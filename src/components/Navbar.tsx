import React from "react";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";
import { RiStackLine } from "react-icons/ri";

const Navbar = () => {
    return (
        <nav className="fixed top-[88%] left-[50%] z-50 flex -translate-x-1/2 -translate-y-1/2 gap-4 rounded-full bg-gradient-to-r from-white/5 to-transparent py-3 px-6 shadow shadow-white/40 backdrop-blur-md md:top-[40%] md:left-[6%] md:flex-col md:px-3 md:py-6 xl:left-[20%]">
            <button
                className="rounded-full bg-[#0f0f0f] p-3 duration-300 hover:bg-white/10"
                title="Home"
            >
                <AiOutlineHome size={23} />
            </button>
            <button
                className="rounded-full bg-[#0f0f0f] p-3 duration-300 hover:bg-white/10"
                title="Projects"
            >
                <RiStackLine size={23} />
            </button>
            <button
                className="rounded-full bg-[#0f0f0f] p-3 duration-300 hover:bg-white/10"
                title="Skills"
            >
                <FaChartBar size={23} />
            </button>
            <button
                className="rounded-full bg-[#0f0f0f] p-3 duration-300 hover:bg-white/10"
                title="Contact"
            >
                <AiOutlineMessage size={23} />
            </button>
        </nav>
    );
};

export default Navbar;
