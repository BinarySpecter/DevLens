import { IconUpload, IconKeyboard } from "@tabler/icons-react";
import Image from "next/image";
import clsx from "clsx";
import LoadingSteps from "./LoadingSteps";

interface UploadAreaProps {
	isDraggingOver: boolean;
	blobURL: string | null;
	isLoading: boolean;
	inputRef: React.RefObject<HTMLInputElement | null>;
	onClick: () => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadArea({
	isDraggingOver,
	blobURL,
	isLoading,
	inputRef,
	onClick,
	onFileChange,
}: UploadAreaProps) {
	const hasImage = Boolean(blobURL);

	return (
		<div
			role="button"
			tabIndex={0}
			aria-label="Upload a coding screenshot"
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
			className={clsx(
				"relative w-full rounded-[18px] border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden group",
				isDraggingOver
					? "border-emerald-400/70 bg-emerald-400/[0.06] scale-[1.01] shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
					: "border-zinc-700/70 bg-[#0d0d10] hover:border-zinc-500 hover:bg-[#0f0f13]",
			)}
			onClick={onClick}
		>
			{hasImage && (
				<div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px] bg-[#0a0a0c]">
					<Image
						src={blobURL!}
						alt="Uploaded screenshot"
						fill
						unoptimized
						priority
						className="object-contain p-2"
					/>
				</div>
			)}

			{isLoading ? (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090b]/88 backdrop-blur-[2px] px-6 py-14">
					<LoadingSteps onDark />
				</div>
			) : (
				<div
					className={clsx(
						"flex flex-col items-center justify-center px-6 transition-opacity duration-200",
						hasImage
							? "absolute inset-0 py-4 opacity-0 group-hover:opacity-100"
							: "py-16 sm:py-20",
					)}
				>
					<div className="size-14 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-emerald-400/40 transition-all duration-200">
						<IconUpload className="size-6 text-emerald-300" />
					</div>

					<p className="text-base font-medium text-zinc-100 mb-2 text-center">
						{hasImage ? "Replace screenshot" : "Drop a coding screenshot here"}
					</p>

					<p className="text-sm text-zinc-500 mb-5 text-center font-mono">
						JPEG, PNG, GIF, WEBP · Max 4.5 MB
					</p>

					<div className="flex flex-col items-center gap-3 sm:flex-row">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								inputRef.current?.click();
							}}
							className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-10 text-sm font-semibold text-zinc-950 bg-emerald-400 rounded-full hover:bg-emerald-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
						>
							<IconUpload className="size-4" />
							Choose file
						</button>
						<span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
							<IconKeyboard className="size-3.5" />
							or paste with{" "}
							<kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[11px] text-zinc-400">
								Ctrl + V
							</kbd>
						</span>
					</div>
				</div>
			)}

			<input
				type="file"
				className="hidden"
				ref={inputRef}
				onChange={onFileChange}
				accept="image/jpeg, image/png, image/gif, image/webp"
			/>
		</div>
	);
}