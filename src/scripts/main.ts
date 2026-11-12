import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SVG_NS = "http://www.w3.org/2000/svg";

/* ------------------------------------------------------------------ helpers */
/** Position of an element's centre relative to `ancestor`, ignoring CSS transforms. */
function centreWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

function svgPath(d: string, cls?: string, attrs: Record<string, string> = {}) {
  const p = document.createElementNS(SVG_NS, "path");
  p.setAttribute("d", d);
  if (cls) p.setAttribute("class", cls);
  for (const [k, v] of Object.entries(attrs)) p.setAttribute(k, v);
  return p;
}

function sizeSvg(svg: SVGSVGElement, host: HTMLElement) {
  svg.setAttribute("viewBox", `0 0 ${host.offsetWidth} ${host.offsetHeight}`);
  svg.replaceChildren();
}

/* ------------------------------------------------------------------ starfield */
function initStars() {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-stars]");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  type Star = { x: number; y: number; r: number; p: number; s: number; c: string };
  let stars: Star[] = [];
  const colours = ["#ffffff", "#ffffff", "#c9b8ff", "#3ff3ff", "#ffd25e", "#ff9cc9"];

  const build = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((innerWidth * innerHeight) / 7000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.4 + 0.3,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 1.5 + 0.5,
      c: colours[(Math.random() * colours.length) | 0],
    }));
  };

  const draw = (t: number) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const st of stars) {
      ctx.globalAlpha = reduceMotion ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin(st.p + (t / 1000) * st.s));
      ctx.fillStyle = st.c;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  build();
  window.addEventListener("resize", () => {
    build();
    if (reduceMotion) draw(0);
  });
  if (reduceMotion) {
    draw(0);
    return;
  }
  const loop = (t: number) => {
    draw(t);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ------------------------------------------------------------------ HUD */
function initHud() {
  // XP bar = scroll progress
  const fill = document.querySelector<HTMLElement>("[data-xp]");
  if (fill) {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      fill.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  // mobile menu
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (toggle && menu) {
    const setOpen = (open: boolean) => {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("hidden", !open);
      menu.classList.toggle("flex", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) setOpen(false);
    });
    addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  }

  // active section -> pressed stone button
  const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
  const ids = [...new Set(links.map((l) => l.hash.slice(1)))];
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const l of links) l.classList.toggle("is-active", l.hash === `#${entry.target.id}`);
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ------------------------------------------------------------------ skill tree vines */
function initVines() {
  const tree = document.querySelector<HTMLElement>("[data-tree]");
  const svg = tree?.querySelector<SVGSVGElement>("[data-vines]");
  const core = tree?.querySelector<HTMLElement>("[data-core]");
  if (!tree || !svg || !core) return;
  const branches = [...tree.querySelectorAll<HTMLElement>("[data-branch]")];

  const socket = (x: number, y: number) => {
    const s = document.createElementNS(SVG_NS, "circle");
    s.setAttribute("cx", String(x));
    s.setAttribute("cy", String(y));
    s.setAttribute("r", "9");
    s.setAttribute("fill", "#3ff3ff");
    s.setAttribute("stroke", "#0b0b12");
    s.setAttribute("stroke-width", "4");
    s.setAttribute("filter", "url(#glow-cyan)");
    return s;
  };
  const vine = (d: string) => [svgPath(d, "vine-glow"), svgPath(d, "vine-ink"), svgPath(d, "vine-core")];

  const draw = () => {
    sizeSvg(svg, tree);
    const c = centreWithin(core, tree);
    const boxes = branches.map((el) => {
      const m = centreWithin(el, tree);
      return { x: m.x, y: m.y, hw: el.offsetWidth / 2, hh: el.offsetHeight / 2 };
    });
    const stacked = boxes.every((b) => Math.abs(b.x - c.x) < b.hw);

    if (stacked) {
      // single column: chain core -> branch 1 -> branch 2 ... along the gaps
      let from = { x: c.x, y: c.y + core.offsetHeight / 2 };
      for (const b of boxes) {
        const top = { x: b.x, y: b.y - b.hh };
        svg.append(...vine(`M${from.x},${from.y} L${top.x},${top.y}`), socket(from.x, from.y), socket(top.x, top.y));
        from = { x: b.x, y: b.y + b.hh };
      }
      return;
    }

    // radial layout: core -> the side of each panel that faces it
    for (const b of boxes) {
      const n = { x: b.x + (b.x < c.x ? b.hw : -b.hw), y: b.y };
      const mx = (c.x + n.x) / 2;
      svg.append(...vine(`M${c.x},${c.y} C${mx},${c.y} ${mx},${n.y} ${n.x},${n.y}`), socket(n.x, n.y));
    }
  };
  draw();
  new ResizeObserver(draw).observe(tree);
}

/* ------------------------------------------------------------------ experience trail */
function initTrail() {
  const trail = document.querySelector<HTMLElement>("[data-trail]");
  const svg = trail?.querySelector<SVGSVGElement>("[data-trail-svg]");
  if (!trail || !svg) return;
  const stones = [...trail.querySelectorAll<HTMLElement>("[data-milestone]")];
  let maskPath: SVGPathElement | null = null;
  let length = 0;
  let progress = reduceMotion ? 1 : 0;

  const paint = () => {
    if (maskPath) maskPath.style.strokeDashoffset = String(length * (1 - progress));
  };

  const draw = () => {
    sizeSvg(svg, trail);
    const pts = stones.map((s) => centreWithin(s, trail));
    if (pts.length < 2) return;
    const narrow = trail.offsetWidth < 640;
    const swing = narrow ? 22 : Math.min(150, trail.offsetWidth * 0.14);
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const dy = b.y - a.y;
      const s = (i % 2 ? -1 : 1) * swing;
      d += ` C${a.x + s},${a.y + dy * 0.4} ${b.x + s},${b.y - dy * 0.4} ${b.x},${b.y}`;
    }
    const w = narrow ? 26 : 40;

    const defs = document.createElementNS(SVG_NS, "defs");
    const mask = document.createElementNS(SVG_NS, "mask");
    mask.setAttribute("id", "trail-mask");
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    maskPath = svgPath(d, undefined, { fill: "none", stroke: "#fff", "stroke-width": String(w + 30), "stroke-linecap": "round" });
    mask.append(maskPath);
    defs.append(mask);

    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("mask", "url(#trail-mask)");
    g.append(
      svgPath(d, undefined, { fill: "none", stroke: "#0b0b12", "stroke-width": String(w + 9), "stroke-linecap": "round" }),
      svgPath(d, undefined, { fill: "none", stroke: "#8a5a2b", "stroke-width": String(w), "stroke-linecap": "round" }),
      svgPath(d, undefined, { fill: "none", stroke: "#a8733a", "stroke-width": String(w * 0.45), "stroke-linecap": "round", opacity: "0.6" }),
      svgPath(d, undefined, { fill: "none", stroke: "#5e3a17", "stroke-width": "6", "stroke-linecap": "round", "stroke-dasharray": "1 26" }),
    );
    svg.append(defs, g);

    length = maskPath.getTotalLength();
    maskPath.style.strokeDasharray = String(length);
    paint();
  };

  draw();
  new ResizeObserver(draw).observe(trail);

  if (!reduceMotion) {
    ScrollTrigger.create({
      trigger: trail,
      start: "top 75%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => {
        progress = self.progress;
        paint();
      },
    });
  }
}

/* ------------------------------------------------------------------ motion */
function initMotion() {
  if (reduceMotion) return;

  // hero intro
  gsap.from("[data-hero-in]", {
    y: 40,
    opacity: 0,
    scale: 0.92,
    duration: 0.8,
    stagger: 0.09,
    ease: "back.out(1.7)",
  });

  // hero parallax: scroll + pointer
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (hero) {
    const layers = [...hero.querySelectorAll<HTMLElement | SVGElement>("[data-depth]")];
    const movers = layers.map((layer) => {
      const depth = Number(layer.dataset.depth ?? 0.3);
      gsap.to(layer, {
        yPercent: depth * 45,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      return { depth, setX: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }) };
    });
    if (matchMedia("(pointer: fine)").matches) {
      hero.addEventListener("pointermove", (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        for (const m of movers) m.setX(nx * m.depth * -60);
      });
    }
  }

  // scroll reveals
  const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  gsap.set(reveals, { opacity: 0, y: 50 });
  ScrollTrigger.batch(reveals, {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "back.out(1.5)", overwrite: true }),
  });
}

/* ------------------------------------------------------------------ boot */
initStars();
initHud();
initMotion();
initVines();
initTrail();
// fonts change layout metrics -> recompute trigger positions once they're in
document.fonts?.ready.then(() => ScrollTrigger.refresh());
