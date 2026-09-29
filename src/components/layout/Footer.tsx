import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-glass-border py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-fog-500 text-center md:text-left">
          © {new Date().getFullYear()} {siteConfig.name} · Built with Next.js ·
          Tailwind · Framer Motion · Grok
        </p>
        <a
          href="#"
          aria-label="Back to top"
          className="p-2 rounded-lg glass text-fog-400 hover:text-aqua-400 transition-colors"
        >
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
