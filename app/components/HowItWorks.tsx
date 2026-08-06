import { IconUpload, IconRobot, IconBolt } from "@tabler/icons-react";
import Reveal from "./Reveal";

const steps = [
	{
		icon: IconUpload,
		title: "Upload Screenshot",
		description:
			"Paste, drag & drop, or upload a screenshot of code, terminal, browser errors or stack traces.",
	},
	{
		icon: IconRobot,
		title: "AI Analysis",
		description:
			"The AI detects the problem, root cause, explanation and possible fixes.",
	},
	{
		icon: IconBolt,
		title: "Fix Faster",
		description:
			"Copy the explanation and immediately continue debugging.",
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
			<Reveal>
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
						How it Works
					</h2>
					<p className="mt-3 text-lg text-zinc-400">
						From screenshot to fix in seconds.
					</p>
				</div>
			</Reveal>

			<div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
				<div
					aria-hidden
					className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0"
				/>
				{steps.map((step, i) => (
					<Reveal key={step.title} delay={i * 0.1} className={i === 1 ? "md:mt-10" : ""}>
						<div className="relative rounded-[18px] border border-white/[0.08] bg-[#0d0d10]/80 p-8 backdrop-blur-sm hover:border-emerald-400/30 hover:-translate-y-1 transition-all duration-300 h-full">
							<div className="flex items-center justify-between mb-6">
								<div className="size-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
									<step.icon className="size-6 text-emerald-300" />
								</div>
								<span className="text-sm font-semibold text-zinc-600 font-mono tabular-nums">
									{i === 0 ? "in" : i === 1 ? "proc" : "out"}
								</span>
							</div>
							<h3 className="text-lg font-semibold text-zinc-100">
								{step.title}
							</h3>
							<p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
								{step.description}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}