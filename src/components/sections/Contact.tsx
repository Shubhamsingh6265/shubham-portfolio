"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { siteConfig } from "@/lib/data/site";
import {
  GitHubIcon,
  LinkedInIcon,
  XSocialIcon,
  KaggleIcon,
  LeetCodeIcon,
  GFGIcon,
  GoogleIcon,
  CredlyIcon,
} from "@/components/ui/social-icons";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <GlassCard className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <Mail className="text-aqua-400 shrink-0" size={20} />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-fog-200 hover:text-aqua-400 truncate transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className="shrink-0 p-2 rounded-lg bg-ink-800/50 text-fog-400 hover:text-aqua-400 hover:bg-ink-700 transition-all border border-glass-border"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check size={18} className="text-teal-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
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

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  {
                    icon: GitHubIcon,
                    href: siteConfig.social.github,
                    label: "GitHub",
                  },
                  {
                    icon: LinkedInIcon,
                    href: siteConfig.social.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: XSocialIcon,
                    href: siteConfig.social.twitter,
                    label: "X",
                  },
                  {
                    icon: KaggleIcon,
                    href: siteConfig.social.kaggle,
                    label: "Kaggle",
                  },
                  {
                    icon: LeetCodeIcon,
                    href: siteConfig.social.leetcode,
                    label: "LeetCode",
                  },
                  {
                    icon: GFGIcon,
                    href: siteConfig.social.geeksforgeeks,
                    label: "GfG",
                  },
                  {
                    icon: GoogleIcon,
                    href: siteConfig.social.googleSkills,
                    label: "Google Skills",
                  },
                  {
                    icon: CredlyIcon,
                    href: siteConfig.social.credly,
                    label: "Credly",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-lg glass text-fog-400 hover:text-aqua-400 hover:border-aqua-400/40 transition-all"
                  >
                    <Icon size={18} />
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
