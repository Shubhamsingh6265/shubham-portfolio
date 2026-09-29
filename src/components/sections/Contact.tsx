"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { siteConfig } from "@/lib/data/site";
import {
  GitHubIcon,
  LinkedInIcon,
  XSocialIcon,
} from "@/components/ui/social-icons";

type Status = "idle" | "sending" | "sent" | "error";

const extraProfiles = [
  { label: "Kaggle", href: "https://www.kaggle.com/shubhamsingh8899" },
  { label: "LeetCode", href: "https://leetcode.com/u/Shubhamsingh8899/" },
  {
    label: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/profile/modelshubha83iq",
  },
  {
    label: "Google Skills",
    href: "https://www.skills.google/public_profiles/4d52f1c8-ef1c-4995-8adf-457564f84cfd",
  },
  {
    label: "Credly",
    href: "https://www.credly.com/users/shubham-singh.d74f728b",
  },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    // Fallback to mail client until a real Formspree endpoint is configured
    if (!endpoint || endpoint.includes("xxxxxxx")) {
      const data = new FormData(form);
      const subject = encodeURIComponent(
        `Portfolio contact from ${data.get("name")}`,
      );
      const body = encodeURIComponent(
        `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`,
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-lg glass bg-transparent px-4 py-3 text-sm text-fog-100 placeholder:text-fog-600 focus:outline-none focus:border-aqua-400/50 transition-colors";

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          kicker="contact"
          title={"Let's build something intelligent"}
        />
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-fog-300 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-fog-300 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-fog-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the role or project…"
                    className={inputCls}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-aqua-500 text-ink-950 font-semibold hover:bg-aqua-400 transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <Send size={16} />
                </button>
                {status === "sent" && (
                  <p className="flex items-center gap-2 text-sm text-teal-400">
                    <CheckCircle2 size={16} /> Message sent — I&apos;ll reply
                    within 24 hours. 24 hours.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} /> Something went wrong — please
                    email me directly.
                  </p>
                )}
              </form>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <GlassCard className="flex items-center gap-4">
                <Mail className="text-aqua-400 shrink-0" size={20} />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-fog-200 hover:text-aqua-400 break-all"
                >
                  {siteConfig.email}
                </a>
              </GlassCard>
              <GlassCard className="flex items-center gap-4">
                <Phone className="text-aqua-400 shrink-0" size={20} />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-sm text-fog-200 hover:text-aqua-400"
                >
                  {siteConfig.phone}
                </a>
              </GlassCard>
              <GlassCard className="flex items-center gap-4">
                <MapPin className="text-aqua-400 shrink-0" size={20} />
                <p className="text-sm text-fog-200">
                  {siteConfig.location} · Open to remote
                </p>
              </GlassCard>

              <div className="flex gap-3 pt-2">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-lg glass text-fog-400 hover:text-aqua-400 transition-colors"
                >
                  <GitHubIcon size={20} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-lg glass text-fog-400 hover:text-aqua-400 transition-colors"
                >
                  <LinkedInIcon size={20} />
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="p-3 rounded-lg glass text-fog-400 hover:text-aqua-400 transition-colors"
                >
                  <XSocialIcon size={20} />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {extraProfiles.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-fog-300 hover:text-aqua-400 transition-colors"
                  >
                    {p.label}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
