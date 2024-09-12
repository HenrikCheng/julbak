"use client";

import React, { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import { Ingredient } from "../../api/types";
import IngredientCard from "./IngredientCard";

const IngredientList: React.FC = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);
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

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<ul id="Ingredients" className="py-6 sm:py-8 md:py-10">
			<h2 className="text-2xl font-semibold">Ingredienser</h2>
			{loading ? (
				<div className="grid grid-flow-row grid-cols-1 gap-2">
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				ingredients.map((ingredient) => {
					return (
						<IngredientCard
							ingredient={ingredient}
							setIngredients={setIngredients}
							setError={setError}
							key={ingredient._id}
						/>
					);
				})
			)}
		</ul>
	);
};

export default IngredientList;
