import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pepparkaksbaket 2024 - Stöd barnens aktiviteter",
	description:
		"Var med på vårt årliga pepparkaksbak! Intäkterna går till barnens aktiviteter. Hjälp till med baket eller bidra med ingredienser. Läs mer här!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
