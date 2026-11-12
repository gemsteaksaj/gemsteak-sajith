// ============================================================
// THE VAULT: projects, achievements and guilds.
// They are rendered by the tabbed container in components/Archives.astro.
//
// HOW TO ADD SOMETHING LATER
//   1. Append an object to `projects`, `achievements` or `guilds` below.
//   2. Save. The tab counter, the cards and the "locked" filler slots update on their own.
//   (Empty space is padded with locked "???" slots up to a full row, so the grid never looks half-built.)
// ============================================================

import type { SkillBranch } from "./cv";

export type Gem = SkillBranch["gem"];
/** Medal colour for achievement / guild badges. Defaults to "gold". */
export type Tier = "gold" | "silver" | "bronze" | "ruby" | "cyan" | "amethyst";

export type Project = {
  title: string;
  /** One or two sentences: what it is and what you did. */
  blurb: string;
  year?: string;
  /** Free text, e.g. "Released", "In Development", "Prototype", "Game Jam". */
  status?: string;
  tags?: string[];
  /** Screenshot path under /public, e.g. "/projects/flare-quills.png" (put the file in public/projects/). */
  image?: string;
  imageAlt?: string;
  /** Buttons at the bottom of the card, e.g. Play / Source / Trailer. */
  links?: { label: string; href: string }[];
};

export type Achievement = {
  title: string;
  detail?: string;
  year?: string;
  /** An emoji shown on the medal. */
  icon: string;
  tier?: Tier;
};

export type Guild = {
  /** Club, community or organisation. */
  name: string;
  /** Your rank in it: "Member", "Lead", "Organiser"... */
  role: string;
  detail?: string;
  /** e.g. "2023 – Present" */
  period?: string;
  /** An emoji shown on the crest. */
  icon: string;
  tier?: Tier;
  /** Optional link to the guild's site. */
  href?: string;
};

export const vault = {
  heading: "THE ARCHIVES",
  kicker: "Chapter III · The Vault",
  lockedMessage: "Archives currently locked. New levels loading soon...",
  /** Cards per row on desktop; locked filler slots round each tab up to a multiple of this. */
  rowSize: 3,
};

// ------------------------------------------------------------ PROJECTS (Level Select)
export const projects: Project[] = [
  {
    title: "Sajax Karlson: The Reckless Knight's Inquiries",
    blurb:
      "An offline-first Flutter app for Android and iOS for reading philosophy and reflecting, built around an original comic. It includes native Kotlin services (a reflection card on unlock during set hours, home-screen widgets), a crossfading audio engine, a dream journal with scheduled prompts, and automated WCAG accessibility tests across every screen.",
    year: "2026",
    status: "Personal Project",
    tags: ["Flutter", "Dart", "Riverpod", "Kotlin", "Platform Channels", "just_audio", "Python"],
  },
  {
    title: "Sheepsomaniac",
    blurb:
      "A 2D top-down mobile action game I designed and built solo in Unity 6 with URP 2D. Players cast moves by drawing runes on the touchscreen, recognised on-device by a small neural network I wrote from scratch in C#. Moves chain into combos of sheep, elements, modifiers and shot patterns, feeding a combat system with 157 element mixes, 127 enemy types, procedurally generated islands and online multiplayer over Unity Relay.",
    // Change to "Released" (and add a Play Store / gameplay video link below) once it's out.
    status: "In Development",
    tags: ["Unity 6", "C#", "URP 2D", "Netcode for GameObjects", "Unity Relay", "Neural Networks", "Procedural Generation"],
  },
  {
    title: "Bot Maker",
    blurb:
      "A basic Streamlit app for creating RAG conversational bots. Behind a login, users build a chatbot that answers from their own PDFs or web pages: the text is embedded with sentence-transformers into a FAISS index and passed to a Hugging Face model through LangChain. The app also includes sample document and website bots, plus a page to download the generated bot code.",
    year: "2023",
    status: "Personal Project",
    tags: ["Python", "Streamlit", "LangChain", "RAG", "FAISS", "Hugging Face", "sentence-transformers"],
    links: [{ label: "Source", href: "https://github.com/sajith007423/bot_maker" }],
  },
  {
    title: "HireHive",
    blurb:
      "A miniature LinkedIn-style jobs platform built with Django. Users sign up as a company or a candidate. Companies post job openings, courses and interview calls with images and links, and candidates keep a profile with their skills, qualifications, achievements and social links while browsing the listings.",
    year: "2025",
    status: "Personal Project",
    tags: ["Python", "Django", "SQLite", "Bootstrap", "HTML"],
    links: [{ label: "Source", href: "https://github.com/sajith007423/hirehive" }],
  },
  // Template: copy, uncomment and fill in.
  // {
  //   title: "The Quill Archives",
  //   blurb: "One-line pitch of the game or tool, then what you built.",
  //   year: "2026",
  //   status: "In Development",
  //   tags: ["Unity", "C#", "Procedural Generation"],
  //   image: "/projects/quill-archives.png",
  //   imageAlt: "Gameplay screenshot of The Quill Archives",
  //   links: [
  //     { label: "Play", href: "https://..." },
  //     { label: "Source", href: "https://github.com/..." },
  //   ],
  // },
];

// ------------------------------------------------------------ ACHIEVEMENTS (Trophy Room)
export const achievements: Achievement[] = [
  {
    icon: "🏆",
    tier: "gold",
    title: "1st Prize Winner",
    detail: "State Scratch Programming Competition at Shastrolsavam",
    year: "2020",
  },
  // { icon: "🥈", tier: "silver", title: "Runner-up", detail: "Some Game Jam", year: "2026" },
];

// ------------------------------------------------------------ GUILDS (Badge Board)
export const guilds: Guild[] = [
  {
    icon: "🤖",
    tier: "cyan",
    name: "CROB TKMCE (Robotics Club)",
    role: "Execom",
    detail: "Organizing events including the TKMCE Kerala Robocon '26.",
  },
  // { icon: "🎮", tier: "ruby", name: "Some Game Dev Community", role: "Member", period: "2025 – Present", href: "https://..." },
];
