"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

const steps = [
	"Uploading screenshot...",
	"Analyzing code...",
	"Finding root cause...",
	"Generating explanation...",
	"Preparing suggested fix...",
];

const STEP_DURATION = 1400;

interface LoadingStepsProps {
	onDark?: boolean;
}

export default function LoadingSteps({ onDark = false }: LoadingStepsProps) {
	const [step, setStep] = useState(0);

	useEffect(() => {
		setStep(0);
		const interval = setInterval(() => {
			setStep((s) => Math.min(s + 1, steps.length - 1));
		}, STEP_DURATION);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full max-w-sm mx-auto flex flex-col gap-3.5 font-mono">
			{steps.map((label, i) => {
				const done = i < step;
				const active = i === step;
				return (
					<div
						key={label}
						className={clsx(
							"flex items-center gap-3 text-sm transition-all duration-300",
							done && (onDark ? "text-zinc-500" : "text-zinc-400"),
							active && "text-emerald-300 font-medium",
							!done && !active && !onDark && "text-zinc-600",
							!done && !active && onDark && "text-zinc-700",
						)}
					>
						{done ? (
							<IconCheck className="size-4 shrink-0 text-emerald-400" />
						) : active ? (
							<IconLoader2 className="size-4 shrink-0 text-emerald-400 animate-spin" />
						) : (
							<div className="size-4 shrink-0 rounded-full border border-zinc-700" />
						)}
						{label}
					</div>
				);
			})}
		</div>
	);
}