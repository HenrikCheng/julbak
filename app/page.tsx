import Jumbotron from "./components/Jumbotron";
import IngredientList from "./components/IngredientList";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-start">
			<Jumbotron />
			<IngredientList />
			<Footer />
		</main>
	);
}
