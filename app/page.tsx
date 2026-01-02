"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Rive from "@rive-app/react-canvas";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Github,
  Linkedin,
  X,
  ChevronDown,
  ExternalLink,
  Cpu,
  Instagram,
  ArrowUpRight,
  Gamepad2,
} from "lucide-react";
import Image from "next/image";

export default function Portfolio() {
  // whether Afkaa portal expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  // ref for positioning of rive element
  const mascotRef = useRef<HTMLDivElement | null>(null);

  // calculate center of the portal (for clipPath)
  const [portalCenter, setPortalCenter] = useState({ x: 0, y: 0 });

  // helper fn to recenter portal
  const recenterPortal = () => {
    if (!mascotRef.current) return;
    const rect = mascotRef.current.getBoundingClientRect();
    setPortalCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  // initialize + keep portal center accurate on resize
  useLayoutEffect(() => {
    const update = () => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      setPortalCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // mouse parallax state values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const imgX = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // normalized values for mouse movement -0.5 to 0.5
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // scroll to the bio section when user clicks the "scroll" button (only for <2xl)
  const scrollToBio = () => {
    document
      .getElementById("bio")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ typed variants (fixes Vercel/TS Variants errors)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#09090b] font-sans text-zinc-100 selection:bg-yellow-500/30 text-[15px] sm:text-[16px] 2xl:text-[18px]">
      {/* 1) THE YELLOW PORTAL LAYER */}
      <motion.div
        initial={false}
        animate={{
          clipPath: isExpanded
            ? `circle(150vmax at ${portalCenter.x}px ${portalCenter.y}px)`
            : `circle(60px at ${portalCenter.x}px ${portalCenter.y}px)`,
        }}
        transition={{ type: "spring", stiffness: 38, damping: 16 }}
        className="fixed inset-0 z-[60] bg-[#FFCA45] pointer-events-none overflow-y-auto custom-scrollbar"
        style={{ pointerEvents: isExpanded ? "auto" : "none" }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10 pt-24 pb-24 text-yellow-950"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="fixed top-6 left-6 sm:top-10 sm:left-10 p-4 bg-yellow-900/10 hover:bg-yellow-900/20 rounded-full transition-all hover:rotate-90 z-[70]"
                aria-label="Close"
              >
                <X size={28} />
              </button>

              {/* Header */}
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.45em] mb-4 opacity-70 flex items-center gap-3">
                  <span className="h-px w-8 bg-yellow-950/30" />
                  Featured Project
                </h2>
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] mb-8">
                  Afkaa
                </h1>
                <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight max-w-2xl">
                  A fun, gamified app that makes learning Somali feel like play.
                </p>
              </motion.div>

              {/* Core Features + Case Study + CTA */}
              <motion.div variants={itemVariants} className="space-y-16">
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest border-b border-yellow-950/10 pb-2">
                    Core Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FeatureItem
                      icon={Gamepad2}
                      title="Gamified Quizzing"
                      desc="Interactive quizzes and instant feedback that keep every session fresh and rewarding."
                    />
                    <FeatureItem
                      icon={Cpu}
                      title="Motion Design"
                      desc="Powered by Rive, bringing lessons to life with responsive, tactile interactions."
                    />
                  </div>
                </div>

                <motion.div variants={itemVariants} className="space-y-6 pt-8">
                  <div className="flex items-center justify-between border-b border-yellow-950/10 pb-2">
                    <h3 className="text-sm font-black uppercase tracking-widest">
                      Full Case Study
                    </h3>
                    <a
                      href="https://www.figma.com/deck/20e0kAnoIIITqTTVCdM87X/Untitled--Copy-?node-id=280-42"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      Open in Figma <ArrowUpRight size={12} />
                    </a>
                  </div>

                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-yellow-900/5 border border-yellow-950/10 shadow-inner group">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/deck/20e0kAnoIIITqTTVCdM87X/Untitled--Copy-?node-id=280-42"
                      allowFullScreen
                    />
                  </div>

                  <p className="text-xs font-medium opacity-60 italic text-center">
                    Use the arrows in the embed to navigate through the case
                    study.
                  </p>
                </motion.div>

                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest border-b border-yellow-950/10 pb-2">
                    Check It Out
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href="https://afkaa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-yellow-950 text-yellow-50 rounded-2xl font-black uppercase italic tracking-wider shadow-xl shadow-yellow-900/20"
                    >
                      Try the Demo <ExternalLink size={18} />
                    </motion.a>

                    <motion.a
                      href="https://www.instagram.com/afkaaapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(120, 53, 15, 0.3)",
                      }}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-yellow-900/10 text-yellow-950 border border-yellow-950/20 rounded-2xl font-black uppercase italic tracking-wider transition-colors"
                    >
                      Follow @afkaaapp <Instagram size={18} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2) GLOBAL GRAIN OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-[100] opacity-10 mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* 3) HERO: <2xl single column, 2xl+ two columns */}
      <section
        className={[
          "relative z-30 w-full px-5 sm:px-8",
          // ✅ reserve space for the button row (prevents cut-off on short heights)
          "min-h-[100svh] grid grid-rows-[1fr_auto]",
          "pt-6 sm:pt-8 pb-4 sm:pb-6",
          "transition-opacity duration-500",
          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        {/* Row 1: hero content (centered) */}
        <div className="min-h-0 flex items-center justify-center">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid items-center gap-10 2xl:grid-cols-[minmax(0,1fr)_520px]">
              {/* LEFT: HERO CONTENT */}
              <div className="w-full flex flex-col items-center text-center 2xl:items-start 2xl:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "1200px",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  className="group relative cursor-pointer"
                >
                  {/* predictable step sizing (doesn't explode on big screens) */}
                  <div className="relative mx-auto 2xl:mx-0 h-[16rem] w-[16rem] sm:h-[18rem] sm:w-[18rem] md:h-[15rem] md:w-[15rem] lg:h-[19rem] lg:w-[19rem] xl:h-[20rem] xl:w-[20rem] 2xl:h-[22rem] 2xl:w-[22rem]">
                    <div className="absolute inset-0 rounded-[3.4rem] sm:rounded-[4.1rem] bg-gradient-to-b from-zinc-900 to-black border-[5px] border-zinc-800/80 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_0_40px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
                      <motion.div
                        style={{ x: imgX, y: imgY }}
                        className="relative h-full w-full scale-[1.12] will-change-transform"
                      >
                        <Image
                          src="/profile1.jpg"
                          alt="Radwan Ahmed"
                          fill
                          priority
                          sizes="(max-width: 768px) 80vw, (max-width: 1536px) 20rem, 22rem"
                          className="object-cover grayscale-[0.55] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="absolute inset-[-2rem] rounded-full bg-yellow-400/10 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-1000 pointer-events-none" />
                </motion.div>

                <motion.h1
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 select-none flex flex-col items-center 2xl:items-start uppercase italic font-black tracking-tighter leading-[0.88]"
                >
                  <motion.span
                    variants={itemVariants}
                    className="text-[clamp(2.8rem,4vw,5.2rem)]"
                  >
                    Radwan
                  </motion.span>
                  <motion.span
                    variants={itemVariants}
                    className="text-[clamp(2.8rem,4vw,5.2rem)] text-zinc-600/90"
                  >
                    Ahmed
                  </motion.span>
                </motion.h1>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 sm:mt-7 flex flex-wrap justify-center 2xl:justify-start gap-4 px-4 py-3 bg-zinc-900/50 backdrop-blur-lg rounded-3xl border border-white/5 shadow-xl"
                >
                  <NavIcon
                    href="https://github.com/cattleherd"
                    label="GitHub"
                    color="bg-zinc-800"
                    icon={Github}
                  />
                  <NavIcon
                    href="https://www.linkedin.com/in/radwan-ahmed-to/"
                    label="LinkedIn"
                    color="bg-[#0077B5]/90"
                    icon={Linkedin}
                  />
                </motion.div>
              </div>

              {/* RIGHT: BIO DOCK (2xl+) */}
              <div className="hidden 2xl:block">
                <div className="rounded-3xl border border-white/8 bg-zinc-950/65 backdrop-blur-xl p-7 shadow-2xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">
                        Bio
                      </p>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                        Hello!
                      </h2>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900/50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 border border-white/10">
                      <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                      Toronto
                    </div>
                  </div>

                  {/* internal scroll keeps hero “fit” even if text grows */}
                  <div className="mt-5 max-h-[55svh] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-[clamp(1rem,0.9vw,1.2rem)] leading-relaxed text-zinc-300/90">
                      I’m a 4th-year Computer Science student at Thompson Rivers
                      University. I like designing interfaces, learning new
                      tools (currently diving into motion design), and building
                      products that feel smooth, playful, and genuinely
                      enjoyable to use.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <div className="rounded-2xl bg-zinc-900/40 border border-white/10 p-5">
                        <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                          Stack
                        </p>
                        <p className="mt-2 text-sm text-zinc-200">
                          React.js • React Native • Figma • Rive • JavaScript
                        </p>
                      </div>

                      <div className="rounded-2xl bg-zinc-900/40 border border-white/10 p-5">
                        <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                          Focus
                        </p>
                        <p className="mt-2 text-sm text-zinc-200">
                          Interface design • Mobile app development • Motion
                          design • Shipping usable products
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-zinc-900/30 border border-white/10 p-5">
                      <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                        Tip
                      </p>
                      <p className="mt-2 text-sm text-zinc-200">
                        Tap the floating Afkaa mascot to open the project
                        portal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: scroll button anchored (never clipped) */}
        {!isExpanded && (
          <div className="2xl:hidden flex justify-center pt-2 sm:pt-4 [@media(max-height:650px)]:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.8, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.04 }}
              transition={{ delay: 1.2, duration: 0.55 }}
              onClick={scrollToBio}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur border border-white/10 text-sm font-medium text-zinc-300 hover:text-white hover:border-white/30 transition-all"
            >
              <span>Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.button>
          </div>
        )}
      </section>

      {/* 4) BIO SECTION (for <2xl only) */}
      <section
        id="bio"
        className="relative z-30 2xl:hidden px-5 sm:px-8 pb-24 pt-10 sm:pt-14"
      >
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/8 bg-zinc-950/65 backdrop-blur-xl p-6 sm:p-9 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">
                  Bio
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Hello!
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900/50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 border border-white/10">
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                Toronto
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-300/90">
              I’m a 4th-year Computer Science student at Thompson Rivers
              University. I like designing interfaces, learning new things
              (currently learning motion design), and building products that
              people actually enjoy using.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-zinc-900/40 border border-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Stack
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  React.js • React Native • Figma • Rive
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-900/40 border border-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Focus
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  Software Engineering • Interface and motion design • Shipping
                  usable products
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) FLOATING AFKAA MASCOT */}
      <motion.div
        ref={mascotRef}
        onAnimationComplete={() => recenterPortal()}
        initial={{ opacity: 0, scale: 0.6, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 180, damping: 15 }}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="fixed top-5 right-5 sm:top-8 sm:right-8 z-[110] cursor-pointer group"
      >
        <div className="relative h-[120px] w-[120px] rounded-full shadow-xl overflow-hidden ring-1 ring-white/5 transition-all duration-300 group-hover:scale-110">
          <Rive src="/afkaa.riv" stateMachines="State Machine 1" />
        </div>
      </motion.div>
      {/* Footer */}
      <footer className="relative z-30 border-t border-white/10 px-5 sm:px-8 py-10 text-center text-xs sm:text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl">
          <p className="tracking-wide">
            © {new Date().getFullYear()} Radwan Ahmed. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- Helper Components ---------------- */

function FeatureItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 h-10 w-10 bg-yellow-950/5 flex items-center justify-center rounded-xl border border-yellow-950/10">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="font-black italic uppercase text-sm">{title}</h4>
        <p className="text-sm opacity-80 leading-snug">{desc}</p>
      </div>
    </div>
  );
}
function NavIcon({
  label,
  color,
  icon: Icon,
  href,
}: {
  label: string;
  color: string;
  icon: any;
  href: string;
}) {
  const variants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
      whileHover={{ y: -6, scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="flex flex-col items-center gap-1.5 group"
      aria-label={label}
    >
      <div
        className={`h-11 w-11 sm:h-12 sm:w-12 ${color} rounded-xl shadow-md flex items-center justify-center transition-all group-hover:rotate-3`}
      >
        <Icon size={20} className="text-white" strokeWidth={2.4} />
      </div>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200">
        {label}
      </span>
    </motion.a>
  );
}
