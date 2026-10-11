"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, Mail, ExternalLink, Download } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/data/site";
import { RotatingText } from "@/components/fx/RotatingText";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { Magnetic } from "@/components/fx/Magnetic";

export function Hero() {
  const socialLinks = [
    { icon: GitHubIcon, href: siteConfig.social.github, label: "GitHub" },
    { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
  ];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-linear-to-b from-aqua-500/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-aqua-400 mb-4 text-sm"
            >
              ~/shubham $ whoami
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-shimmer cursor-default">
              {siteConfig.name}
            </h1>

            <div className="h-16 mb-6">
              <RotatingText
                items={[
                  "Aspiring Machine Learning Engineer",
                  "GenAI Developer",
                  "Gemini & Grok AI Developer",
                  "Cloud AI Practitioner",
                ]}
              />
            </div>

            <p className="text-fog-400 text-lg mb-8 max-w-xl leading-relaxed">
              {siteConfig.summary}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-aqua-400/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm text-fog-300">{siteConfig.status}</span>
            </motion.div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Magnetic>
                <motion.a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-aqua-500 text-ink-950 font-semibold hover:bg-aqua-400 transition-colors glow-aqua-hover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                  <ExternalLink size={18} />
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-fog-100 font-semibold hover:bg-glass-highlight transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Talk
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a
                  href="/resume.pdf"
                  download="Shubham_Singh_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-fog-100 font-semibold hover:bg-glass-highlight transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                  <Download size={18} />
                </motion.a>
              </Magnetic>
            </div>

            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg glass text-fog-400 hover:text-aqua-400 hover:border-aqua-400/40 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - profile image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center perspective:[1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative transition-transform duration-100 ease-out"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-aqua-400/20 to-teal-400/20 rounded-3xl blur-2xl" />
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden glass border border-glass-border glow-aqua">
                <Image
                  src="/avatar.png"
                  alt={siteConfig.name}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 px-4 py-2 rounded-xl glass border border-aqua-400/30"
              >
                <p className="text-sm font-semibold text-aqua-400">
                  TCS CodeVita
                </p>
                <p className="text-xs text-fog-400">Global Top 1500</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 -right-6 px-4 py-2 rounded-xl glass border border-teal-400/30"
              >
                <p className="text-sm font-semibold text-teal-400">
                  GCP Arcade
                </p>
                <p className="text-xs text-fog-400">Champion & Legend</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-fog-500"
          >
            <span className="text-xs font-mono">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
