"use client";

import { useEffect, useRef, useState } from "react";
import {
	isSupportedImageType,
	type Analysis,
	type HistoryEntry,
	loadHistory,
	saveHistory,
} from "@/app/utils";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import UploadArea from "@/app/components/UploadArea";
import ResultsSection from "@/app/components/ResultsSection";
import HistorySection from "@/app/components/HistorySection";
import HowItWorks from "@/app/components/HowItWorks";
import WorksGreatWith from "@/app/components/WorksGreatWith";
import Footer from "@/app/components/Footer";

export default function Home() {
	const [isDraggingOver, setIsDraggingOver] = useState(false);
	const [blobURL, setBlobURL] = useState<string | null>(null);
	const [imageData, setImageData] = useState<string | null>(null);
	const [analysis, setAnalysis] = useState<Analysis | null>(null);
	const [loading, setLoading] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const startTime = useRef(0);

	useEffect(() => {
		setHistory(loadHistory());
	}, []);

	async function uploadImage(file?: File | Blob) {
		if (!file || loading) return;

		if (!isSupportedImageType(file.type)) {
			return toast.error(
				"Unsupported format. Only JPEG, PNG, GIF, and WEBP files are supported."
			);
		}

		if (file.size > 4.5 * 1024 * 1024) {
			return toast.error("Image too large, maximum file size is 4.5MB.");
		}

		const base64 = await toBase64(file);

		if (base64.length > 6_464_471) {
			return toast.error("Image too large, maximum file size is 4.5MB.");
		}

		setBlobURL(URL.createObjectURL(file));
		setImageData(base64);
		setAnalysis(null);
		setActiveId(null);
		setLoading(true);
		startTime.current = Date.now();

		try {
			const res = await fetch("/api", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(base64),
			});

			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || "Failed to process image");
			}

			const data = (await res.json()) as Analysis;

			saveToHistory(base64, data);
			setAnalysis(data);
			setElapsed((Date.now() - startTime.current) / 1000);
			resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		} catch (e) {
			const message = e instanceof Error ? e.message : "Something went wrong";
			toast.error(message);
			setBlobURL(null);
			setImageData(null);
		} finally {
			setLoading(false);
		}
	}

	function saveToHistory(thumbnail: string, data: Analysis) {
		const entry: HistoryEntry = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			timestamp: Date.now(),
			thumbnail,
			analysis: data,
		};
		const next = [entry, ...history].slice(0, 50);
		setHistory(next);
		setActiveId(entry.id);
		saveHistory(next);
	}

	function handleSelectHistory(entry: HistoryEntry) {
		setBlobURL(entry.thumbnail);
		setImageData(entry.thumbnail);
		setAnalysis(entry.analysis);
		setLoading(false);
		setActiveId(entry.id);
		resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	function handleClearHistory() {
		setHistory([]);
		setActiveId(null);
		saveHistory([]);
	}

	function handleAnalyzeAnother() {
		setBlobURL(null);
		setImageData(null);
		setAnalysis(null);
		setLoading(false);
		setActiveId(null);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function handleDragLeave() {
		setIsDraggingOver(false);
	}

	function handleDragOver(e: DragEvent) {
		setIsDraggingOver(true);
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
	}

	async function handleDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(false);
		const file = e.dataTransfer?.files?.[0];
		uploadImage(file);
	}

	async function handlePaste(e: ClipboardEvent) {
		const file = e.clipboardData?.files?.[0];
		uploadImage(file);
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		uploadImage(file);
	}

	useEffect(() => {
		addEventListener("paste", handlePaste);
		addEventListener("drop", handleDrop);
		addEventListener("dragover", handleDragOver);
		addEventListener("dragleave", handleDragLeave);
		return () => {
			removeEventListener("paste", handlePaste);
			removeEventListener("drop", handleDrop);
			removeEventListener("dragover", handleDragOver);
			removeEventListener("dragleave", handleDragLeave);
		};
	});

	return (
		<div id="top" className="min-h-screen bg-terminal flex flex-col">
			<Navbar />

			<main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
				<Hero />

				<UploadArea
					isDraggingOver={isDraggingOver}
					blobURL={blobURL}
					isLoading={loading}
					inputRef={inputRef}
					onClick={() => inputRef.current?.click()}
					onFileChange={handleInputChange}
				/>

				<div ref={resultsRef} className="mt-6">
					{(loading || analysis) && (
						<ResultsSection
							loading={loading}
							blobURL={blobURL}
							analysis={analysis}
							elapsed={elapsed}
							onAnalyzeAnother={handleAnalyzeAnother}
						/>
					)}
				</div>

				{history.length > 0 && (
					<div className="mt-6">
						<HistorySection
							entries={history}
							activeId={activeId}
							onSelect={handleSelectHistory}
							onClear={handleClearHistory}
						/>
					</div>
				)}

				<HowItWorks />
				<WorksGreatWith />
			</main>

			<Footer />
		</div>
	);
}

function toBase64(file: File | Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result !== "string") return;
			resolve(reader.result);
		};
		reader.onerror = (error) => reject(error);
	});
}