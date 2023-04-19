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
               className="fixed top-[88%] left-[50%] z-50 flex -translate-x-1/2 -translate-y-1/2 gap-6 rounded-full bg-gradient-to-r from-white/5 to-transparent py-3 px-6 shadow shadow-white/40 backdrop-blur-md md:top-[40%] md:left-[6%] md:flex-col md:px-3 md:py-6 xl:left-[20%]"
          >
               <Link
                    href="#home"
                    className={`${
                         currentNav === "#home" ? "bg-white/20" : ""
                    } rounded-full  border border-white/50 bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10`}
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
                    } rounded-full border border-white/50 bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10`}
                    title="Projects"
                    onClick={() => setCurrentNav("#projects")}
               >
                    <RiStackLine size={23} />
               </Link>

               <Link
                    href="#contact"
                    className={`${
                         currentNav === "#contact" ? "bg-white/20" : ""
                    } rounded-full border border-white/50 bg-[#0f0f0f] p-3 duration-300 hover:cursor-pointer hover:bg-white/10`}
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
                    className="rounded-full bg-[#be2532]/50 p-3 duration-300 hover:cursor-pointer hover:bg-[#be2532]/90"
                    title="Download Resume"
               >
                    <AiOutlineFilePdf size={23} />
               </Link>
          </motion.nav>
     );
};

export default Navbar;
