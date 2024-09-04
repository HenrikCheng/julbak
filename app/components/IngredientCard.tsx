import { useState } from "react";
import { Contributor, Ingredient } from "../api/types";
import Button from "./Button";
import Form from "./Form";
import IngredientPost from "./IngredientPost";

type IngredientCardProps = {
	ingredient: Ingredient;
	setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const IngredientCard = ({
	ingredient,
	setIngredients,
	setError,
}: IngredientCardProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<li className="m-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{ingredient.name}
				</h5>
				<div className="font-normal text-gray-700 dark:text-gray-400">
					<li>
						Desired amount: {ingredient.desired_amount} {ingredient.unit}
					</li>
					<li>
						Current amount: {ingredient.current_amount} {ingredient.unit}
					</li>
					<Button color="blue" onClick={() => setOpen(!open)}>
						{open ? "Stäng" : "Jag kan bidra"}
					</Button>
					{open && (
						<Form
							setIngredients={setIngredients}
							setError={setError}
							ingredientId={ingredient._id}
							setOpen={setOpen}
						/>
					)}
				</div>

				{ingredient.contributors?.length > 0 &&
					ingredient.contributors.map(
						(contributor: Contributor, index: number) => (
							<IngredientPost
								setIngredients={setIngredients}
								setError={setError}
								contributor={contributor}
								index={index}
								ingredient={ingredient}
								key={contributor.contributor}
							/>
						),
					)}
			</li>
		</>
	);
};

export default IngredientCard;
