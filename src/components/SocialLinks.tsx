import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

const SocialLinks = () => {
     return (
          <motion.nav
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.25 }}
               className="fixed top-2 left-[50%] z-50 flex -translate-x-1/2 scale-75 gap-16 border-gray-600 px-4 py-2 md:left-[94%] md:top-[25%] md:scale-100 md:flex-col md:gap-4 md:border-l md:border-t-0 md:px-2 md:py-4 xl:left-[80%]"
          >
               <Link
                    href="https://github.com/brodyamcfarland"
                    target="_blank"
                    className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-purple-500/30"
                    title="Github"
               >
                    <BsGithub size={20} />
               </Link>
               <Link
                    href="https://www.linkedin.com/in/brody-mcfarland-93a91b106/"
                    target="_blank"
                    className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-blue-700/30"
                    title="LinkedIn"
               >
                    <BsLinkedin size={20} />
               </Link>
               <Link
                    href="https://twitter.com/off2eth"
                    target="_blank"
                    className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-blue-400/30"
                    title="Twitter"
               >
                    <BsTwitter size={20} />
               </Link>
               <Link
                    href="https://leetcode.com/off2eth/"
                    target="_blank"
                    className="rounded-full bg-white/5 p-3 backdrop-blur-2xl duration-300 hover:bg-yellow-500/30"
                    title="LeetCode"
               >
                    <SiLeetcode size={20} />
               </Link>
          </motion.nav>
     );
};

export default SocialLinks;
