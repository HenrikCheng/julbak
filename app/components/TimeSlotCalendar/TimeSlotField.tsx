import { TimeSlotAPI } from "@/app/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Button from "../Button";

type TimeSlotFieldProps = {
	startTime: string;
	calendar: TimeSlotAPI[];
	slot: string;
	setCalendar: Dispatch<SetStateAction<never[]>>;
};

const TimeSlotField = ({
	startTime,
	calendar,
	slot,
	setCalendar,
}: TimeSlotFieldProps) => {
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		const matchedEntry = calendar.find(
			(entry) => entry.date === startTime && entry.position === slot,
		);
		setValue(matchedEntry?.name || "");
	}, [startTime, calendar, slot]);

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
		} catch (error: any) {
			console.error("Error:", error);
		}
	};

	const handleClear = async () => {
		try {
			// Find the entry to be deleted based on startTime and slot
			const entryToDelete = calendar.find(
				(entry) => entry.date === startTime && entry.position === slot,
			);

			if (!entryToDelete) {
				console.log("No entry found to clear.");
				return; // Exit if no entry found
			}

			const response = await fetch(`/api/calendar?_id=${entryToDelete._id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error || "Something went wrong");
			}

			// Re-fetch updated calendar data after deletion
			const updatedCalendarResponse = await fetch("/api/calendar");
			const updatedCalendar = await updatedCalendarResponse.json();
			if (updatedCalendarResponse.ok) {
				setCalendar(updatedCalendar);
			} else {
				throw new Error("Failed to re-fetch updated calendar data");
			}
		} catch (error: any) {
			console.error("Error:", error);
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

			<div className="mt-2">
				<Button onClick={handleSubmit}>Submit</Button>
				<Button color="transparent" onClick={handleClear}>
					Clear
				</Button>
			</div>
		</div>
	);
};

export default TimeSlotField;
