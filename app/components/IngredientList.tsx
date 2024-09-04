"use client";

import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import { Ingredient } from "../api/types";
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
		<div className="flex w-full" id="Ingredients">
			<ul className="min-w-max">
				{ingredients.map((ingredient) => {
					return (
						<IngredientCard
							ingredient={ingredient}
							setIngredients={setIngredients}
							setError={setError}
							key={ingredient._id}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default IngredientList;
