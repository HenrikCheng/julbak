"use client";

import { useEffect, useState } from "react";
import { TIME_SLOTS } from "../api/constants/timeslots";

type Timeslot = {
	duration: string;
	label: string;
	startTime: string;
};

const TimeSlotCalendar = () => {
	return (
		<div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 flex-shrink-0">
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Lördag 14/12</h2>
				<TimeSlotDay />
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Söndag 15/12</h2>
				<TimeSlotDay />
			</div>
		</div>
	);
};

const TimeSlotDay = () => {
	const [calendar, setCalendar] = useState<Timeslot[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/calendar");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setCalendar(data);
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

	return (
		<div className="grid grid-cols-1 gap-2">
			{JSON.stringify(calendar, null, 2)}
			{TIME_SLOTS.map((slot) => (
				<div key={`${slot.duration}_${slot.label}`}>
					<div className="grid gap-4">
						<div className="flex flex-col gap-1">
							<span className="font-medium">{slot.duration}</span>
							<span className="text-sm text-muted-foreground">
								{slot.label}
							</span>
						</div>
						<form className="flex items-center justify-end gap-2">
							<div className="relative z-0 w-full mb-5 group">
								<input
									type="text"
									name="floating_participant_1"
									id="floating_participant_1"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required
								/>
								<label
									htmlFor="floating_participant_1"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Deltagare 1
								</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input
									type="text"
									name="floating_participant_2"
									id="floating_participant_2"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required
								/>
								<label
									htmlFor="floating_participant_2"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Deltagare 2
								</label>
							</div>
						</form>
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeSlotCalendar;
