import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";

const projectData = [
  {
    title: "Starscript",
    description:
      "Social Media website for screenwriters, actors, musicians, and collaborators. Available on ios and Android. Contains a post feed, reel system, real time messenger, commenting, Google OAuth, Video/Image Compression, and much more.",
    imageSrc: "/starscript.png",
    codeLink: "Not Available",
    stack: [
      "NextJS",
      "React Native",
      "Express",
      "Mongo DB",
      "JS",
      "socket.io",
      "Redux",
      "Vanilla CSS",
      "FFMPEG",
      "sharp",
    ],
    demoLink: "https://www.starscript.com/",
  },
  {
    title: "Breathe Ops",
    description:
      "Subscription-based Medical Office Software Suite and Online Directory. Allows you to log daily activity with automatic finance calculations and generate leads and referrals for your practice. Contains a custom map directory, and exportable financial dashboard.",
    stack: [
      "NextJS",
      "React Native",
      "Express",
      "Mongo DB",
      "JS",
      "Redux",
      "Vanilla CSS",
    ],
    imageSrc: "/breathe-ops.png",
    codeLink: "Not Available",
    demoLink: "https://www.breatheops.com/",
  },
  {
    title: "3-D Portfolio",
    description:
      "3-D version of portfolio. Shoot the ball at objects by clicking on the ball to interact with the next room.",
    imageSrc: "/threefiber.png",
    stack: [
      "NextJS",
      "Tailwind",
      "React Three Fiber",
      "Typescript",
      "Three.js",
      "CannonJS",
    ],
    codeLink: "https://github.com/brodyamcfarland/3D-Website",
    demoLink: "https://3d-website-indol.vercel.app/",
  },
  {
    title: "GET",
    description:
      "E-Commerce Website, pretty much an amazon clone that uses only local storage instead of a database.",
    imageSrc: "/GET.PNG",
    stack: ["NextJS", "Tailwind", "Typescript", "Redux", "Firebase"],
    codeLink: "https://github.com/brodyamcfarland/shopping-web-app",
    demoLink: "https://shopping-sepia-seven.vercel.app/",
  },
  {
    title: "Coin Camp",
    description:
      "Web3 Crowdfunding Website built on top of the Polygon Mumbai test network.",
    imageSrc: "/CoinCamp.PNG",
    stack: ["NextJS", "Typescript", "Tailwind", "Thirdweb"],
    codeLink: "https://github.com/brodyamcfarland/CoinCamp",
    demoLink: "https://coin-camp-jade.vercel.app/",
  },
  {
    title: "Siphon",
    description:
      "HTML to JSON web scraping tool for easy text extraction. Built with NextJS, Cheerio, Typescript, and Tailwind.",
    imageSrc: "/Siphon.png",
    stack: ["NextJS", "Tailwind", "Cheerio", "Typescript"],
    codeLink: "https://github.com/brodyamcfarland/Siphon",
    demoLink: "https://siphon-chi.vercel.app/",
  },
  {
    title: "Shipped",
    description:
      "Online Shopping website built with NextJS, Typescript, Tailwind, Fakestore API, Next Auth, Stripe, React Redux, and Firebase.",
    imageSrc: "/Shipped.PNG",
    stack: [
      "NextJS",
      "Typescript",
      "Tailwind",
      "Fakestore API",
      "Next Auth",
      "Stripe",
      "React Redux",
      "Firebase",
    ],
    codeLink: "https://github.com/brodyamcfarland/shipped",
    demoLink: "https://shipped.vercel.app/",
  },
  {
    title: "Connected",
    description:
      "Web3 Social Media Website. In order to login, you must mint a non-transferable NFT via the instructions. This new coin will now replace your login credentials, when the token is detected, you will be logged in.",
    stack: [
      "React",
      "Typescript",
      "Tailwind",
      "Ethers JS",
      "Solidity",
      "Firebase",
    ],
    imageSrc: "/Soulbound.PNG",
    codeLink: "https://github.com/brodyamcfarland/c0nn3ct3d",
    demoLink: "https://brodyamcfarland.github.io/c0nn3ct3d/",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (containerRef.current) {
      const cardHeight = (containerRef.current.firstChild as HTMLElement)
        ?.clientHeight;
      if (cardHeight) {
        containerRef.current.scrollBy({
          top: cardHeight / 2,
          behavior: "smooth",
        });
      }
    }
  };

  // Scroll up by one card's height
  const scrollUp = () => {
    if (containerRef.current) {
      const cardHeight = (containerRef.current.firstChild as HTMLElement)
        ?.clientHeight;
      if (cardHeight) {
        containerRef.current.scrollBy({
          top: -cardHeight,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative">
      <h1 className="z-30 select-none pb-5 text-center text-xl uppercase tracking-widest">
        PROJECTS
      </h1>
      {/* UP and DOWN Arrows */}
      <div className="absolute top-[33px] right-[10.5px] z-[999] cursor-pointer rounded-full border-[2px] border-[#FFFFFF60] opacity-75 duration-500 hover:opacity-100 md:top-[582px] md:right-[720.5px]">
        <BsArrowDownCircleFill
          color="#FFFFFF60"
          size={40}
          onClick={scrollDown}
        />
      </div>
      <div className="absolute top-[32px] right-[297px] z-[999] cursor-pointer rounded-full border-[2px] border-[#FFFFFF60] opacity-75 duration-500 hover:opacity-100 md:top-[32px] md:right-[720.5px]">
        <BsArrowUpCircleFill color="#FFFFFF60" size={40} onClick={scrollUp} />
      </div>
      <div
        ref={containerRef}
        className="scroll-behavior-smooth relative mb-12 mt-2 flex h-[60vh] w-auto max-w-sm flex-col items-center gap-5 overflow-hidden rounded-md bg-transparent pb-5 text-center shadow-inner md:mx-auto md:mb-0 md:max-w-3xl md:border md:border-[#FFFFFF20] md:bg-[#FFFFFF10] md:px-10 md:scrollbar-thin md:scrollbar-none md:scrollbar-track-white/10 md:scrollbar-thumb-white/50"
      >
        {projectData.map((project, index) => (
          <div
            key={index}
            className=" flex h-auto w-[350px] flex-col rounded-md border border-gray-600/50 bg-[#111111] md:h-[300px] md:w-auto md:flex-row"
          >
            <Image
              src={project.imageSrc}
              className="h-[200px] rounded-bl-md rounded-tl-md border-r border-gray-500/50 bg-black object-contain md:h-full md:w-full md:max-w-[250px] md:object-cover"
              width={10000}
              height={10000}
              alt={`Project ${project.title} Image`}
              priority={true}
            />
            <div className="flex w-full flex-col p-4">
              <h3 className="pt-2 pl-4 text-left tracking-widest">
                {project.title}
              </h3>
              <p className=" px-3 pt-2 pb-4 text-left text-xs text-gray-400">
                {project.description}
              </p>
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2">
                {project.stack.map((item) => (
                  <span className="rounded-full border border-[#FFFFFF50] bg-orange-700/30 px-2 py-1 text-xs">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex-1" />
              <div className="flex items-center justify-center gap-20 px-5 pb-2 pt-5">
                {project.codeLink === "Not Available" ? (
                  <span className="cursor-not-allowed rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm text-gray-500  duration-300">
                    Private Codebase
                  </span>
                ) : (
                  <Link
                    href={project.codeLink}
                    target="_blank"
                    className="rounded-lg border border-gray-600/50 bg-black px-4 py-2 text-sm duration-300 hover:bg-black/10"
                  >
                    Code
                  </Link>
                )}
                <Link
                  href={project.demoLink}
                  target="_blank"
                  className="rounded-lg border border-gray-600/50 bg-gray-700 px-4 py-2 text-sm duration-300 hover:bg-gray-500"
                >
                  {project.codeLink === "Not Available" ? "Link" : "Demo"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
