"use client";

import React, { useEffect, useState } from "react";

// Define the type for your ingredient data
type Ingredient = {
	_id: string; // Assuming you have MongoDB ObjectId
	name: string;
	desired_amount: number;
	current_amount: number;
	unit: string;
};

const IngredientList: React.FC = () => {
	// State to store ingredients, loading status, and errors
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await fetch("/api/christmas"); // This is your API route
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
				{ingredients.map((ingredient) => (
					<li key={ingredient._id}>
						<h2>{ingredient.name}</h2>
						<ul>
							<li>
								Desired amount: {ingredient.desired_amount} {ingredient.unit}
							</li>
							<li>
								Current amount: {ingredient.current_amount} {ingredient.unit}
							</li>
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default IngredientList;
