"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
	IconCopy,
	IconCheck,
	IconRefresh,
	IconMaximize,
	IconX,
} from "@tabler/icons-react";
import { toast } from "sonner";
import ResultCard from "./ResultCard";
import LoadingSteps from "./LoadingSteps";
import { copyToClipboard } from "@/app/clipboard";
import type { Analysis } from "@/app/utils";

interface ResultsSectionProps {
	loading: boolean;
	blobURL: string | null;
	analysis: Analysis | null;
	elapsed: number;
	onAnalyzeAnother: () => void;
}

function formatAnalysis(a: Analysis): string {
	const lines = [
		"## Problem",
		a.problem,
		"",
		"## Root Cause",
		a.rootCause,
		"",
		"## Explanation",
		a.explanation,
		"",
		"## Suggested Fix",
		a.fix,
	];
	if (a.code) {
		lines.push("", "## Suggested Code", "```", a.code, "```");
	}
	return lines.join("\n");
}

export default function ResultsSection({
	loading,
	blobURL,
	analysis,
	elapsed,
	onAnalyzeAnother,
}: ResultsSectionProps) {
	const [copied, setCopied] = useState(false);
	const [zoom, setZoom] = useState(false);

	useEffect(() => {
		if (!zoom) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setZoom(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [zoom]);

	async function handleCopyAll() {
		if (!analysis) return;
		const res = await copyToClipboard(formatAnalysis(analysis));
		if (res.status === "clipboard") {
			setCopied(true);
			toast.success("Copied to clipboard.");
			setTimeout(() => setCopied(false), 1600);
		} else if (res.status === "fallback") {
			setCopied(true);
			toast.success("Copied to clipboard.");
			toast.info("Clipboard access blocked. Using fallback...");
			setTimeout(() => setCopied(false), 1600);
		} else {
			toast.error(`Copy failed: ${res.reason ?? "unknown reason"}`);
		}
	}

	async function handleCopyCode() {
		if (!analysis?.code) return;
		const res = await copyToClipboard(analysis.code);
		if (res.status === "clipboard") {
			toast.success("Copied to clipboard.");
		} else if (res.status === "fallback") {
			toast.success("Copied to clipboard.");
			toast.info("Clipboard access blocked. Using fallback...");
		} else {
			toast.error(`Copy failed: ${res.reason ?? "unknown reason"}`);
		}
	}

	return (
		<div className="w-full bg-[#0d0d10] rounded-[18px] border border-white/[0.08] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] overflow-hidden animate-results-fade">
			<div className="px-5 sm:px-7 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-3">
					<h2 className="text-lg font-semibold text-zinc-100 font-mono">
						Debug Session
					</h2>
					{!loading && (
						<div className="flex items-center gap-2">
							<div className="size-2 rounded-full bg-emerald-400 animate-green-dot" />
							<span className="text-sm text-zinc-400 font-mono">
								Completed in {elapsed.toFixed(1)}s
							</span>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<button
						type="button"
						disabled={loading || !analysis}
						onClick={handleCopyAll}
						className="w-full sm:w-auto h-10 px-4 rounded-[12px] bg-emerald-400 text-zinc-950 text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-emerald-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{copied ? (
							<IconCheck className="size-4" />
						) : (
							<IconCopy className="size-4" />
						)}
						{copied ? "Copied" : "Copy Analysis"}
					</button>
					<button
						type="button"
						onClick={onAnalyzeAnother}
						className="w-full sm:w-auto h-10 px-4 rounded-[13px] border border-white/10 text-sm text-zinc-300 inline-flex items-center justify-center gap-1.5 hover:bg-white/5 hover:border-white/20 transition-colors duration-200"
					>
						<IconRefresh className="size-4" />
						Analyze Another
					</button>
				</div>
			</div>

			<hr className="border-t border-white/[0.06] mx-0" />

			<div className="p-3 sm:p-5">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
					<div className="rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col bg-[#0a0a0c] animate-slide-left order-1">
						<div className="h-11 px-5 flex items-center justify-between border-b border-white/[0.06] shrink-0">
							<span className="text-sm font-medium text-zinc-300 font-mono">
								Screenshot
							</span>
							<button
								type="button"
								onClick={() => setZoom(true)}
								disabled={!blobURL}
								aria-label="Enlarge screenshot"
								className="size-8 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-40"
							>
								<IconMaximize className="size-4" />
							</button>
						</div>
						<div className="flex-1 bg-[#070708] relative min-h-0 m-3 rounded-2xl overflow-hidden h-[360px] lg:h-auto">
							{blobURL && (
								<button
									type="button"
									onClick={() => setZoom(true)}
									className="absolute inset-0 w-full h-full group"
									aria-label="Enlarge screenshot"
								>
									<Image
										src={blobURL}
										alt="Screenshot preview"
										fill
										unoptimized
										className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.01]"
									/>
								</button>
							)}
							{loading && (
								<div className="absolute inset-0 flex items-center justify-center bg-[#070708]/80 p-4">
									<LoadingSteps onDark />
								</div>
							)}
						</div>
					</div>

					<div className="rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col bg-[#0a0a0c] animate-slide-right order-2">
						<div className="h-11 px-5 flex items-center border-b border-white/[0.06] shrink-0">
							<span className="font-mono text-sm text-zinc-300">Analysis</span>
						</div>
						<div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollable-custom max-h-[560px]">
							{loading && (
								<>
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-3 animate-pulse"
										>
											<div className="flex items-center gap-2">
												<div className="size-2 rounded-full bg-white/10" />
												<div className="h-3.5 bg-white/10 rounded w-24" />
											</div>
											<div className="space-y-2">
												<div className="h-3 bg-white/5 rounded w-full" />
												<div className="h-3 bg-white/5 rounded w-4/5" />
											</div>
										</div>
									))}
								</>
							)}

							{!loading && analysis && (
								<>
									<ResultCard
										title="Problem"
										content={analysis.problem}
										icon="bug"
										color="red"
									/>
									<ResultCard
										title="Root Cause"
										content={analysis.rootCause}
										icon="search"
										color="orange"
									/>
									<ResultCard
										title="Explanation"
										content={analysis.explanation}
										icon="info"
										color="blue"
									/>
									<ResultCard
										title="Suggested Fix"
										content={analysis.fix}
										icon="wand"
										color="green"
									/>
									{analysis.code && (
										<div className="rounded-2xl border border-white/[0.08] overflow-hidden">
											<div className="px-4 h-10 flex items-center justify-between border-b border-white/10 bg-[#0b0b0d]">
												<span className="text-xs font-medium text-zinc-400 font-mono">
													Suggested Code
												</span>
												<button
													type="button"
													onClick={handleCopyCode}
													className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-300 transition-colors font-mono"
												>
													<IconCopy className="size-3.5" />
													Copy
												</button>
											</div>
											<pre className="bg-[#0b0b0d] text-[#e4e4e7] p-4 text-sm whitespace-pre-wrap break-words leading-relaxed font-mono">
												{analysis.code}
											</pre>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{zoom && blobURL && (
				<div
					className="fixed inset-0 z-[100] bg-black/85 p-4 flex items-center justify-center animate-overlay-in"
					role="dialog"
					aria-modal="true"
					aria-label="Screenshot enlarged"
					onClick={() => setZoom(false)}
				>
					<button
						type="button"
						aria-label="Close preview"
						onClick={() => setZoom(false)}
						className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
					>
						<IconX className="size-5" />
					</button>
					<div
						className="max-w-full max-h-full animate-zoom-in"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							src={blobURL}
							alt="Screenshot enlarged preview"
							width={1200}
							height={800}
							unoptimized
							className="max-w-full max-h-full object-contain rounded-xl"
						/>
					</div>
				</div>
			)}
		</div>
	);
}