import {
	IconCopy,
	IconCheck,
	IconBug,
	IconSearch,
	IconInfoCircle,
	IconWand,
} from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { copyToClipboard } from "@/app/clipboard";

export type CardIcon = "bug" | "search" | "info" | "wand";
export type CardColor = "red" | "orange" | "blue" | "green";

interface ResultCardProps {
	title: string;
	content: string;
	icon: CardIcon;
	color: CardColor;
}

const iconMap = {
	bug: IconBug,
	search: IconSearch,
	info: IconInfoCircle,
	wand: IconWand,
};

const colorMap: Record<CardColor, { bg: string; accent: string }> = {
	red: { bg: "bg-red-400/[0.06]", accent: "text-red-400" },
	orange: { bg: "bg-amber-400/[0.06]", accent: "text-amber-400" },
	blue: { bg: "bg-sky-400/[0.06]", accent: "text-sky-400" },
	green: { bg: "bg-emerald-400/[0.06]", accent: "text-emerald-400" },
};

export default function ResultCard({ title, content, icon, color }: ResultCardProps) {
	const Icon = iconMap[icon];
	const colors = colorMap[color];
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		const res = await copyToClipboard(content);
		if (res.status === "clipboard") {
			setCopied(true);
			toast.success("Copied to clipboard.");
			setTimeout(() => setCopied(false), 1400);
		} else if (res.status === "fallback") {
			setCopied(true);
			toast.success("Copied to clipboard.");
			toast.info("Clipboard access blocked. Using fallback...");
			setTimeout(() => setCopied(false), 1400);
		} else {
			toast.error(`Copy failed: ${res.reason ?? "unknown reason"}`);
		}
	}

	return (
		<div
			className={`${colors.bg} border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-sm`}
		>
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 min-w-0">
					<Icon className={`size-4 ${colors.accent} shrink-0`} />
					<h3 className={`text-sm font-semibold ${colors.accent} truncate font-mono`}>
						{title}
					</h3>
				</div>
				<button
					type="button"
					onClick={handleCopy}
					aria-label={`Copy ${title.toLowerCase()} to clipboard`}
					className="h-8 px-2.5 rounded-lg inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors duration-200 shrink-0"
				>
					{copied ? (
						<IconCheck className="size-3.5 text-emerald-400" />
					) : (
						<IconCopy className="size-3.5" />
					)}
				</button>
			</div>
			<p className="text-sm text-zinc-300 leading-[1.7] whitespace-pre-wrap break-words mt-3">
				{content}
			</p>
		</div>
	);
}
