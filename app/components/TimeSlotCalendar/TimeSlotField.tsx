import { TimeSlotAPI } from "@/app/types";
import { useState, useEffect } from "react";

type TimeSlotFieldProps = {
	startTime: string;
	calendar: TimeSlotAPI[];
	slot: string;
};

const TimeSlotField = ({ startTime, calendar, slot }: TimeSlotFieldProps) => {
	const [value, setValue] = useState<string>("");
	const [response, setResponse] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const matchedEntry = calendar.find(
			(entry) => entry.date === startTime && entry.position === slot,
		);
		setValue(matchedEntry?.name || ""); // Fallback to an empty string if no match
	}, [startTime, calendar, slot]);

	// Function to handle form submission
	const handleSubmit = async () => {
		try {
			const response = await fetch("/api/calendar", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: value,
					date: startTime,
					position: slot,
				}),
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error || "Something went wrong");
			}
			setResponse(result);
		} catch (err: any) {
			console.error("Error:", err);
			setError(err.message);
		}
	};

	return (
		<div className="relative z-0 w-full mb-5 group">
			<input
				type="text"
				name={startTime}
				id={startTime}
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<label
				htmlFor={startTime}
				className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
			>
				{`Deltagare ${slot}`}
			</label>

			<button type="button" onClick={handleSubmit}>
				Submit
			</button>

			{response && <div className="mt-2 text-green-500">Success!</div>}
			{error && <div className="mt-2 text-red-500">Error: {error}</div>}
		</div>
	);
};

export default TimeSlotField;
