"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";

const GITHUB_URL = "https://github.com/BinarySpecter/DevLens";

const links = [
	{ id: "how-it-works", label: "How it Works" },
	{ id: "examples", label: "Examples" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState<string>("");

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 8);

			const offset = 120;
			const pos = window.scrollY + offset;
			let current = "";
			for (const link of links) {
				const el = document.getElementById(link.id);
				if (el && el.offsetTop <= pos) current = link.id;
			}
			setActive(current);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={clsx(
				"sticky top-0 z-50 transition-all duration-300 border-b",
				scrolled
					? "bg-[#0b0b0d]/80 backdrop-blur-md border-white/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.4)]"
					: "bg-transparent border-transparent",
			)}
		>
			<nav className="flex items-center justify-between h-16 lg:h-[68px] px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
				<a
					href="#top"
					aria-label="DevLens home"
					className="font-mono text-lg lg:text-xl font-semibold tracking-tight text-zinc-100 flex items-center gap-0.5"
				>
					DevLens
					<span className="size-[9px] rounded-[2px] bg-emerald-400 inline-block animate-caret" />
				</a>

				<div className="hidden md:flex items-center gap-1 text-sm font-medium font-mono">
					{links.map((link) => (
						<a
							key={link.id}
							href={`#${link.id}`}
							className={clsx(
								"relative px-3.5 py-1.5 rounded-full transition-colors duration-200",
								active === link.id
									? "text-emerald-300 bg-emerald-400/10"
									: "text-zinc-400 hover:text-zinc-100",
							)}
						>
							{link.label}
						</a>
					))}
				</div>

				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 px-4 h-9 text-sm font-medium text-zinc-300 border border-white/10 rounded-full hover:border-emerald-400/50 hover:text-emerald-300 transition-colors duration-200"
				>
					<IconBrandGithub className="size-4" />
					GitHub
					<IconArrowUpRight className="size-3.5 text-zinc-500" />
				</a>
			</nav>
		</header>
	);
}
