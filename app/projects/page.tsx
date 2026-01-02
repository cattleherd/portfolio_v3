"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

const projects: Project[] = [
  {
    title: "Afkaa",
    description: "Gamified Somali language-learning app designed for the next generation.",
    href: "#",
    tag: "React Native",
  },
  {
    title: "Resource Portal",
    description: "A high-performance, searchable directory for educational resources.",
    href: "#",
    tag: "Next.js",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-yellow-500/30">
      {/* Container with responsive padding */}
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-24">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
            Projects
          </h1>
          <Link
            href="/"
            className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm transition-all hover:border-yellow-400/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="transition-transform group-hover:-translate-x-1">←</span> Home
            </span>
          </Link>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/5 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-800/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/0 via-transparent to-yellow-400/0 opacity-0 transition-opacity group-hover:opacity-5" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                    {p.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300">
                  {p.description}
                </p>
              </div>

              <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-yellow-400 opacity-0 transition-all translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                View Project ↗
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}