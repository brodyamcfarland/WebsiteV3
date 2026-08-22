import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { BsArrowUpRight, BsGithub, BsLock } from "react-icons/bs";

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
    featured: true,
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
    featured: true,
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

type Project = (typeof projectData)[number];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const isPrivate = project.codeLink === "Not Available";
  const featured = Boolean(project.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      className={`glass group relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-black ${
          featured
            ? "h-56 md:h-auto md:w-[45%] md:shrink-0"
            : "h-48 sm:h-52"
        }`}
      >
        <Image
          src={project.imageSrc}
          className="h-full w-full object-cover object-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          width={1200}
          height={800}
          alt={`${project.title} screenshot`}
          priority={index < 2}
        />
        {/* Fade into the card body */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            featured
              ? "bg-linear-to-t from-panel via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-panel/90"
              : "bg-linear-to-t from-panel via-transparent to-transparent"
          }`}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink/70 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.25em] text-accent backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
        {featured && (
          <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-white/10 bg-white/4 px-2 py-0.5 text-[11px] font-medium tracking-wide text-gray-300 transition-colors duration-300 group-hover:border-accent/30"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
          <Link href={project.demoLink} target="_blank" className="btn-primary">
            {isPrivate ? "Visit site" : "Live demo"}
            <BsArrowUpRight size={14} />
          </Link>
          {isPrivate ? (
            <span
              className="btn-ghost cursor-not-allowed opacity-60"
              title="Private codebase"
            >
              <BsLock size={13} />
              Private
            </span>
          ) : (
            <Link href={project.codeLink} target="_blank" className="btn-ghost">
              <BsGithub size={15} />
              Code
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-24 xl:px-6">
      <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">01 — Selected work</p>
          <h2 className="section-title mt-3">Projects</h2>
        </div>
        <p className="max-w-sm text-sm text-gray-500">
          Production apps, side projects, and a few Web3 experiments. Hover a
          card to peek closer.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {projectData.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
