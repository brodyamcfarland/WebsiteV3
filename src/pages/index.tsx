import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Hero from "../components/Hero";
import ImageCarousel from "../components/SkillRing";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { Canvas } from "@react-three/fiber";
import StarryBackground from "../components/StarryBackground";
import SkillRing from "../components/SkillRing";

const Home: NextPage = () => {
  return (
    <div className="relative flex h-screen w-screen max-w-[100vw] flex-col overflow-y-scroll scroll-smooth bg-black font-main text-white  overflow-x-hidden scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/50 md:snap-y md:snap-mandatory">
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
          width: "100vw", // Ensure the width is set to 100vw
          maxWidth: "100vw",
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
          className="flex h-screen shrink-0 flex-col items-center justify-center overflow-hidden md:snap-start"
        >
          <Hero />
        </section>
        <section
          id="projects"
          className="flex h-screen shrink-0 flex-col items-center justify-center overflow-hidden md:snap-center"
        >
          <Projects />
        </section>
        <section
          id="contact"
          className="flex h-screen shrink-0 flex-col items-center justify-center overflow-hidden md:snap-center"
        >
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Home;
