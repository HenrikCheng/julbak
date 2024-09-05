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
	let sum = ingredient.contributors.reduce(
		(total, contributor) => total + contributor.amount,
		0,
	);
	const isCompleted = sum >= ingredient.desired_amount;

	return (
		<li
			className={`m-4 block max-w-sm p-6 bg-white border rounded-lg shadow dark:bg-gray-800 ${
				isCompleted
					? "border-green-500 dark:border-green-700"
					: "border-red-200 dark:border-red-700"
			}`}
		>
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				<span
					className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${
						isCompleted ? "line-through" : ""
					}`}
				>
					{ingredient.name}
				</span>
				{isCompleted && <span className="ml-2 text-green-500">Klar</span>}
			</h5>
			<ul className="font-normal text-gray-700 dark:text-gray-400 mb-2">
				<li>
					Desired amount: {ingredient.desired_amount} {ingredient.unit}
				</li>
				<li>
					Current amount: {sum} {ingredient.unit}{" "}
				</li>
			</ul>
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

			{ingredient.contributors?.length > 0 &&
				ingredient.contributors.map(
					(contributor: Contributor, index: number) => (
						<IngredientPost
							setIngredients={setIngredients}
							setError={setError}
							contributor={contributor}
							index={index}
							ingredient={ingredient}
							key={`${contributor.contributor}_${contributor.date}`}
						/>
					),
				)}
		</li>
	);
};

export default IngredientCard;
