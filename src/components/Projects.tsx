import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Projects = () => {
     const containerRef = useRef<HTMLDivElement>(null);
     let isMouseDown = false;
     let startX: number;
     let scrollLeft: number;

     useEffect(() => {
          const container = containerRef.current;

          const handleMouseDown = (e: MouseEvent) => {
               isMouseDown = true;
               startX = e.pageX - container!.offsetLeft;
               scrollLeft = container!.scrollLeft;
          };

          const handleMouseUp = () => {
               isMouseDown = false;
          };

          const handleMouseMove = (e: MouseEvent) => {
               if (!isMouseDown) return;
               e.preventDefault();
               const x = e.pageX - container!.offsetLeft;
               const walk = (x - startX) * 3;
               container!.scrollLeft = scrollLeft - walk;
          };

          container?.addEventListener("mousedown", handleMouseDown);
          container?.addEventListener("mouseup", handleMouseUp);
          container?.addEventListener("mouseleave", handleMouseUp);
          container?.addEventListener("mousemove", handleMouseMove);

          return () => {
               container?.removeEventListener("mousedown", handleMouseDown);
               container?.removeEventListener("mouseup", handleMouseUp);
               container?.removeEventListener("mouseleave", handleMouseUp);
               container?.removeEventListener("mousemove", handleMouseMove);
          };
     }, []);

     return (
          <div className="scale-90 pt-5 md:scale-100">
               <h1 className="z-30 mt-5 select-none text-center text-xl uppercase tracking-widest md:mt-20">
                    PROJECTS
               </h1>
               <div
                    ref={containerRef}
                    className="scroll-behavior-smooth mt-2 flex max-w-3xl items-center gap-5 overflow-x-scroll border-t border-gray-600/75 bg-gradient-to-t from-blue-500/10 to-transparent p-10 px-[15rem] pb-5 text-center shadow-inner scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50 hover:cursor-pointer md:mx-auto md:px-10"
               >
                    <motion.div
                         whileHover={{ scale: 1.025 }}
                         whileTap={{ scale: 0.99 }}
                         className="flex flex-col rounded-md border border-gray-600/50 bg-[#111111] pb-4 shadow-md"
                    >
                         <Image
                              src="/Siphon.png"
                              className="h-80 rounded-tr-md  rounded-tl-md border-b border-gray-500/50 object-fill"
                              width={1000}
                              height={1000}
                              alt="Project 0 Image"
                              priority={true}
                         />
                         <h3 className="pt-2 tracking-widest">Siphon</h3>
                         <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                              HTML to JSON web scraping tool for easy text
                              extraction. Built with NextJS, Cheerio,
                              Typescript, and Tailwind.
                         </p>
                         <div className="flex items-center justify-center gap-20 px-5">
                              <Link
                                   href="https://github.com/brodyamcfarland/Siphon"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10"
                              >
                                   Code
                              </Link>
                              <Link
                                   href="https://siphon-chi.vercel.app/"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500"
                              >
                                   Demo
                              </Link>
                         </div>
                    </motion.div>
                    <motion.div
                         whileHover={{ scale: 1.025 }}
                         whileTap={{ scale: 0.99 }}
                         className="flex flex-col rounded-md border border-gray-600/50 bg-[#111111] pb-4 shadow-md"
                    >
                         <Image
                              src="/threefiber.png"
                              className="h-80 w-full rounded-tr-md  rounded-tl-md border-b border-gray-500/50 object-fill"
                              width={10000}
                              height={10000}
                              alt="Project 3D Image"
                              priority={true}
                         />
                         <h3 className="flex items-center justify-center pt-2 tracking-widest">
                              3-D Portfolio
                         </h3>
                         <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                              3-D version of portfolio. Built with NextJS,
                              React-Three-Fiber, React-Three-DREI, CannonJS,
                              Tailwind, and Typescript.
                         </p>
                         <div className="flex items-center justify-center gap-20 px-5">
                              <Link
                                   href="https://github.com/brodyamcfarland/3D-Website"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10"
                              >
                                   Code
                              </Link>
                              <Link
                                   href="https://3d-website-indol.vercel.app/"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500"
                              >
                                   Demo
                              </Link>
                         </div>
                    </motion.div>
                    <motion.div
                         whileHover={{ scale: 1.025 }}
                         whileTap={{ scale: 0.99 }}
                         className="flex flex-col rounded-md border border-gray-600/50 bg-[#111111] pb-4 shadow-md"
                    >
                         <Image
                              src="/GET.PNG"
                              className="h-80 w-full rounded-tr-md  rounded-tl-md border-b border-gray-500/50 object-fill"
                              width={10000}
                              height={10000}
                              alt="Project 1 Image"
                              priority={true}
                         />
                         <h3 className="flex items-center justify-center pt-2 tracking-widest">
                              GET
                         </h3>
                         <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                              E-Commerce Website built with NextJS, TypeScript,
                              Tailwind, Redux, Firebase, and Framer Motion.
                         </p>
                         <div className="flex items-center justify-center gap-20 px-5">
                              <Link
                                   href="https://github.com/brodyamcfarland/shopping-web-app"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10"
                              >
                                   Code
                              </Link>
                              <Link
                                   href="https://shopping-sepia-seven.vercel.app/"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500"
                              >
                                   Demo
                              </Link>
                         </div>
                    </motion.div>
                    <motion.div
                         whileHover={{ scale: 1.025 }}
                         whileTap={{ scale: 0.99 }}
                         className="flex flex-col rounded-md border border-gray-600/50 bg-[#111111] pb-4 shadow-md"
                    >
                         <Image
                              src="/CoinCamp.PNG"
                              className="h-80 w-full rounded-tr-md  rounded-tl-md border-b border-gray-500/50 object-fill"
                              width={10000}
                              height={10000}
                              alt="Project 2 Image"
                              priority={true}
                         />
                         <h3 className="pt-2 tracking-widest">Coin Camp</h3>
                         <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                              Crowdfunding Website built with NextJS,
                              Typescript, Tailwind, Thirdweb, powered by Polygon
                              (MATIC).
                         </p>
                         <div className="flex items-center justify-center gap-20 px-5">
                              <Link
                                   href="https://github.com/brodyamcfarland/CoinCamp"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10"
                              >
                                   Code
                              </Link>
                              <Link
                                   href="https://coin-camp-jade.vercel.app/"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500"
                              >
                                   Demo
                              </Link>
                         </div>
                    </motion.div>
                    <motion.div
                         whileHover={{ scale: 1.025 }}
                         whileTap={{ scale: 0.99 }}
                         className="flex flex-col rounded-md border border-gray-600/50 bg-[#111111] pb-4 shadow-md"
                    >
                         <Image
                              src="/Shipped.PNG"
                              className="h-80 w-full rounded-tr-md  rounded-tl-md border-b border-gray-500/50 object-cover"
                              width={1000}
                              height={1000}
                              alt="Project 3 Image"
                              priority={true}
                         />
                         <h3 className="pt-2 tracking-widest">Shipped</h3>
                         <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                              Online Shopping website built with NextJS,
                              Typescript, Tailwind, Fakestore API, Next Auth,
                              Stripe, React Redux, and Firebase.
                         </p>
                         <div className="flex items-center justify-center gap-20 px-5">
                              <Link
                                   href="https://github.com/brodyamcfarland/shipped"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10"
                              >
                                   Code
                              </Link>
                              <Link
                                   href="https://shipped.vercel.app/"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500"
                              >
                                   Demo
                              </Link>
                         </div>
                    </motion.div>
                    <motion.div
                         whileHover={{ scale: 1.025 }}
                         whileTap={{ scale: 0.99 }}
                         className="flex flex-col rounded-md border border-gray-600/50 bg-[#111111] pb-4 shadow-md"
                    >
                         <Image
                              src="/Soulbound.PNG"
                              className="h-80 w-full rounded-tr-md  rounded-tl-md border-b border-gray-500/50 object-cover"
                              width={1000}
                              height={1000}
                              alt="Project 4 Image"
                              priority={true}
                         />
                         <h3 className="pt-2 tracking-widest">Connected</h3>
                         <p className="px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                              Social Media website built with React, Tailwind,
                              Firebase, Ethers JS, Solidity, and Typescript.
                         </p>
                         <div className="flex items-center justify-center gap-20 px-5">
                              <Link
                                   href="https://github.com/brodyamcfarland/c0nn3ct3d"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-black/10"
                              >
                                   Code
                              </Link>
                              <Link
                                   href="https://brodyamcfarland.github.io/c0nn3ct3d/"
                                   target="_blank"
                                   className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm backdrop-blur-xl duration-300 hover:bg-gray-500"
                              >
                                   Demo
                              </Link>
                         </div>
                    </motion.div>
               </div>
          </div>
     );
};

export default Projects;
