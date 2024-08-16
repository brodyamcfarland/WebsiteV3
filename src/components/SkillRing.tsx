import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
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

const SkillRing = ({ selectedSkill, setSelectedSkill }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const images = container?.querySelectorAll("img, a");

    const radius = container?.clientWidth ? container.clientWidth / 3 : 0;
    const totalImages = images?.length || 0;

    if (images && totalImages > 0) {
      images.forEach((img, i) => {
        const angle = (i / totalImages) * 330;
        const imageElement = img as HTMLImageElement; // Cast img to HTMLImageElement
        imageElement.style.position = "absolute";
        imageElement.style.left = "50%";
        imageElement.style.top = "50%";
        imageElement.style.transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
        imageElement.style.transformOrigin = "0 0";
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-[60.5%] left-[45%] z-[9999] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full md:left-[43%] md:top-[55.5%] md:h-[600px] md:w-[600px]"
    >
      <div className="flex items-center justify-center">
        {skillImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            width={50}
            height={50}
            alt={image.alt}
            className={`heroSkillImages ${
              image.src === selectedSkill?.src &&
              "animate-pulse-slow border-white shadow-[0_0_15px_5px_rgba(255,255,255,0.6)]"
            }`}
            title={image.title}
            onClick={() => setSelectedSkill(image)}
          />
        ))}
        <ThreeFiber />
      </div>
    </div>
  );
};

export default SkillRing;
