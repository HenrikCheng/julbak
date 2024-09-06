import Jumbotron from "./components/Jumbotron";
import IngredientList from "./components/IngredientList";
import Footer from "./components/Footer";
import TimeSlotCalendar from "./components/TimeSlotCalendar";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center">
			<Jumbotron />
			<div className="flex flex-row flex-wrap">
				<IngredientList />
				<TimeSlotCalendar />
			</div>
			<Footer />
		</main>
	);
}
