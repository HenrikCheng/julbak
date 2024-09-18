import Jumbotron from "./components/Jumbotron";
import IngredientList from "./components/IngredientList";
import Footer from "./components/Footer";
import TimeSlotCalendar from "./components/TimeSlotCalendar";
import { signIn, signOut, useSession } from "next-auth/react";

const App = () => {
	const { data: session } = useSession();

	return (
		<main className="flex min-h-screen flex-col items-center">
			<Jumbotron
				session={session || undefined}
				signIn={signIn}
				signOut={signOut}
			/>
			<div className="flex flex-row-reverse flex-wrap gap-8 justify-center">
				<TimeSlotCalendar />
				<IngredientList />
			</div>
			<Footer />
		</main>
	);
};

export default App;
