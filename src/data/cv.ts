// Single source of truth for all CV text. Edit here; the components render from it.
// Projects, achievements and guilds live in ./vault.ts.

export const hero = {
  title: "Sajith KP",
  subtitle: "Game Developer & Software Engineer",
  contacts: [
    { icon: "📍", label: "Malappuram, Kerala, India", href: null },
    { icon: "📞", label: "+91 8075592650", href: "tel:+918075592650" },
    { icon: "✉️", label: "sajith.kp.2002@gmail.com", href: "mailto:sajith.kp.2002@gmail.com" },
    { icon: "📸", label: "Instagram: @gemsteak", href: "https://www.instagram.com/gemsteak/" },
  ],
  cta: "Start Quest (View CV)",
};

export const story = {
  heading: "MY STORY / BIOGRAPHY",
  body:
    "I am a software engineer and game developer with an interdisciplinary approach, blending game architecture, mathematical systems, and AI-native workflows. As the founder of Gemsteak Studios, I take a first-principles approach to software and game design—breaking down complex mechanics, attribute scaling math, and procedural generation before building robust prototypes. I specialize in 2D game development, full-stack desktop/web applications, and leveraging offline, local AI development stacks to build private, self-reliant tools.",
};

/** "Player 1" character card shown beside the story (photo lives in src/assets/sajith.jpg). */
export const player = {
  tag: "P1",
  name: "Sajith KP",
  alt: "Sajith KP in a blue-and-white printed shirt and dark wide-leg jeans, leaning against a glass and timber wall with one hand in their hair.",
  stats: [
    { label: "Class", value: "Game Dev · Software Engineer" },
    { label: "Guild", value: "Gemsteak Studios — Founder" },
    { label: "Realm", value: "Malappuram, Kerala" },
  ],
  ready: "PLAYER 1 READY",
};

export type SkillBranch = {
  name: string;
  icon: string;
  gem: "ruby" | "cyan" | "pink" | "amethyst";
  skills: string[];
};

export const skillTree: SkillBranch[] = [
  {
    name: "Game Development & Architecture",
    icon: "🎮",
    gem: "ruby",
    skills: ["Unity", "C#", "2D Game Architecture", "Procedural Generation", "Mechanics Design", "State Machines"],
  },
  {
    name: "Web & Mobile Engineering",
    icon: "🌐",
    gem: "cyan",
    skills: [
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express",
      "Django REST Framework (DRF)",
    ],
  },
  {
    name: "Desktop App Development",
    icon: "🖥️",
    gem: "amethyst",
    skills: ["Electron.js", "Full offline-first architectures"],
  },
  {
    name: "AI & Machine Learning",
    icon: "🧠",
    gem: "pink",
    skills: [
      "Local LLM inference",
      "CUDA acceleration",
      "PyTorch",
      "Streamlit",
      "GGUF quantized models",
      "LanceDB vector databases",
      "Claude MCP integrations",
      'AI-native "vibe coding" workflows',
    ],
  },
];

export type Job = {
  role: string;
  org: string;
  points: string[];
  /** Buttons under the signpost, e.g. the org's socials or a talk/podcast. */
  links?: { label: string; href: string }[];
};

export const experience: Job[] = [
  {
    role: "Founder & Lead Developer",
    org: "Gemsteak Studios",
    points: [
      "Lead the technical architecture, game mechanics design, and original lore development for indie titles like The Quill Archives / Flare Quills.",
      "Design custom 16-bit/32-bit pixel art and vector graphics for character sprites and environments.",
      "Run the studio's Instagram (\"Steak you worth it, daily dose of creativity\"), sharing game development progress, Flare Quills curiosities, AI exploration, and philosophy and quotes.",
    ],
    links: [{ label: "Instagram", href: "https://www.instagram.com/gemsteak/" }],
  },
  {
    role: "Team Member",
    org: "Produit Academy",
    points: [
      "Worked with Produit Academy, an online tuition platform offering 1:1 classes and academic support for school students.",
      "Appeared on the academy's podcast: \"Why are students losing interest in India's education system?\"",
    ],
    links: [
      { label: "Podcast", href: "https://youtu.be/-nnxExAKWhk" },
      { label: "YouTube", href: "https://www.youtube.com/@produit-academy" },
      { label: "Instagram", href: "https://www.instagram.com/produit.academy/" },
    ],
  },
  {
    role: "Content Creator",
    org: "Qubes.AI",
    points: [
      "Worked with Qubes.AI, an AI startup, creating content for its Instagram.",
      "Made short-form reels explaining AI ideas, such as how loop engineering takes AI automation past one-shot prompts.",
    ],
    links: [
      { label: "Reel", href: "https://www.instagram.com/reel/DbdiOCsJi7N/" },
      { label: "Instagram", href: "https://www.instagram.com/qubes.ai/" },
    ],
  },
];

export const training = [
  { title: "Bachelor of Technology in Computer Science", place: "TKM College of Engineering, Kollam" },
  { title: "Diploma in Computer Science", place: "AKNM Government Polytechnic College, Thirurangadi" },
];

