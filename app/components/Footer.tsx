import { IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";

const GITHUB_URL = "https://github.com/BinarySpecter/DevLens";

export default function Footer() {
	return (
		<footer className="border-t border-white/[0.06]">
			<div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
				<div className="flex flex-col items-center gap-1 sm:items-start">
					<div className="font-mono font-semibold tracking-tight text-zinc-100 flex items-center gap-1">
						DevLens<span className="text-emerald-400">_</span>
					</div>
					<p className="text-sm text-zinc-500">Built for developers.</p>
				</div>

				<div className="flex items-center gap-6 text-sm text-zinc-500 font-mono">
					<a
						href="#how-it-works"
						className="hover:text-zinc-200 transition-colors duration-200"
					>
						How it Works
					</a>
					<a
						href="#examples"
						className="hover:text-zinc-200 transition-colors duration-200"
					>
						Examples
					</a>
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-300 transition-colors duration-200"
					>
						<IconBrandGithub className="size-4" />
						GitHub
						<IconArrowUpRight className="size-3.5" />
					</a>
				</div>
			</div>

			<div className="border-t border-white/[0.04]">
				<p className="text-center text-xs text-zinc-600 font-mono pt-8 pb-6 px-6">
					Crafted by Chetan Chittori
				</p>
			</div>
		</footer>
	);
}