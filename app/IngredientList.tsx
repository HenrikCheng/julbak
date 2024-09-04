"use client";

import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Skeleton from "./components/Skeleton";
import SingleIngredient from "./components/SingleIngredient";
import Form from "./components/Form";
import { Ingredient } from "./api/types";

const IngredientList: React.FC = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/christmas");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: Ingredient[] = await response.json();
				setIngredients(data);
			} catch (e) {
				if (e instanceof Error) {
					setError(e.message);
				} else {
					setError("An unexpected error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="grid grid-flow-row grid-cols-1 gap-8">
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="flex w-full">
			<ul className="min-w-max">
				{ingredients.map((ingredient) => {
					return (
						<li
							key={ingredient._id}
							className="border border-solid border-gray-500 rounded-md my-4"
						>
							<div className="p-3 mb-4">
								<h2>{ingredient.name}</h2>
								<ul>
									<li>
										Desired amount: {ingredient.desired_amount}{" "}
										{ingredient.unit}
									</li>
									<li>
										Current amount: {ingredient.current_amount}{" "}
										{ingredient.unit}
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
									/>
								)}
							</div>
							{ingredient.contributors?.length > 0 &&
								ingredient.contributors.map((contributor, index) => (
									<SingleIngredient
										setIngredients={setIngredients}
										setError={setError}
										contributor={contributor}
										index={index}
										ingredient={ingredient}
										key={contributor.contributor}
									/>
								))}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default IngredientList;
