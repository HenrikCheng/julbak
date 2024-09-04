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
		<li className="border border-solid border-gray-500 rounded-md my-4">
			<div className="p-3 mb-4">
				<h2>{ingredient.name}</h2>
				<ul>
					<li>
						Desired amount: {ingredient.desired_amount} {ingredient.unit}
					</li>
					<li>
						Current amount: {ingredient.current_amount} {ingredient.unit}
					</li>
				</ul>
				<Button color="blue" onClick={() => setOpen(!open)}>
					Jag kan bidra
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
	);
};

export default IngredientCard;
