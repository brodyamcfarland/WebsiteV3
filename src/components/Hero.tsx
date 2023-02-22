import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
     return (
          <div className="relative mx-auto mt-10 flex max-w-6xl flex-col items-center  p-10 pb-5 text-center md:pt-20">
               <h1 className="z-30 text-2xl font-semibold uppercase tracking-widest">
                    Brody McFarland
               </h1>
               <h2 className="uppercase tracking-wider text-gray-500 md:pb-10">
                    Software Developer
               </h2>
               <motion.div
                    initial={{ y: -400, x: -400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-24 right-[50%] z-0 h-40 w-40 animate-pulse-slow bg-yellow-900 mix-blend-screen blur-3xl md:top-48"
               />
               <motion.div
                    initial={{ y: -400, x: 400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-24 left-[50%] z-0 h-40 w-40 animate-pulse-slow bg-red-900 mix-blend-screen blur-3xl md:top-48"
               />
               <motion.div
                    initial={{ y: 400, x: -400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-56 right-[50%] z-0 h-40 w-40 animate-pulse-slow bg-blue-900 mix-blend-screen blur-3xl md:top-80"
               />
               <motion.div
                    initial={{ y: 400, x: 400 }}
                    whileInView={{ y: 0, x: 0 }}
                    transition={{
                         duration: 1.2,
                    }}
                    className="absolute top-56 left-[50%] z-0 h-40 w-40 animate-pulse-slow bg-purple-900 mix-blend-screen blur-3xl md:top-80"
               />
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="z-20 my-7 h-52 w-52 rounded-full bg-transparent md:h-64 md:w-64"
               >
                    <Image
                         src="/MeteorPic.png"
                         className="h-full w-full rounded-full object-cover opacity-80 shadow-md duration-1000 hover:-hue-rotate-180"
                         width={1000}
                         height={1000}
                         alt="Hero Image"
                         priority={true}
                    />
               </motion.div>

               <p className="md:text-md z-30 text-sm tracking-wider text-gray-400 md:pt-20">
                    Building modern web experiences and applications with modern
                    tools.
               </p>
          </div>
     );
};

export default Hero;
