import { useState } from "react";
import { Ingredient } from "../api/utils/types";
import Button from "./Button";
import Form from "./Form";

type SingleIngredientProps = {
	setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	contributor: any;
	index: number;
	ingredient: any;
};

const SingleIngredient = ({
	index,
	contributor,
	ingredient,
	setIngredients,
	setError,
}: SingleIngredientProps) => {
	const [open, setOpen] = useState(false);

	const handleDeleteContributor = async (
		ingredientId: string,
		contributorName: string,
	) => {
		try {
			const response = await fetch(
				`/api/christmas?id=${ingredientId}&contributorName=${encodeURIComponent(
					contributorName,
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
									(contributor) => contributor.contributor !== contributorName,
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
			className={`p-2 rounded-b-md ${
				index % 2 === 0 ? "bg-slate-800" : "bg-slate-600"
			}`}
		>
			<p>namn: {contributor.contributor}</p>
			<p>
				antal: {contributor.amount?.toString() || 0} {ingredient.unit}
			</p>
			<p>anteckningar: {contributor.note}</p>
			<div className="flex justify-between">
				<Button color="blue" onClick={() => setOpen(!open)}>
					Ändra
				</Button>
				<Button
					color="red"
					onClick={() =>
						handleDeleteContributor(ingredient._id, contributor.contributor)
					}
				>
					Ta bort
				</Button>
			</div>
			{open && (
				<Form
					setIngredients={setIngredients}
					setError={setError}
					ingredientId={ingredient._id}
				/>
			)}
		</div>
	);
};

export default SingleIngredient;
