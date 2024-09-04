import Jumbotron from "./components/Jumbotron";
import IngredientList from "./components/IngredientList";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-start">
			<Jumbotron />
			<IngredientList />
		</main>
	);
}
