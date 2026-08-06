"use client";

import { useState } from "react";
import Image from "next/image";
import { IconChevronDown, IconTrash, IconHistory } from "@tabler/icons-react";
import clsx from "clsx";
import type { HistoryEntry } from "@/app/utils";

interface HistorySectionProps {
	entries: HistoryEntry[];
	activeId: string | null;
	onSelect: (entry: HistoryEntry) => void;
	onClear: () => void;
}

function formatRelative(ts: number): string {
	const date = new Date(ts);
	return date.toLocaleString(undefined, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function HistorySection({
	entries,
	activeId,
	onSelect,
	onClear,
}: HistorySectionProps) {
	const [open, setOpen] = useState(true);

	if (entries.length === 0) return null;

	return (
		<section className="w-full bg-[#0d0d10] rounded-[18px] border border-white/[0.08] overflow-hidden">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				className="w-full px-5 sm:px-7 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors duration-200"
			>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<IconHistory className="size-5 text-emerald-400/80" />
						<h2 className="text-lg font-semibold text-zinc-100 font-mono">
							Local History
						</h2>
					</div>
					<span className="text-xs text-zinc-500 font-mono">
						{entries.length} saved{entries.length === 1 ? "" : "s"}
					</span>
				</div>
				<IconChevronDown
					className={clsx(
						"size-5 text-zinc-500 transition-transform duration-300",
						open && "rotate-180",
					)}
				/>
			</button>

			<div
				className={clsx(
					"grid transition-[grid-template-rows] duration-300 ease-out",
					open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				)}
			>
				<div className="overflow-hidden">
					<div className="border-t border-white/[0.06] p-4 sm:p-6">
						<div className="flex items-center justify-between mb-5">
							<span className="text-xs text-zinc-500 font-mono">
								Stored locally in your browser.
							</span>
							<button
								type="button"
								onClick={onClear}
								className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors duration-200 font-mono"
							>
								<IconTrash className="size-3.5" />
								Clear all
							</button>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
							{entries.map((entry) => (
								<button
									key={entry.id}
									type="button"
									onClick={() => onSelect(entry)}
									className={clsx(
										"group text-left rounded-xl border bg-[#0a0a0c] overflow-hidden transition-all duration-200",
										activeId === entry.id
											? "border-emerald-400/70 ring-1 ring-emerald-400/40"
											: "border-white/[0.08] hover:border-white/20 hover:-translate-y-0.5",
									)}
								>
									<div className="h-24 bg-[#070708] relative">
										<Image
											src={entry.thumbnail}
											alt="Saved screenshot"
											fill
											unoptimized
											className="object-contain p-2"
										/>
									</div>
									<div className="p-3">
										<p className="text-sm text-zinc-300 font-medium truncate group-hover:text-zinc-100 transition-colors">
											{entry.analysis.problem}
										</p>
										<p className="text-xs text-zinc-500 mt-1 font-mono">
											{formatRelative(entry.timestamp)}
										</p>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
