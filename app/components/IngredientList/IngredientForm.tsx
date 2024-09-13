import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Contributor, Ingredient } from "../../types";

type FormProps = {
	setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
	setError: Dispatch<SetStateAction<string | null>>;
	ingredientId: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
	buttonText: string;
	contributor?: Contributor;
};

const IngredientForm = ({
	setIngredients,
	setError,
	ingredientId,
	setOpen,
	contributor,
	buttonText,
}: FormProps) => {
	const [floatingName, setFloatingName] = useState("");
	const [floatingNotes, setFloatingNotes] = useState("");
	const [floatingNumber, setFloatingNumber] = useState(0);

	// Set initial values if contributor is provided
	useEffect(() => {
		if (contributor) {
			setFloatingName(contributor.contributor || "");
			setFloatingNotes(contributor.note || "");
			setFloatingNumber(contributor.amount || 0);
		}
	}, [contributor]);

	const handleCreateContributor = async (
		ingredientId: string,
		floatingName: string,
		floatingNotes: string,
		floatingNumber: number,
	) => {
		const currentDate = new Date().toISOString();

		const newContributor = {
			contributor: floatingName,
			amount: floatingNumber,
			note: floatingNotes,
			date: currentDate,
		};

		try {
			if (contributor) {
				// Update existing contributor
				const response = await fetch(
					`/api/christmas?id=${ingredientId}&contributorDate=${contributor.date}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newContributor), // Update with the new contributor data
					},
				);

				if (!response.ok) {
					throw new Error(
						`Failed to update contributor: ${response.statusText}`,
					);
				}

				setIngredients((prevIngredients) =>
					prevIngredients.map((ingredient) =>
						ingredient._id === ingredientId
							? {
									...ingredient,
									contributors: ingredient.contributors.map((item) =>
										item.date === contributor.date ? newContributor : item,
									),
							  }
							: ingredient,
					),
				);
			} else {
				// Add new contributor
				const response = await fetch(`/api/christmas?id=${ingredientId}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						$push: {
							contributors: newContributor,
						},
					}),
				});

				if (!response.ok) {
					throw new Error(
						`Failed to create contributor: ${response.statusText}`,
					);
				}

				setIngredients((prevIngredients) =>
					prevIngredients.map((ingredient) =>
						ingredient._id === ingredientId
							? {
									...ingredient,
									contributors: [...ingredient.contributors, newContributor],
							  }
							: ingredient,
					),
				);
			}

			// Refetch ingredients after creation
			const updatedIngredientsResponse = await fetch("/api/christmas");
			if (updatedIngredientsResponse.ok) {
				const updatedIngredients = await updatedIngredientsResponse.json();
				setIngredients(updatedIngredients);
			} else {
				console.error("Failed to refetch ingredients");
			}
			setOpen(false);
		} catch (error) {
			console.error("Error creating/updating contributor:", error);
			setError("Failed to create or update contributor");
		}
	};

	return (
		<form
			className="max-w-md mx-auto"
			onSubmit={(e) => {
				e.preventDefault();
				handleCreateContributor(
					ingredientId,
					floatingName,
					floatingNotes,
					floatingNumber,
				);
			}}
		>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="floating_name"
					id="floating_name"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					value={floatingName}
					onChange={(e) => setFloatingName(e.target.value)}
				/>
				<label
					htmlFor="floating_name"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Namn
				</label>
			</div>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="number"
					name="floating_number"
					id="floating_number"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					value={floatingNumber}
					onChange={(e) => setFloatingNumber(Number(e.target.value))}
				/>
				<label
					htmlFor="floating_number"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Antal
				</label>
			</div>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="floating_notes"
					id="floating_notes"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					value={floatingNotes}
					onChange={(e) => setFloatingNotes(e.target.value)}
				/>
				<label
					htmlFor="floating_notes"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Anteckningar
				</label>
			</div>
			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{buttonText}
			</button>
		</form>
	);
};

export default IngredientForm;
