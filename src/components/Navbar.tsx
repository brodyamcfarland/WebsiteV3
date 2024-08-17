import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineFilePdf,
} from "react-icons/ai";
import { RiStackLine } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [currentNav, setCurrentNav] = useState<string>("#home");

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-[-24px] left-[50%] z-50 flex w-full -translate-x-1/2 -translate-y-1/2 justify-between bg-gradient-to-t from-white/10 to-transparent shadow shadow-white/40 backdrop-blur-md md:top-[40%] md:left-[6%] md:h-[300px] md:w-auto md:flex-col md:justify-center md:gap-6 md:rounded-full md:py-3 md:px-4 xl:left-[20%]"
    >
      <Link
        href="#home"
        className={`${
          currentNav === "#home" ? "bg-white/20" : ""
        } flex  w-full items-center justify-center border border-white/50 bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10 md:w-auto md:rounded-full`}
        title="Home"
        onClick={() => {
          setCurrentNav("#home");
        }}
      >
        <AiOutlineHome size={23} />
      </Link>
      <Link
        href="#projects"
        className={`${
          currentNav === "#projects" ? "bg-white/20" : ""
        } flex w-full items-center justify-center border border-white/50 bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10 md:w-auto md:rounded-full`}
        title="Projects"
        onClick={() => setCurrentNav("#projects")}
      >
        <RiStackLine size={23} />
      </Link>

      <Link
        href="#contact"
        className={`${
          currentNav === "#contact" ? "bg-white/20" : ""
        } flex w-full items-center justify-center border border-white/50 bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10 md:w-auto md:rounded-full`}
        title="Contact"
        onClick={() => setCurrentNav("#contact")}
      >
        <AiOutlineMessage size={23} />
      </Link>
      <Link
        href="/Brody-McFarland-Resume-2-22-23.pdf"
        download={true}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center border border-white/50 bg-red-900/50 p-3 duration-300 hover:cursor-pointer hover:bg-[#be2532]/90 md:w-auto md:rounded-full"
        title="Download Resume"
      >
        <AiOutlineFilePdf size={23} />
      </Link>
    </motion.nav>
  );
};

export default Navbar;
