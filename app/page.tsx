"use client";

import { SessionProvider } from "next-auth/react";
import App from "./App";

export default function Home() {
	return (
		<SessionProvider>
			<App />
		</SessionProvider>
	);
}
