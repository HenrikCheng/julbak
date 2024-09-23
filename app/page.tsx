"use client";

import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Jumbotron from "./components/Jumbotron";
import IngredientList from "./components/IngredientList";
import Footer from "./components/Footer";
import TimeSlotCalendar from "./components/TimeSlotCalendar";
import Layout from "./components/Layout";

const App = () => {
	const { data: session } = useSession();

	return (
		<Layout>
			<Jumbotron
				session={session || undefined}
				signIn={signIn}
				signOut={signOut}
			/>
			<div className="flex flex-row-reverse flex-wrap gap-8 justify-center py-6 sm:py-8 md:py-10">
				<TimeSlotCalendar session={session || undefined} />
				<IngredientList />
			</div>
		</Layout>
	);
};

export default function Home() {
	return (
		<SessionProvider>
			<App />
		</SessionProvider>
	);
}
