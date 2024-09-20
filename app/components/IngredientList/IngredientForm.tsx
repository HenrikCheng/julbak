import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Contributor, Ingredient } from "../../types";
import Button from "../Button";
import { useSession } from "next-auth/react";

type FormProps = {
	setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
	setError: Dispatch<SetStateAction<string | null>>;
	ingredientId: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
	buttonText: string;
	// ingredient: Ingredient;
	contributor?: Contributor;
};

const IngredientForm = ({
	setIngredients,
	setError,
	ingredientId,
	setOpen,
	contributor,
	buttonText,
}: // ingredient,
FormProps) => {
	const { data: session } = useSession();
	const [floatingName, setFloatingName] = useState(
		session?.user?.name || session?.user?.email || "",
	);
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
			className="max-w-md mx-auto mt-5"
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

				{/* <label
					htmlFor="default-range"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Antal: {floatingNumber} {ingredient?.unit}
				</label>
				<input
					id="default-range"
					type="range"
					min="1"
					max={ingredient?.desired_amount}
					step="1"
					className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-900"
					value={floatingNumber}
					onChange={(e) => setFloatingNumber(Number(e.target.value))}
				/> */}
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
			<Button
				disabled={!floatingNumber || !floatingName}
				type="submit"
				color={"blue"}
			>
				{buttonText}
			</Button>
		</form>
	);
};

export default IngredientForm;
