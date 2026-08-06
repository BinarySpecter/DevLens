import { z } from "zod";

type SupportedImageTypes =
	| "image/jpeg"
	| "image/png"
	| "image/gif"
	| "image/webp";

export function isSupportedImageType(
	type: string
): type is SupportedImageTypes {
	return ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(type);
}

export const schema = z.object({
	problem: z
		.string()
		.describe(
			"A concise one-sentence description of the problem shown in the code, terminal, or error screenshot."
		),
	rootCause: z
		.string()
		.describe(
			"The root cause of the problem. Explain what is actually going wrong and why, referencing the code where useful."
		),
	explanation: z
		.string()
		.describe(
			"A clear, detailed explanation of why the error or behavior happens, written for a developer to understand quickly."
		),
	fix: z
		.string()
		.describe(
			"Step-by-step actionable instructions to fix the problem, including any commands to run or files to edit."
		),
	code: z
		.string()
		.optional()
		.describe(
			"The corrected code snippet or exact commands to run, formatted as plain text. Omit if not applicable."
		),
});

export type Analysis = z.infer<typeof schema>;

export const HISTORY_STORAGE_KEY = "devlens-history";

export interface HistoryEntry {
	id: string;
	timestamp: number;
	thumbnail: string;
	analysis: Analysis;
}

export function loadHistory(): HistoryEntry[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function saveHistory(entries: HistoryEntry[]): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
	} catch {
		// storage unavailable (e.g. private mode) — ignore
	}
}