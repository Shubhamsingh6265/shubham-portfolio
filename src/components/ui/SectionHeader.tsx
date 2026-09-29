import { Reveal } from "@/components/fx/Reveal";

export function SectionHeader({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-sm text-aqua-400 mb-2">// {kicker}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 h-px w-24 bg-linear-to-r from-aqua-400 to-transparent" />
    </Reveal>
  );
}
