import React, { useState } from "react";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { RiStackLine } from "react-icons/ri";

const Navbar = () => {
    const [currentNav, setCurrentNav] = useState<string>("#");

    return (
        <nav className="fixed top-[88%] left-[50%] z-50 flex -translate-x-1/2 -translate-y-1/2 gap-6 rounded-full bg-gradient-to-r from-white/5 to-transparent py-3 px-6 shadow shadow-white/40 backdrop-blur-md md:top-[40%] md:left-[6%] md:flex-col md:px-3 md:py-6 xl:left-[20%]">
            <a
                href="#"
                className={`${
                    currentNav === "#" ? "bg-white/30" : ""
                } rounded-full bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10`}
                title="Home"
                onClick={() => setCurrentNav("#")}
            >
                <AiOutlineHome size={23} />
            </a>
            <a
                href="#projects"
                className={`${
                    currentNav === "#projects" ? "bg-white/30" : ""
                } rounded-full bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10`}
                title="Projects"
                onClick={() => setCurrentNav("#projects")}
            >
                <RiStackLine size={23} />
            </a>

            <a
                href="#contact"
                className={`${
                    currentNav === "#contact" ? "bg-white/30" : ""
                } rounded-full bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10`}
                title="Contact"
                onClick={() => setCurrentNav("#contact")}
            >
                <AiOutlineMessage size={23} />
            </a>
        </nav>
    );
};

export default Navbar;
