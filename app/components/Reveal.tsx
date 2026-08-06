"use client";

import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
	const reduce = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reduce ? false : { opacity: 0, y: 22 }}
			whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			{children}
		</motion.div>
	);
}