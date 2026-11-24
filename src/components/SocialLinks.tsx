import Link from "next/link";
import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { motion } from "motion/react";
import { track } from "../lib/track";

const socials = [
  { href: "https://github.com/brodyamcfarland", title: "Github", Icon: BsGithub },
  {
    href: "https://www.linkedin.com/in/brody-mcfarland-93a91b106/",
    title: "LinkedIn",
    Icon: BsLinkedin,
  },
];

const SocialLinks = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      aria-label="Social links"
      className="flex items-center justify-center gap-3"
    >
      {socials.map(({ href, title, Icon }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          onClick={() => track("social_click", { network: title.toLowerCase() })}
          aria-label={title}
          className="icon-btn size-10"
        >
          <Icon size={18} />
        </Link>
      ))}
    </motion.nav>
  );
};

export default SocialLinks;
