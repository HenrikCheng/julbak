"use client";

import { Number } from "mongoose";
import React, { useEffect, useState } from "react";

type Contributor = {
	contributor: string;
	amount: Number;
	note: string;
};

type Ingredient = {
	_id: string;
	name: string;
	desired_amount: number;
	current_amount: number;
	unit: string;
	contributors: Contributor[];
};

const IngredientList: React.FC = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

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
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1>Christmas Bake Ingredients</h1>
			<ul>
				{ingredients.map((ingredient) => {
					console.log(
						"🚀 ~ {ingredients.map ~ ingredient.contributors.length:",
						ingredient.contributors[0],
					);
					return (
						<li
							key={ingredient._id}
							className="border border-solid border-gray-500 rounded-md my-4 p-3"
						>
							<div>
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
							</div>
							{ingredient.contributors?.length > 0 && (
								<div className="bg-gray-500 mt-4 p-2 rounded-md">
									{ingredient.contributors.map((contributor) => (
										<div key={contributor.contributor}>
											<p>namn: {contributor.contributor}</p>
											<p>
												antal: {contributor.amount.toString()} {ingredient.unit}
											</p>
											<p>anteckningar: {contributor.note}</p>
										</div>
									))}
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default IngredientList;
