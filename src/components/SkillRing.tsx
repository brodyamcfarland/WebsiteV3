import Image from "next/image";
import { useEffect, useRef } from "react";
import ThreeFiber from "./ThreeFiber";

const skillImages = [
  { src: "/NEXTJS.png", title: "NEXT JS", alt: "NextJS Image" },
  { src: "/REACT.png", title: "REACT JS", alt: "React Image" },
  { src: "/REACTNATIVE.png", title: "REACT NATIVE", alt: "React Native Image" },
  { src: "/TS.png", title: "TYPESCRIPT", alt: "Typescript Image" },
  { src: "/NODE.png", title: "NODE JS", alt: "Node JS Image" },
  { src: "/TAILWIND.png", title: "TAILWIND CSS", alt: "Tailwind CSS Image" },
  { src: "/THREEJS.png", title: "", alt: "THREE JS Image" },
  { src: "/GITLOGO.png", title: "GIT", alt: "GIT Image" },
  { src: "/POSTGRES.png", title: "POSTGRES", alt: "Postgres Image" },
  { src: "/FIREBASE.png", title: "FIREBASE", alt: "Firebase Image" },
  { src: "/SUPABASE.jpg", title: "SUPABASE", alt: "Supabase Image" },
  { src: "/PRISMA.png", title: "PRISMA ORM", alt: "Prisma Image" },
  { src: "/SQLLITELOGO.png", title: "SQL LITE", alt: "SQL Lite Image" },
  { src: "/ethereum-eth-logo.png", title: "ETHEREUM", alt: "ETH Image" },
  { src: "/SOLIDITY.png", title: "SOLIDITY", alt: "Solidity Image" },
  { src: "/ETHERSJS.png", title: "ETHERS JS", alt: "ETHERS.js Image" },
  { src: "/THIRDWEB.jpeg", title: "THIRDWEB SDK", alt: "Thirdweb Image" },
  { src: "/MORALIS.png", title: "MORALIS", alt: "Moralis Image" },
  { src: "/HARDHAT.jpg", title: "HARDHAT", alt: "Hardhat Image" },
];

const SkillRing = () => {
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
            className="heroSkillImages"
            title={image.title}
          />
        ))}
        <ThreeFiber />
      </div>
    </div>
  );
};

export default SkillRing;
