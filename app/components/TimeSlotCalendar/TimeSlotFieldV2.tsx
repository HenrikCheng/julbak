import { useState, useId, useEffect } from "react";
import Button from "../Button";
import { TimeSlot, TimeSlotAPI } from "@/app/types";

type TimeSlotFieldV2Props = {
	participantNumber: string;
	calendarAPI: TimeSlotAPI[];
	rowNumber: TimeSlot;
};

const TimeSlotFieldV2 = ({
	participantNumber,
	calendarAPI,
	rowNumber,
}: TimeSlotFieldV2Props) => {
	const [nameValue, setNameValue] = useState("");
	const [phoneValue, setPhoneValue] = useState("");

	const NameID = useId();
	const PhoneID = useId();

	const foundTimeSlot = calendarAPI.find(
		(time) =>
			time.date === rowNumber?.startTime && time.position === participantNumber,
	);

	const handleSubmit = async () => {
		const requestBody = {
			name: nameValue,
			phone: phoneValue,
			date: rowNumber.startTime,
			position: participantNumber,
		};

		try {
			const response = await fetch("/api/calendar", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error(`Failed to submit: ${response.statusText}`);
			}

			console.log("Time slot submitted successfully");
		} catch (error) {
			console.error("Error submitting time slot", error);
		}
	};

	const handleClear = async () => {
		if (!foundTimeSlot) {
			console.warn("No time slot to clear");
			return;
		}

		try {
			const response = await fetch(`/api/calendar?_id=${foundTimeSlot._id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to delete: ${response.statusText}`);
			}

			setNameValue("");
			setPhoneValue("");
			console.log("Time slot deleted successfully");
		} catch (error) {
			console.error("Error deleting time slot", error);
		}
	};

	useEffect(() => {
		if (foundTimeSlot) {
			setNameValue(foundTimeSlot.name);
			setPhoneValue(foundTimeSlot.phone || "");
		}
	}, [calendarAPI, rowNumber, participantNumber]);

	return (
		<div className="relative z-0 w-full mb-5 group">
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name={`floating_name_${NameID}`}
					id={`floating_name_${NameID}`}
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					value={nameValue}
					onChange={(e) => setNameValue(e.target.value)}
				/>
				<label
					htmlFor={`floating_name_${NameID}`}
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Namn
				</label>
			</div>
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="tel"
					name={`floating_phone_${PhoneID}`}
					id={`floating_phone_${PhoneID}`}
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required
					value={phoneValue}
					onChange={(e) => setPhoneValue(e.target.value)}
				/>
				<label
					htmlFor={`floating_phone_${PhoneID}`}
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Telefon
				</label>
			</div>

			<div className="mt-2">
				<Button onClick={handleSubmit}>Submit</Button>
				<Button onClick={handleClear} color="transparent">
					Clear
				</Button>
			</div>
		</div>
	);
};

export default TimeSlotFieldV2;
