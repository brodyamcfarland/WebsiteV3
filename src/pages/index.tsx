import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { Canvas } from "@react-three/fiber";
import StarryBackground from "../components/StarryBackground";

const Home: NextPage = () => {
  return (
    <div className="grain relative min-h-dvh w-full bg-ink font-main text-white">
      <Head>
        <title>Brody McFarland</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Brody McFarland — web developer building full-stack products with Next.js, React Native, and Three.js."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed starfield background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas style={{ background: "#070708" }}>
          <StarryBackground />
        </Canvas>
        {/* Vignette + warm glow so content sits on a soft ground */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,163,58,0.08),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.8),transparent_60%)]" />
      </div>


      <main className="relative z-10 flex flex-col items-center">
        <section
          id="home"
          className="flex min-h-dvh w-full scroll-mt-0 flex-col items-center justify-center overflow-hidden pt-12 pb-10 md:pt-0 md:pb-0"
        >
          <Hero />
        </section>
        <section
          id="projects"
          className="w-full scroll-mt-16 py-20 md:py-28"
        >
          <Projects />
        </section>
        <section
          id="contact"
          className="w-full scroll-mt-16 py-20 md:py-28"
        >
          <Contact />
        </section>
        <footer className="w-full border-t border-white/5 py-8 text-center text-xs tracking-widest text-gray-600 md:pb-8">
          © {new Date().getFullYear()} BRODY MCFARLAND
        </footer>
      </main>
    </div>
  );
};

export default Home;
