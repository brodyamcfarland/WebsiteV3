import Image from "next/image";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import ThreeFiber from "./ThreeFiber";

const skillImages = [
  { src: "/NEXTJS.png", title: "Next JS", alt: "NextJS Image" },
  { src: "/REACT.png", title: "React JS", alt: "React Image" },
  { src: "/REACTNATIVE.png", title: "React Native", alt: "React Native Image" },
  { src: "/TS.png", title: "Typescript", alt: "Typescript Image" },
  { src: "/NODE.png", title: "Node JS", alt: "Node JS Image" },
  { src: "/TAILWIND.png", title: "Tailwind CSS", alt: "Tailwind CSS Image" },
  { src: "/THREEJS.png", title: "Three JS", alt: "THREE JS Image" },
  { src: "/GITLOGO.png", title: "GIT", alt: "GIT Image" },
  { src: "/POSTGRES.png", title: "Postgres", alt: "Postgres Image" },
  { src: "/FIREBASE.png", title: "Firebase", alt: "Firebase Image" },
  { src: "/SUPABASE.jpg", title: "Supabase", alt: "Supabase Image" },
  { src: "/MONGODB_LOGO.png", title: "Mongo DB", alt: "Mongo DB Image" },
  { src: "/PRISMA.png", title: "Prisma", alt: "Prisma Image" },
  { src: "/SQLLITELOGO.png", title: "SQL Lite", alt: "SQL Lite Image" },
  { src: "/SOLIDITY.png", title: "Solidity", alt: "Solidity Image" },
  { src: "/ETHERSJS.png", title: "Ethers JS", alt: "ETHERS.js Image" },
  { src: "/THIRDWEB.jpeg", title: "Third Web", alt: "Thirdweb Image" },
  { src: "/HARDHAT.jpg", title: "Hardhat", alt: "Hardhat Image" },
];

type Skill = {
  src: string | null;
  title: string | null;
  alt: string | null;
};
interface Props {
  selectedSkill: Skill | null;
  setSelectedSkill: Dispatch<SetStateAction<Skill | null>>;
}

// Leave a gap on the right-hand side (0°) for the "View in 3-D" button.
const GAP_DEGREES = 40;
const START = GAP_DEGREES / 2;
const SWEEP = 360 - GAP_DEGREES;

/**
 * Feeds the ring-item CSS (see globals.css): --a is the final angle,
 * --i the stagger index. The keyframes spin the item out from the center.
 */
const onRing = (angle: number, index: number) =>
  ({ "--a": `${angle}deg`, "--i": index } as CSSProperties);

const SkillRing = ({ selectedSkill, setSelectedSkill }: Props) => {
  const step = SWEEP / (skillImages.length - 1);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 [--r:138px] md:[--r:236px]"
      aria-label="Skills"
    >
      {skillImages.map((image, i) => {
        const angle = START + i * step;
        const selected = image.src === selectedSkill?.src;
        return (
          <button
            key={image.src}
            type="button"
            title={image.title}
            aria-label={image.title}
            aria-pressed={selected}
            onClick={() => setSelectedSkill(image)}
            style={onRing(angle, i)}
            className="ring-item pointer-events-auto absolute top-1/2 left-1/2 rounded-full"
          >
            <Image
              src={image.src}
              width={50}
              height={50}
              alt={image.alt}
              className={`heroSkillImages ${
                selected
                  ? "animate-skill-tap border-accent opacity-100 shadow-[0_0_18px_4px_rgb(242_163_58/0.45)]"
                  : ""
              }`}
            />
          </button>
        );
      })}

      {/* 3-D link sits in the gap at 0° (right-center) */}
      <div
        style={onRing(0, skillImages.length)}
        className="ring-item pointer-events-auto absolute top-1/2 left-1/2"
      >
        <ThreeFiber />
      </div>
    </div>
  );
};

export default SkillRing;
