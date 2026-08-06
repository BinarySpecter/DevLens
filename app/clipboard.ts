export type CopyStatus = "clipboard" | "fallback" | "failed";

export interface CopyResult {
	status: CopyStatus;
	reason?: string;
}

function isSecureContext(): boolean {
	return typeof window !== "undefined" && window.isSecureContext === true;
}

function hasClipboardAPI(): boolean {
	return (
		typeof navigator !== "undefined" &&
		typeof navigator.clipboard?.writeText === "function"
	);
}

function execCommandCopy(text: string): boolean {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.top = "-9999px";
	textarea.style.left = "-9999px";
	textarea.style.opacity = "0";
	textarea.setAttribute("aria-hidden", "true");
	document.body.appendChild(textarea);
	textarea.focus();
	textarea.select();
	textarea.setSelectionRange(0, textarea.value.length);

	let ok = false;
	try {
		ok = document.execCommand("copy");
	} catch (err) {
		console.error("[DevLens] execCommand('copy') threw:", err);
	} finally {
		document.body.removeChild(textarea);
	}
	return ok;
}

/**
 * Robust cross-browser copy helper.
 *
 * 1. Uses navigator.clipboard.writeText() when the Clipboard API is
 *    available (secure contexts: HTTPS and localhost).
 * 2. Falls back to the classic hidden-textarea + execCommand("copy")
 *    approach when the Clipboard API is missing or rejects.
 * 3. Never fails silently: real errors are logged to the console and the
 *    reason is returned so the caller can surface it to the user.
 */
export async function copyToClipboard(text: string): Promise<CopyResult> {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return {
			status: "failed",
			reason: "Copy is only available in the browser.",
		};
	}

	if (!isSecureContext()) {
		console.warn(
			"[DevLens] This page is not a secure context (window.isSecureContext === false). " +
				"navigator.clipboard is only available on HTTPS or localhost, so it cannot be used here. " +
				"Falling back to document.execCommand('copy')."
		);
	}

	if (hasClipboardAPI()) {
		try {
			await navigator.clipboard.writeText(text);
			return { status: "clipboard" };
		} catch (err) {
			console.error(
				"[DevLens] navigator.clipboard.writeText() failed:",
				err
			);
		}
	}

	if (typeof document.execCommand === "function") {
		if (execCommandCopy(text)) {
			return { status: "fallback" };
		}
		return {
			status: "failed",
			reason: "document.execCommand('copy') returned false.",
		};
	}

	return {
		status: "failed",
		reason: "No clipboard method is available in this browser.",
	};
}