import IngredientList from "./IngredientList";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-start">
			<h1>Christmas Bake Ingredients</h1>
			<IngredientList />
		</main>
	);
}
