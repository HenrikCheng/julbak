import { TimeSlotAPI } from "@/app/types";
import { useState } from "react";

type TimeSlotFieldProps = {
	startTime: string;
	calendar: TimeSlotAPI[];
	slot: string;
};

const TimeSlotField = ({ startTime, calendar, slot }: TimeSlotFieldProps) => {
	const matchedEntry = calendar.find(
		(entry) => entry.date === startTime && entry.position === slot,
	);
	const [value, setValue] = useState(matchedEntry?.name);

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
		</div>
	);
};

export default TimeSlotField;
