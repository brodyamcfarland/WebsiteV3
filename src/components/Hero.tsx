import Image from "next/image";
import { motion } from "motion/react";
import SkillRing from "./SkillRing";
import { useState } from "react";
import { useTypewriter } from "./useTypewriter";
import Link from "next/link";
import { BsArrowDown, BsDownload } from "react-icons/bs";
import SocialLinks from "./SocialLinks";

type Skill = {
  src: string | null;
  title: string | null;
  alt: string | null;
};

const Hero = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const typedSkill = useTypewriter(selectedSkill?.title ?? "", 70);
  return (
    <div className="relative mx-auto flex w-full max-w-6xl select-none flex-col items-center px-6 text-center">
      {/* Ambient glow behind the ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl md:h-[560px] md:w-[560px] md:bg-accent/10"
      />

      {/* Name + title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 mb-4 md:mb-0"
      >
        <p className="mb-3 font-main text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
          Thousand Oaks, CA
        </p>
        <h1 className="font-montserrat text-2xl font-semibold tracking-widest text-white uppercase md:text-4xl">
          Brody McFarland
        </h1>
        <h2 className="font-montserrat mt-2 pb-4 text-xs tracking-wider text-gray-500 uppercase md:pb-6 md:text-sm">
          Full-Stack Web Developer
        </h2>
      </motion.div>

      {/* Ring + portrait */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-20 my-12 flex size-52 items-center justify-center rounded-full md:my-16 md:size-96"
      >
        <div className="absolute inset-0 animate-float rounded-full ring-1 ring-accent/30 ring-offset-8 ring-offset-ink" />
        <SkillRing
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />
        <Image
          src="/heroimage.png"
          className="h-full w-full rounded-full object-cover opacity-80 shadow-[0_0_60px_-10px_rgba(242,163,58,0.35)] duration-1000"
          width={1000}
          height={1000}
          alt="Hero Image"
          priority={true}
        />
      </motion.div>

      {/* Hint + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="relative z-30 mt-6 flex flex-col items-center gap-4 md:mt-10"
      >
        <p
          aria-live="polite"
          className="flex min-h-9 items-center justify-center text-xs leading-normal tracking-widest text-gray-500"
        >
          {selectedSkill ? (
            <span className="text-accent-soft font-display animate-pulse-slow text-lg leading-normal font-bold tracking-[0.2em] md:text-2xl">
              {typedSkill}
            </span>
          ) : (
            "TAP A SKILL TO REVEAL IT"
          )}
        </p>
        <SocialLinks />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="#projects" className="btn-primary group">
            See my work
            <BsArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
          <a
            href="/BrodyMcFarland-Resume.pdf"
            download
            target="_blank"
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
