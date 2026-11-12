// Single source of truth for all CV text. Edit here; the components render from it.
// Projects, achievements and guilds live in ./vault.ts.

export const hero = {
  title: "Sajith KP",
  subtitle: "Polymathic Game Developer & Software Engineer",
  contacts: [
    { icon: "📍", label: "Ernakulam, Kerala, India", href: null },
    { icon: "📞", label: "+91 8075592650", href: "tel:+918075592650" },
    { icon: "✉️", label: "sajith.kp.2002@gmail.com", href: "mailto:sajith.kp.2002@gmail.com" },
    { icon: "📺", label: "YouTube: Gemsteak / stargon_monk", href: "https://www.youtube.com/@Gemsteak" },
  ],
  cta: "Start Quest (View CV)",
};

export const story = {
  heading: "MY STORY / BIOGRAPHY",
  body:
    "I am a software engineer and game developer with an interdisciplinary approach, blending game architecture, mathematical systems, and AI-native workflows. As the founder of Gemsteak Studios, I take a first-principles approach to software and game design—breaking down complex mechanics, attribute scaling math, and procedural generation before building robust prototypes. I specialize in 2D/3D game development, full-stack desktop/web applications, and leveraging offline, local AI development stacks to build private, self-reliant tools.",
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
    skills: ["Unity", "C#", "2D/3D Architecture", "Procedural Generation", "Mechanics Design", "State Machines"],
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
      "OpenCV",
      "Streamlit",
      "GGUF quantized models",
      "LanceDB vector databases",
      "Claude MCP integrations",
      'AI-native "vibe coding" workflows',
    ],
  },
];

export const experience = [
  {
    role: "Founder & Lead Developer",
    org: "Gemsteak Studios",
    points: [
      "Lead the technical architecture, game mechanics design, and original lore development for indie titles like The Quill Archives / Flare Quills.",
      "Design custom 16-bit/32-bit pixel art and vector graphics for character sprites and environments.",
    ],
  },
  {
    role: "Co-Founder & Developer",
    org: "Produit Academy",
    points: [] as string[],
  },
];

export const training = [
  { title: "Bachelor of Technology in Computer Science", place: "TKM College of Engineering, Kollam" },
  { title: "Diploma in Computer Science", place: "AKNM Government Polytechnic College, Thirurangadi" },
];

