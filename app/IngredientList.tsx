"use client";

import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Skeleton from "./components/Skeleton";

type Contributor = {
	contributor: string;
	amount: Number;
	note?: string;
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
		<ul>
			{ingredients.map((ingredient) => {
				console.log(
					"🚀 ~ {ingredients.map ~ ingredient.contributors.length:",
					ingredient.contributors[0],
				);
				return (
					<li
						key={ingredient._id}
						className="border border-solid border-gray-500 rounded-md my-4"
					>
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
							<Button color="blue" onClick={() => console.log("click change")}>
								Jag kan bidra
							</Button>
						</div>
						{ingredient.contributors?.length > 0 &&
							ingredient.contributors.map((contributor, index) => (
								<div
									key={contributor.contributor}
									className={`p-2 rounded-b-md ${
										index % 2 === 0 ? "bg-slate-800" : "bg-slate-600"
									}`}
								>
									<p>namn: {contributor.contributor}</p>
									<p>
										antal: {contributor.amount.toString()} {ingredient.unit}
									</p>
									<p>anteckningar: {contributor.note}</p>
									<div className="flex justify-between">
										<Button
											color="blue"
											onClick={() => console.log("click change")}
										>
											Ändra
										</Button>
										<Button
											color="red"
											onClick={() => console.log("click delete")}
										>
											Ta bort
										</Button>
									</div>
								</div>
							))}
					</li>
				);
			})}
		</ul>
	);
};

export default IngredientList;
