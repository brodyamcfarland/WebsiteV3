import Link from "next/link";
import Router from "next/router";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { BsArrowUpRight, BsArrowsAngleExpand, BsGithub, BsLock } from "react-icons/bs";
import CommitChart from "./CommitChart";
import LiquidImage from "./LiquidImage";
import ProjectModal from "./ProjectModal";
import { getCommits } from "../lib/commits";
import { track, useTrackView } from "../lib/track";

const projectData = [
  {
    slug: "starscript",
    title: "Starscript",
    description:
      "A social network for screenwriters, actors, and musicians to find collaborators, on web, iOS, and Android. I built the whole stack: post feed and reels, real-time messaging, comments, Google sign-in, and server-side video/image compression.",
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
    team: true,
  },
  {
    slug: "breathe-ops",
    title: "Breathe Ops",
    description:
      "Subscription software for medical practices: log daily activity with automatic financial calculations, track leads and referrals, and get found through a map-based public directory. Includes an exportable finance dashboard.",
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
    team: true,
  },
  {
    slug: "bitboard",
    title: "Bitboard",
    description:
      "A free browser skateboarding and snowboarding game on procedurally generated maps, in low-res 3D pixel art. Custom skate physics, stick-flick trick recognition, grinds on any edge, day/night and weather, with a desktop build headed to Steam.",
    imageSrc: "/bitboard.png",
    stack: [
      "Three.js",
      "Typescript",
      "Vite",
      "Cloudflare Workers",
      "Stripe",
      "Vitest",
    ],
    codeLink: "Not Available",
    demoLink: "https://bitboard.world/",
    featured: true,
  },
  {
    slug: "bigger",
    title: "Bigger.sol",
    description:
      "PvP extraction game: grow, hunt, and get out alive. The live demo runs bot matches in the browser; the full build adds an authoritative WebSocket game server with region matchmaking and a Solana escrow program in Rust/Anchor. Devnet and demo credits only.",
    imageSrc: "/bigger.png",
    stack: [
      "NextJS",
      "Typescript",
      "WebSockets",
      "Solana",
      "Rust / Anchor",
      "Redis",
      "Docker",
    ],
    codeLink: "Not Available",
    demoLink: "https://bigger-sol.vercel.app/",
    featured: true,
  },
  {
    slug: "3d-portfolio",
    title: "3-D Portfolio",
    description:
      "An interactive 3-D take on this portfolio. Fire a physics-driven ball at objects to unlock each room and explore the work inside.",
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
    demoLink: "https://3d.brodymcfarland.com/",
    featured: true,
  },
];

type Project = (typeof projectData)[number];

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
}) => {
  const isPrivate = project.codeLink === "Not Available";
  const featured = Boolean(project.featured);
  const stats = getCommits(project.slug);
  // Counts as "looked at" after ~1s at least half on screen (see lib/track.ts)
  const ref = useTrackView<HTMLElement>("project_view", {
    project: project.slug,
  });

  return (
    <motion.article
      ref={ref}
      id={`project-${project.slug}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      className={`glass group relative flex flex-col overflow-hidden transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* Image */}
      <div
        data-liquid-host
        className={`relative overflow-hidden bg-black ${
          featured
            ? "h-56 md:h-auto md:w-[45%] md:shrink-0"
            : "h-48 sm:h-52"
        }`}
      >
        <div data-vt-media className="absolute inset-0">
          <LiquidImage
            src={project.imageSrc}
            alt={`${project.title} screenshot`}
            priority={index < 2}
            className="opacity-90 transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
        {/* Fade into the card body */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            featured
              ? "bg-linear-to-t from-panel via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-panel/90"
              : "bg-linear-to-t from-panel via-transparent to-transparent"
          }`}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink/80 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.25em] text-gray-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Whole screenshot opens the detail view */}
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-label={`Open ${project.title} details`}
          className="absolute inset-0 z-10"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3
          data-vt-title
          className="font-display text-xl font-bold tracking-tight text-white md:text-2xl"
        >
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

        {stats && stats.mine > 0 && (
          <CommitChart stats={stats} team={Boolean(project.team)} />
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
          <Link
            href={project.demoLink}
            target="_blank"
            onClick={() =>
              track("project_link", { project: project.slug, kind: "demo" })
            }
            className="btn-primary"
          >
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
            <Link
              href={project.codeLink}
              target="_blank"
              onClick={() =>
                track("project_link", { project: project.slug, kind: "code" })
              }
              className="btn-ghost"
            >
              <BsGithub size={15} />
              Code
            </Link>
          )}
          <button
            type="button"
            onClick={() => onOpen(project.slug)}
            className="btn-ghost"
          >
            <BsArrowsAngleExpand size={12} />
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
};

/** Tag (or untag) a card's screenshot + title as the shared transition elements. */
function nameCard(slug: string, on: boolean) {
  const card = document.getElementById(`project-${slug}`);
  const media = card?.querySelector<HTMLElement>("[data-vt-media]");
  const title = card?.querySelector<HTMLElement>("[data-vt-title]");
  if (media) media.style.viewTransitionName = on ? "project-hero" : "";
  if (title) title.style.viewTransitionName = on ? "project-title" : "";
}

/** Run a DOM update as a view transition when supported and motion is ok. */
function withTransition(before: () => void, update: () => void, after: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof document.startViewTransition !== "function" || reduce) {
    update();
    after();
    return;
  }
  before();
  const vt = document.startViewTransition(() => flushSync(update));
  vt.finished.finally(after);
}

const Projects = () => {
  const [open, setOpen] = useState<string | null>(null);
  const openRef = useRef<string | null>(null);
  const pushed = useRef(false);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const close = useCallback(() => {
    const slug = openRef.current;
    if (!slug) return;
    openRef.current = null;
    withTransition(
      () => nameCard(slug, false),
      () => {
        setOpen(null);
        nameCard(slug, true);
      },
      () => nameCard(slug, false),
    );
  }, []);

  const openProject = (slug: string) => {
    if (openRef.current) return;
    openRef.current = slug;
    track("project_open", { project: slug });
    withTransition(
      () => nameCard(slug, true),
      () => {
        nameCard(slug, false);
        setOpen(slug);
      },
      () => {},
    );
    // A history entry so the phone back button / swipe closes the sheet
    window.history.pushState({ ...window.history.state, projectModal: slug }, "");
    pushed.current = true;
  };

  // The close button steps back through that entry; Back itself closes the modal
  const requestClose = useCallback(() => {
    if (pushed.current) window.history.back();
    else close();
  }, [close]);

  useEffect(() => {
    // Next's router only consults beforePopState for entries it created, so
    // also listen directly; close() is a no-op once the modal is shut.
    const onPop = () => {
      pushed.current = false;
      close();
    };
    Router.beforePopState(() => {
      if (!openRef.current) return true;
      onPop();
      return false; // don't let Next re-route the page
    });
    window.addEventListener("popstate", onPop);
    return () => {
      Router.beforePopState(() => true);
      window.removeEventListener("popstate", onPop);
    };
  }, [close]);

  const active = projectData.find((p) => p.slug === open);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-24 xl:px-6">
      <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">01 — Selected work</p>
          <h2 className="section-title mt-3">Projects</h2>
        </div>
        <p className="max-w-sm text-sm text-gray-500">
          Two production apps I build with a small team, two games I built
          solo this year, and a 3-D version of this site.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {projectData.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onOpen={openProject}
          />
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={requestClose} />}
    </div>
  );
};

export default Projects;
