import Image from "next/image";
import { motion } from "framer-motion";
import ThreeFiber from "./ThreeFiber";

const Hero = () => {
     return (
          <div className="relative mx-auto mt-10 flex max-w-6xl select-none flex-col  items-center p-10 pb-5 text-center md:pt-20">
               <h1 className="z-30 text-2xl font-semibold uppercase tracking-widest">
                    Brody McFarland
               </h1>
               <h2 className="uppercase tracking-wider text-gray-500 md:pb-10">
                    Software Developer
               </h2>
               {/* Desktop Only Animated Colored Circles */}
               <motion.div
                    initial={{ y: -400, x: -400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-24 right-[50%] z-0 hidden h-40 w-40 animate-pulse-slow bg-stone-900 mix-blend-screen blur-3xl md:top-48 md:block"
               />
               <motion.div
                    initial={{ y: -400, x: 400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-24 left-[50%] z-0 hidden h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-48 md:block"
               />
               <motion.div
                    initial={{ y: 400, x: -400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-56 right-[50%] z-0 hidden h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-80 md:block"
               />
               <motion.div
                    initial={{ y: 400, x: 400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-56 left-[50%] z-0 hidden h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-80 md:block"
               />
               {/* Mobile & Tablet Colored Circles */}

               <motion.div
                    initial={{ y: -200, x: -150 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-24 right-[50%] z-0 h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-48"
               />
               <motion.div
                    initial={{ y: -200, x: 150 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-24 left-[50%] z-0 h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-48"
               />
               <motion.div
                    initial={{ y: 200, x: -150 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-56 right-[50%] z-0 h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-80"
               />
               <motion.div
                    initial={{ y: 200, x: 150 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-56 left-[50%] z-0 h-40 w-40 animate-pulse-slow bg-gray-900 mix-blend-screen blur-3xl md:top-80"
               />
               {/* Animated Image */}
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="z-20 my-7 h-52 w-52 rounded-full bg-transparent md:h-64 md:w-64"
               >
                    <Image
                         src="/MeteorPic.png"
                         className="h-full w-full rounded-full object-cover opacity-70 shadow-md duration-1000 hover:-hue-rotate-180"
                         width={1000}
                         height={1000}
                         alt="Hero Image"
                         priority={true}
                    />
               </motion.div>
               <ThreeFiber />
               <p className="md:text-md z-30 text-sm tracking-wider text-gray-400 md:pt-16">
                    Building modern web experiences and applications with modern
                    tools.
               </p>
          </div>
     );
};

export default Hero;
