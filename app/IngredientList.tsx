"use client";

import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Skeleton from "./components/Skeleton";
import Form from "./components/Form";

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

	const handleDeleteContributor = async (
		ingredientId: string,
		contributorName: string,
	) => {
		try {
			const response = await fetch(
				`/api/christmas?id=${ingredientId}&contributorName=${encodeURIComponent(
					contributorName,
				)}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				throw new Error(`Failed to delete contributor: ${response.statusText}`);
			}

			// Update state to remove the deleted contributor from the UI
			setIngredients((prevIngredients) =>
				prevIngredients.map((ingredient) =>
					ingredient._id === ingredientId
						? {
								...ingredient,
								contributors: ingredient.contributors.filter(
									(contributor) => contributor.contributor !== contributorName,
								),
						  }
						: ingredient,
				),
			);
		} catch (error) {
			console.error("Error deleting contributor:", error);
			setError("Failed to delete contributor");
		}
	};

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
			<ul>
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
								<Button
									color="blue"
									onClick={() => console.log("click change")}
								>
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
												onClick={() =>
													handleDeleteContributor(
														ingredient._id,
														contributor.contributor,
													)
												}
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
			<div className="flex-auto">
				<Form />
			</div>
		</div>
	);
};

export default IngredientList;
