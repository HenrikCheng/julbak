import { useState } from "react";
import { Contributor, Ingredient } from "../api/types";
import Button from "./Button";
import Form from "./Form";

type IngredientPostProps = {
	setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	contributor: Contributor;
	index: number;
	ingredient: Ingredient;
};

const IngredientPost = ({
	index,
	contributor,
	ingredient,
	setIngredients,
	setError,
}: IngredientPostProps) => {
	const [open, setOpen] = useState(false);

	const handleDeleteContributor = async (
		ingredientId: string,
		contributorDate: string, // Use date instead of name
	) => {
		try {
			const response = await fetch(
				`/api/christmas?id=${ingredientId}&contributorDate=${encodeURIComponent(
					contributorDate,
				)}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				throw new Error(`Failed to delete contributor: ${response.statusText}`);
			}

			// Update state to remove the deleted contributor from the UI
			setIngredients((prevIngredients) =>
				prevIngredients.map((ingredient) =>
					ingredient._id === ingredientId
						? {
								...ingredient,
								contributors: ingredient.contributors.filter(
									(contributor) => contributor.date !== contributorDate, // Match by date
								),
						  }
						: ingredient,
				),
			);
		} catch (error) {
			console.error("Error deleting contributor:", error);
			setError("Failed to delete contributor");
		}
	};

	return (
		<div
			className={`my-2 p-2 rounded-b-md ${
				index % 2 === 0 ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
			}`}
		>
			<p>
				{contributor.contributor}, {contributor.amount?.toString() || 0}{" "}
				{ingredient.unit}.
			</p>
			{contributor.note && <p>anteckningar: {contributor.note}</p>}
			<div className="flex justify-between">
				<Button color="blue" onClick={() => setOpen(!open)}>
					{open ? "Stäng" : "Ändra"}
				</Button>
				<Button
					color="red"
					onClick={() =>
						handleDeleteContributor(ingredient._id, contributor.date)
					}
				>
					Ta bort
				</Button>
			</div>
			{open && (
				<div className="mt-10">
					<Form
						setIngredients={setIngredients}
						setError={setError}
						ingredientId={ingredient._id}
						setOpen={setOpen}
						contributor={contributor}
					/>
				</div>
			)}
		</div>
	);
};

export default IngredientPost;
