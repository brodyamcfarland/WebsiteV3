import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { Canvas } from "@react-three/fiber";
import StarryBackground from "../components/StarryBackground";

const Home: NextPage = () => {
     return (
          <>
               <div className="relative flex h-[100vh] snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth bg-black font-main text-white overflow-x-hidden scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50">
                    <Head>
                         <title>Brody McFarland</title>
                         <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Canvas
                         style={{
                              position: "absolute",
                              height: "100vh",
                              background: "black",
                              zIndex: "0",
                         }}
                    >
                         <StarryBackground />
                    </Canvas>

                    <Navbar />
                    <SocialLinks />
                    <main className="flex flex-col items-center justify-center pb-20">
                         <Canvas
                              style={{
                                   position: "absolute",
                                   height: "100%",
                                   background: "black",
                                   zIndex: "0",
                              }}
                         >
                              <StarryBackground />
                         </Canvas>
                         <section
                              id="home"
                              className="flex h-screen shrink-0 snap-start flex-col items-center"
                         >
                              <Hero />
                              <ImageCarousel />
                         </section>
                         <section
                              id="projects"
                              className="h-screen shrink-0 snap-center"
                         >
                              <Projects />
                         </section>
                         <section
                              id="contact"
                              className="h-screen shrink-0 snap-center"
                         >
                              <Contact />
                         </section>
                    </main>
               </div>
          </>
     );
};

export default Home;
