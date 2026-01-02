import Link from "next/link";

type Project = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

const projects: Project[] = [
  {
    title: "Afkaa",
    description: "Gamified Somali language-learning app.",
    href: "#",
    tag: "React Native",
  },
  {
    title: "Resource Portal",
    description: "Tagged, searchable resource directory.",
    href: "#",
    tag: "Next.js",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen px-6">
      <section className="mx-auto max-w-2xl py-14">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Projects</h1>
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          >
            ← Home
          </Link>
        </div>

        <div className="mt-8 grid gap-3">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">{p.title}</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    {p.description}
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  {p.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
