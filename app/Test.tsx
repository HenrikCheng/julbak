"use client";

import { AnyArray } from "mongoose";
import React, { useEffect, useState } from "react";

function Test() {
	const [ingredients, setIngredients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await fetch("/api/christmas"); // This is your API route
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setIngredients(data);
			} catch (e: any) {
				setError(e.message);
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
				{ingredients.map((ingredient: any, index) => {
					console.log("🚀 ~ {ingredients.map ~ ingredient:", ingredient);
					return (
						<ul key={`${ingredient.name}_${index}`}>
							<li>Name: {ingredient.name}</li>
							<li>
								Desired amount: {ingredient.desired_amount} {ingredient.unit}
							</li>
							<li>
								Current amount: {ingredient.current_amount} {ingredient.unit}
							</li>
						</ul>
					);
				})}
			</ul>
		</div>
	);
}

export default Test;
