import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
	title: "DevLens: AI Debugging for Developers",
	description:
		"Upload a coding screenshot and get a structured explanation and fix in seconds.",
	openGraph: {
		title: "DevLens: AI Debugging for Developers",
		description:
			"Upload a coding screenshot and get a structured explanation and fix in seconds.",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "DevLens: AI Debugging for Developers",
		description:
			"Upload a coding screenshot and get a structured explanation and fix in seconds.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<body className="bg-[#09090b] text-zinc-200 antialiased">
				{children}
				<Toaster richColors theme="dark" position="bottom-right" />
				<Analytics />
			</body>
		</html>
	);
}
