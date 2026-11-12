# Software Requirements Specification (SRS) & Build Prompt
**Project:** Gemsteak - Personal Portfolio & Interactive CV Website
**Client/Subject:** Sajith KP (Game Developer & Software Engineer)
**Target AI Builder:** Claude (via Web / Google Stitch MCP integration)

---

## 1. PROJECT OVERVIEW
**Objective:** Build a highly interactive, visually striking single-page portfolio and CV website. 
**Brand Identity:** "Gemsteak" — A whimsical, magical fantasy indie game studio aesthetic. The core motif is a fusion of a steak cut where the "meat" is made of faceted ruby crystals and the "rind" is faceted grey stone. 
**Vibe:** 2D retro/vector indie game (e.g., Kingdom Rush style), vibrant, high-quality, and playful.

## 2. GLOBAL UI/UX & AESTHETIC REQUIREMENTS
*   **Color Palette:**
    *   *Backgrounds:* Twilight gradients, deep magical blues, pastel purples, starry skies.
    *   *Accents/Highlights:* Vibrant ruby reds, neon pinks, glowing cyans (crystal aesthetic).
    *   *Surfaces/Panels:* Cool grey and slate blue stone textures with faceted geometric shading.
*   **UI Elements:** All containers, buttons, and cards must feature **thick, hand-drawn-style black outlines** to mimic cartoon/vector game sprites.
*   **Typography:** Bold, chunky, playful display fonts for Headings (RPG title screen style). Clean, highly legible sans-serif for body text.
*   **Interactivity:** Hover effects should simulate glowing crystals or stone being depressed (gamepad button feel).

---

## 3. CONTENT TO UI MAPPING (Section by Section)

Instruct the build agent to create the following sections sequentially, using the exact text provided below.

### Section 1: Hero / Landing (The Main Menu)
*   **Visuals:** Parallax scrolling background featuring a magical twilight landscape, glowing crystals, and a distant castle.
*   **Centerpiece:** The main header text heavily stylized.
*   **Content Injection:**
    *   **Title:** Sajith KP
    *   **Subtitle:** Polymathic Game Developer & Software Engineer
    *   **Contact/Location Bar:** 📍 Ernakulam, Kerala, India | 📞 +91 8075592650 | ✉️ sajith.kp.2002@gmail.com | 📺 YouTube: Gemsteak / stargon_monk
    *   **CTA Button:** A ruby-red crystal button reading "Start Quest (View CV)" that scrolls down.

### Section 2: My Story (The Lore)
*   **Visuals:** A massive stylized grey stone slab resembling an RPG quest board or ancient parchment.
*   **Header:** MY STORY / BIOGRAPHY
*   **Content Injection:** 
    "I am a software engineer and game developer with an interdisciplinary approach, blending game architecture, mathematical systems, and AI-native workflows. As the founder of Gemsteak Studios, I take a first-principles approach to software and game design—breaking down complex mechanics, attribute scaling math, and procedural generation before building robust prototypes. I specialize in 2D/3D game development, full-stack desktop/web applications, and leveraging offline, local AI development stacks to build private, self-reliant tools."

### Section 3: Skill Tree (Technical Expertise)
*   **Visuals:** Instead of standard bullet points, display these categories inside "inventory slots" or node-like visual clusters connected by subtle magical vines or glowing lines.
*   **Header:** SKILL TREE
*   **Content Injection:**
    *   **Game Development & Architecture:** Unity, C#, 2D/3D Architecture, Procedural Generation, Mechanics Design, State Machines.
    *   **Web & Mobile Engineering:** React, React Native, Expo, TypeScript, JavaScript, Node.js, Express, Django REST Framework (DRF).
    *   **Desktop App Development:** Electron.js, Full offline-first architectures.
    *   **AI & Machine Learning:** Local LLM inference, CUDA acceleration, PyTorch, OpenCV, Streamlit, GGUF quantized models, LanceDB vector databases, Claude MCP integrations, AI-native "vibe coding" workflows.

### Section 4: The Archives (Featured Projects)
*   **Visuals:** A grid of "Level Select" style cards with glowing crystal borders that shift color on hover.
*   **Header:** THE ARCHIVES
*   **Content Injection:** 
    *(Display a placeholder message: "Archives currently locked. New levels loading soon...")*

### Section 5: Experience (Timeline)
*   **Visuals:** A winding dirt path flowing down the page with wooden signposts or stone markers acting as the timeline nodes.
*   **Header:** EXPERIENCE
*   **Content Injection:**
    *   **Node 1:** Founder & Lead Developer | *Gemsteak Studios*
        *   Lead the technical architecture, game mechanics design, and original lore development for indie titles like The Quill Archives / Flare Quills.
        *   Design custom 16-bit/32-bit pixel art and vector graphics for character sprites and environments.
    *   **Node 2:** Co-Founder & Developer | *Produit Academy*

### Section 6: Training Grounds & Guilds
*   **Visuals:** A split section. "Training Grounds" looks like a wizard's academy banner, and "Guilds" looks like an adventurer's badge board.
*   **Content Injection (Training Grounds):**
    *   Bachelor of Technology in Computer Science | *TKM College of Engineering, Kollam*
    *   Diploma in Computer Science | *AKNM Government Polytechnic College, Thirurangadi*
*   **Content Injection (Guilds & Achievements):**
    *   1st Prize Winner: State Scratch Programming Competition at Shastrolsavam (2020).
    *   Member: CROB TKMCE (Robotics Club), organizing events including the TKMCE Kerala Robocon '26.

---

## 4. INSTRUCTIONS FOR CLAUDE (To append to your prompt)
**System Prompt for Claude:**
"You are tasked with building a responsive web portfolio. Use the connected Google Stitch MCP tools to generate the design, components, and layout according to this SRS. 
1. Strictly adhere to the 'Gemsteak' thick-outlined, ruby-and-stone 2D game aesthetic.
2. Embed the provided CV text exactly as written into the specified UI containers.
3. Ensure the CSS includes styling for faceted crystals, thick borders (`border: 4px solid black`), and playful hovering animations.
4. Output the complete, functional code structure ready for deployment."