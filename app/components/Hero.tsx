import { IconTerminal2 } from "@tabler/icons-react";
import Reveal from "./Reveal";

export default function Hero() {
	return (
		<section className="text-center max-w-3xl mx-auto px-4 pt-16 md:pt-20 pb-12 md:pb-16">
			<Reveal>
				<div className="inline-flex items-center gap-2 px-3.5 py-1.5 h-8 bg-emerald-400/10 text-emerald-300 text-[11px] font-mono font-semibold tracking-[0.16em] rounded-full mb-7 border border-emerald-400/20">
					<IconTerminal2 className="size-3.5" />
					AI DEBUGGING FOR DEVELOPERS
				</div>
			</Reveal>

			<Reveal delay={0.08}>
				<h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-zinc-100 leading-[1.08]">
					Upload a coding screenshot.
					<br />
					Get a structured explanation and{" "}
					<span className="text-emerald-400">fix</span> in seconds.
				</h1>
			</Reveal>

			<Reveal delay={0.16}>
				<p className="mt-6 text-lg text-zinc-400 leading-relaxed">
					Paste, drop, or upload any code screenshot. Get a clear breakdown,
					root cause, and actionable fix.
				</p>
			</Reveal>
		</section>
	);
}
