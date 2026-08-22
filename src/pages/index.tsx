import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import StarryBackground from "../components/StarryBackground";

const DESCRIPTION =
  "Brody McFarland — full-stack web developer in Thousand Oaks, CA building products with Next.js, React Native, and Three.js.";

const Home: NextPage = () => {
  // Only animate the starfield while the hero is on screen (saves battery on phones)
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grain relative min-h-dvh w-full bg-ink font-main text-white">
      <Head>
        <title>Brody McFarland</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="description" content={DESCRIPTION} />
        <meta name="theme-color" content="#070708" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brody McFarland — Full-Stack Web Developer" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brody McFarland — Full-Stack Web Developer" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="/og.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed starfield background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas
          style={{ background: "#070708" }}
          frameloop={heroVisible ? "always" : "never"}
          dpr={[1, 1.5]}
        >
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
