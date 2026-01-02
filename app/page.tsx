"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
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
  const [showBubble, setShowBubble] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const mascotRef = useRef<HTMLDivElement | null>(null);
  const [portalCenter, setPortalCenter] = useState({ x: 0, y: 0 });

  const recenterPortal = () => {
    if (!mascotRef.current) return;
    const rect = mascotRef.current.getBoundingClientRect();
    setPortalCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

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

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExpanded) setShowBubble(false);
  }, [isExpanded]);

  // Mouse parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const imgX = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const scrollToBio = () => {
    document
      .getElementById("bio")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 14 },
    },
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#060607] font-sans text-zinc-100 selection:bg-yellow-500/30 text-[15px] sm:text-[16px] 2xl:text-[18px]">
      {/* Yellow Portal Overlay */}
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
              className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 pt-24 pb-32 text-yellow-950"
            >
              {/* Close button */}
              <button
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
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.82] mb-6">
                  Afkaa
                </h1>
                <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight max-w-2xl">
                  A fun, gamified app that makes learning Somali feel like play.
                </p>
              </motion.div>

              {/* Features + Case Study + CTA */}
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

                <div className="space-y-6 pt-8">
                  <div className="flex items-center justify-between border-b border-yellow-950/10 pb-2">
                    <h3 className="text-sm font-black uppercase tracking-widest">
                      Full Case Study
                    </h3>
                    <a
                      href="https://www.figma.com/deck/20e0kAnoIIITqTTVCdM87X/Untitled--Copy-?node-id=280-42"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-tighter opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
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
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest border-b border-yellow-950/10 pb-2">
                    Check It Out
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href="https://afkaa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-yellow-950 text-yellow-50 rounded-2xl font-black uppercase italic tracking-wider shadow-xl shadow-yellow-900/20"
                    >
                      Try the Demo <ExternalLink size={18} />
                    </motion.a>

                    <motion.a
                      href="https://www.instagram.com/afkaaapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(120,53,15,0.3)",
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

      {/* Hero Section */}
      <section
        className={`relative z-30 w-full h-[100svh] 2xl:h-[auto] flex flex-col transition-opacity duration-500 ${
          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Row 1 */}
        <div className="flex-1 min-h-0 flex items-center justify-center px-5 2xl:px-10 pt-6 pb-4 2xl:pt-12 2xl:pb-10">
          <div className="w-full max-w-2xl 2xl:max-w-4xl flex flex-col items-center text-center">
            {/* 1) Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
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
              className="group relative flex-shrink-0"
            >
              {/* ✅ ONLY this wrapper controls size */}
              <div className="relative mx-auto h-[clamp(10rem,30vh,20rem)] w-[clamp(10rem,30vh,20rem)] 2xl:h-[clamp(16rem,34vh,28rem)] 2xl:w-[clamp(16rem,34vh,28rem)]">
                <div className="absolute inset-0 rounded-[3rem] sm:rounded-[3.5rem] 2xl:rounded-full bg-gradient-to-b from-zinc-900 to-black border-[5px] 2xl:border-[6px] border-zinc-800/70 overflow-hidden shadow-2xl ring-1 ring-white/5">
                  <motion.div
                    style={{ x: imgX, y: imgY }}
                    className="relative h-full w-full scale-[1.1] will-change-transform"
                  >
                    <Image
                      src="/profile1.jpg"
                      alt="Radwan Ahmed"
                      fill
                      priority
                      className="object-cover grayscale-[0.5] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="absolute inset-[-2rem] 2xl:inset-[-3rem] rounded-full bg-yellow-400/5 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 pointer-events-none" />
            </motion.div>

            {/* 2) Name */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 2xl:mt-10 select-none flex flex-col items-center uppercase italic font-black tracking-tighter leading-[0.85]"
            >
              <motion.span
                variants={itemVariants}
                className="text-[clamp(2.4rem,6vh,5rem)] 2xl:text-[clamp(3.4rem,6.2vh,6.4rem)]"
              >
                Radwan
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="text-[clamp(2.4rem,6vh,5rem)] 2xl:text-[clamp(3.4rem,6.2vh,6.4rem)] text-zinc-600/90"
              >
                Ahmed
              </motion.span>
            </motion.h1>

            {/* 3) Bio */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 2xl:mt-8 max-w-md 2xl:max-w-2xl px-4 2xl:px-0"
            >
              <p className="text-[clamp(0.95rem,2.1vh,1.15rem)] 2xl:text-[clamp(1.25rem,1.65vh,1.65rem)] leading-relaxed 2xl:leading-snug text-zinc-400 font-medium">
                Software Engineer <span className="text-zinc-600 mx-1">•</span>{" "}
                UX + Motion
                <br className="hidden sm:block" />
                Building tactile digital experiences in Toronto.
              </p>
            </motion.div>

            {/* 4) Social */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 2xl:mt-9 flex flex-wrap justify-center gap-3 2xl:gap-4 px-4 2xl:px-6 py-2.5 2xl:py-4 bg-zinc-900/40 backdrop-blur-md rounded-2xl 2xl:rounded-3xl border border-white/5 shadow-xl transform 2xl:scale-[1.06]"
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
        </div>

        {/* Row 2 */}
        <div className="w-full flex justify-center pb-6 flex-shrink-0 2xl:hidden">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={scrollToBio}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Full Bio
            </span>
            <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-zinc-900/50 backdrop-blur group-hover:border-white/30 transition-all">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown
                  size={18}
                  className="text-zinc-500 group-hover:text-white"
                />
              </motion.div>
            </div>
          </motion.button>
        </div>
      </section>
      {/* Bio Section */}
      <section
        id="bio"
        className="relative z-30 px-4 sm:px-8 2xl:px-10 pb-20 2xl:pb-28 pt-10 sm:pt-14 scroll-mt-6 " 
      >
        <div className="mx-auto max-w-3xl 2xl:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl 2xl:rounded-[2.5rem] border border-white/8 bg-zinc-950/70 backdrop-blur-xl p-5 sm:p-10 2xl:p-14 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 2xl:gap-10">
              <div>
                <p className="text-[10px] sm:text-xs 2xl:text-sm font-black uppercase tracking-[0.45em] text-zinc-500">
                  Bio
                </p>

                <h2 className="mt-2 sm:mt-3 2xl:mt-5 text-[clamp(1.6rem,6vw,2.1rem)] 2xl:text-[clamp(2.2rem,2.4vw,3.1rem)] font-black tracking-tight text-white">
                  Radwan Ahmed
                </h2>

                <p className="mt-2 2xl:mt-4 text-[13px] sm:text-[16px] 2xl:text-[19px] text-zinc-300/90 leading-snug 2xl:leading-snug">
                  Software Engineer • Frontend (React / React Native) • UX +
                  Motion
                </p>
              </div>
            </div>

            <p className="mt-5 sm:mt-8 2xl:mt-10 text-[0.9em] sm:text-[1em] 2xl:text-[1.12em] leading-relaxed 2xl:leading-relaxed text-zinc-300/90">
              I’m a 4th-year Computer Science student at Thompson Rivers
              University, based in Toronto. I build fast, accessible interfaces
              and product experiences — mainly in React and React Native — then
              polish them with strong UX and motion design so they feel
              intentional, tactile, and never “template-y.”
            </p>

            <div className="mt-6 sm:mt-10 2xl:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8">
              <div className="rounded-2xl 2xl:rounded-3xl bg-zinc-900/40 border border-white/10 p-5 sm:p-6 2xl:p-8">
                <p className="text-[10px] sm:text-xs 2xl:text-sm font-black uppercase tracking-wider text-zinc-400">
                  Stack
                </p>
                <p className="mt-2 2xl:mt-3 text-[13px] sm:text-[14px] 2xl:text-[16px] text-zinc-200 leading-relaxed">
                  React • React Native • TypeScript • Node/Express • MongoDB •
                  Figma • Rive • Framer Motion
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Afkaa Mascot */}
      <div className="fixed top-5 right-5 sm:top-8 sm:right-8 z-[110]">
        <AnimatePresence>
          {showBubble && !isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.6, x: "-50%" }}
              animate={{
                opacity: 1,
                y: [0, -6, 0],
                scale: 1,
                x: "-50%",
                transition: {
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                },
              }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
              className="absolute left-1/2 -top-3 w-auto min-w-[100px] -translate-x-1/2 bg-zinc-900 text-white px-3 py-3 rounded-2xl shadow-2xl shadow-black/60 backdrop-blur-sm border border-white/10 pointer-events-none z-[120]"
            >
              <p className="text-[13px] font-black uppercase italic tracking-tight whitespace-nowrap">
                Click me!
              </p>
              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-zinc-900" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={mascotRef}
          onAnimationComplete={recenterPortal}
          initial={{ opacity: 0, scale: 0.6, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            delay: 1.1,
            type: "spring",
            stiffness: 180,
            damping: 15,
          }}
          onClick={() => setIsExpanded((prev) => !prev)}
          className="cursor-pointer group"
        >
          <div className="pointer-events-none relative h-[120px] w-[120px] rounded-full shadow-xl overflow-hidden ring-1 ring-white/5 transition-all duration-300 group-hover:scale-110">
            <Rive src="/afkaa.riv" stateMachines="State Machine 1" />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-30 border-t border-white/10 px-5 sm:px-8 py-12 text-center text-sm text-zinc-500">
        <div className="mx-auto max-w-7xl">
          <p className="tracking-wide">
            © {new Date().getFullYear()} Radwan Ahmed
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ── Helper Components ── */

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
      <div className="shrink-0 h-11 w-11 bg-yellow-950/10 flex items-center justify-center rounded-xl border border-yellow-950/20">
        <Icon size={22} strokeWidth={2.3} />
      </div>
      <div>
        <h4 className="font-black italic uppercase text-base">{title}</h4>
        <p className="text-sm opacity-85 leading-snug mt-1">{desc}</p>
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
      whileHover={{ y: -6, scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-2 group"
      aria-label={label}
    >
      <div
        className={`h-12 w-12 sm:h-13 sm:w-13 ${color} rounded-xl shadow-lg flex items-center justify-center transition-all group-hover:rotate-6`}
      >
        <Icon size={22} className="text-white" strokeWidth={2.4} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
        {label}
      </span>
    </motion.a>
  );
}
