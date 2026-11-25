import Image from "next/image";
import { motion } from "motion/react";
import SkillRing from "./SkillRing";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsArrowDown, BsDownload } from "react-icons/bs";
import SocialLinks from "./SocialLinks";
import { track } from "../lib/track";

// WebGL particle version of the portrait; client-only
const ParticlePortrait = dynamic(() => import("./ParticlePortrait"), { ssr: false });

/** WebGL available and the visitor hasn't asked for reduced motion. */
function useFancyPortrait() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const c = document.createElement("canvas");
      if (c.getContext("webgl2") || c.getContext("webgl")) setOk(true);
    } catch {
      /* static image fallback */
    }
  }, []);
  return ok;
}

type Skill = {
  src: string | null;
  title: string | null;
  alt: string | null;
};

const Hero = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const fancy = useFancyPortrait();
  const [particlesReady, setParticlesReady] = useState(false);
  return (
    <div className="short:grid short:grid-cols-[auto_minmax(0,1fr)] short:items-center short:gap-x-12 short:text-left relative mx-auto flex w-full max-w-6xl select-none flex-col items-center px-6 text-center">

      {/* Name + title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="short:col-start-2 short:row-start-1 short:mb-0 short:self-end relative z-30 mb-2 md:mb-0"
      >
        <h1 className="font-montserrat short:text-2xl text-2xl font-semibold tracking-widest text-white uppercase md:text-4xl 2xl:text-5xl">
          Brody McFarland
        </h1>
        <h2 className="font-montserrat short:pb-2 mt-2 pb-4 text-xs tracking-wider text-gray-400 uppercase md:pb-6 md:text-sm">
          Full-Stack Web Developer
        </h2>
      </motion.div>

      {/* Ring + portrait */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="short:col-start-1 short:row-span-2 short:row-start-1 short:mx-10 short:my-0 short:size-52 relative z-20 my-10 flex size-[min(calc((100vw-44px)/1.32),24rem,max(10rem,calc(100svh-397px)))] items-center justify-center rounded-full md:my-12 md:size-96 2xl:my-16 2xl:size-[30rem]"
      >
        <SkillRing
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />
        <Image
          src="/heroimage.png"
          // Dragging on the face plays with the particles instead of scrolling
          draggable={false}
          className={`relative z-10 h-full w-full touch-none rounded-full object-cover transition-opacity duration-1000 [-webkit-touch-callout:none] ${
            particlesReady ? "opacity-0" : "opacity-80"
          }`}
          width={1000}
          height={1000}
          alt="Portrait of Brody McFarland"
          priority={true}
        />
        {fancy && <ParticlePortrait onReady={() => setParticlesReady(true)} />}
      </motion.div>

      {/* Hint + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="short:col-start-2 short:row-start-2 short:mt-3 short:items-start short:gap-3 short:self-start relative z-30 mt-6 flex flex-col items-center gap-4 md:mt-14"
      >
        <SocialLinks />
        <p className="max-w-md text-sm leading-relaxed text-gray-400">
          I build and ship full-stack products — from production social and
          medical-office apps to 3-D experiments. Currently open to new roles.
        </p>
        <div className="short:justify-start flex flex-wrap items-center justify-center gap-3">
          <Link href="#projects" className="btn-primary group">
            See my work
            <BsArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
          <a
            href="/BrodyMcFarland-Resume.pdf"
            download
            target="_blank"
            onClick={() => track("resume_download")}
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <BsDownload size={14} />
            Resume
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
