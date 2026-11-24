import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BsArrowUpRight, BsGithub, BsLock, BsX } from "react-icons/bs";
import CommitChart from "./CommitChart";
import { getCommits } from "../lib/commits";
import { track } from "../lib/track";

export type ModalProject = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  stack: string[];
  codeLink: string;
  demoLink: string;
  team?: boolean;
};

/**
 * Full project view. The screenshot shares a `view-transition-name` with the
 * card it was opened from, so the browser morphs one into the other
 * (see openProject in Projects.tsx). Full-screen sheet on phones.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: ModalProject;
  onClose: () => void;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const stats = getCommits(project.slug);
  const isPrivate = project.codeLink === "Not Available";

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-90 flex items-end justify-center md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="project-backdrop absolute inset-0 bg-ink/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="project-sheet relative flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-panel md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-2xl md:border md:border-white/10 md:shadow-glow">
        <div
          className="relative aspect-video w-full shrink-0 overflow-hidden bg-black md:rounded-t-2xl"
          style={{ viewTransitionName: "project-hero" }}
        >
          <Image
            src={project.imageSrc}
            alt={`${project.title} screenshot`}
            width={1600}
            height={1000}
            className="h-full w-full object-cover object-top"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-panel to-transparent to-35%" />
        </div>

        <button
          ref={closeBtn}
          onClick={onClose}
          aria-label="Close project"
          className="icon-btn absolute right-4 top-4 z-10 bg-ink/70 backdrop-blur"
        >
          <BsX size={22} />
        </button>

        <div className="project-detail flex flex-col gap-5 p-5 pb-10 md:p-8">
          <div>
            <h3
              id="project-modal-title"
              className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
              style={{ viewTransitionName: "project-title" }}
            >
              {project.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base">
              {project.description}
            </p>
          </div>

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-white/10 bg-white/4 px-2 py-0.5 text-xs font-medium tracking-wide text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>

          {stats && stats.mine > 0 && (
            <CommitChart stats={stats} team={Boolean(project.team)} />
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={project.demoLink}
              target="_blank"
              onClick={() => track("project_link", { project: project.slug, kind: "demo" })}
              className="btn-primary"
            >
              {isPrivate ? "Visit site" : "Live demo"}
              <BsArrowUpRight size={14} />
            </Link>
            {isPrivate ? (
              <span className="btn-ghost cursor-not-allowed opacity-60" title="Private codebase">
                <BsLock size={13} />
                Private
              </span>
            ) : (
              <Link
                href={project.codeLink}
                target="_blank"
                onClick={() => track("project_link", { project: project.slug, kind: "code" })}
                className="btn-ghost"
              >
                <BsGithub size={15} />
                Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
