import {
	IconCode,
	IconTerminal2,
	IconBrowser,
	IconBug,
	IconFlame,
	IconRefresh,
	IconBrandPython,
	IconStack,
} from "@tabler/icons-react";
import Reveal from "./Reveal";

const tools = [
	{ name: "VS Code", icon: IconCode },
	{ name: "Cursor", icon: IconCode },
	{ name: "Terminal", icon: IconTerminal2 },
	{ name: "Chrome DevTools", icon: IconBrowser },
	{ name: "Browser Console", icon: IconTerminal2 },
	{ name: "Stack Traces", icon: IconStack },
	{ name: "React Errors", icon: IconFlame },
	{ name: "Next.js", icon: IconRefresh },
	{ name: "Python", icon: IconBrandPython },
];

export default function WorksGreatWith() {
	return (
		<section id="examples" className="max-w-7xl mx-auto px-4 pb-28 scroll-mt-20">
			<Reveal>
				<div className="text-center mb-14">
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
						Works Great With
					</h2>
					<p className="mt-3 text-lg text-zinc-400">
						Whatever you&apos;re debugging, DevLens reads it.
					</p>
				</div>
			</Reveal>

			<Reveal delay={0.1}>
				<div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
					{tools.map((tool) => (
						<div
							key={tool.name}
							className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-zinc-300 hover:border-emerald-400/40 hover:text-emerald-300 transition-colors duration-200 font-mono"
						>
							<tool.icon className="size-4 text-emerald-400/70" />
							{tool.name}
						</div>
					))}
				</div>
			</Reveal>
		</section>
	);
}