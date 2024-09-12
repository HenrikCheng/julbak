"use client";

import { useEffect, useState } from "react";
import { TIME_SLOTS } from "../api/constants";
import Skeleton from "./Skeleton";

type TimeSlotAPI = {
	_id: string;
	name: string;
	date: string;
	position: string;
};

const TimeSlotCalendar = () => {
	const [calendar, setCalendar] = useState([]);
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

	let saturday: TimeSlotAPI[] = [];
	let sunday: TimeSlotAPI[] = [];

	calendar.forEach((slot: TimeSlotAPI) => {
		const slotDate = new Date(slot.date);

		if (slotDate.toISOString().startsWith("2024-12-14")) {
			saturday.push(slot);
		}

		if (slotDate.toISOString().startsWith("2024-12-15")) {
			sunday.push(slot);
		}
	});

	return (
		<>
			<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 flex-shrink-0">
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">Lördag 14/12</h2>
					{loading ? (
						<div className="min-w-96">
							<Skeleton />
							<Skeleton />
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</div>
					) : (
						<TimeSlotDay calendar={saturday} />
					)}
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">Söndag 15/12</h2>
					{loading ? (
						<div className="min-w-96">
							<Skeleton />
							<Skeleton />
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</div>
					) : (
						<TimeSlotDay calendar={sunday} />
					)}
				</div>
			</div>
		</>
	);
};

const TimeSlotDay = ({ calendar }: { calendar: TimeSlotAPI[] }) => {
	return (
		<div className="grid grid-cols-1 gap-2">
			<p>{JSON.stringify(calendar, null, 2)}</p>
			{TIME_SLOTS.map((slot) => (
				<div key={slot.startTime}>
					<div className="grid gap-4">
						<div className="flex flex-col gap-1">
							<span className="font-medium">{slot.duration}</span>
							<span className="text-sm text-muted-foreground">
								{slot.label}
							</span>
						</div>
						<form className="flex items-center justify-end gap-2">
							<TimeSlotField label="Deltagare 1" startTime={slot.startTime} />
							<TimeSlotField label="Deltagare 2" startTime={slot.startTime} />
						</form>
					</div>
				</div>
			))}
		</div>
	);
};

const TimeSlotField = ({
	label,
	startTime,
}: {
	label: string;
	startTime: string;
}) => {
	return (
		<div className="relative z-0 w-full mb-5 group">
			<input
				type="text"
				name={startTime}
				id={startTime}
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				required
			/>
			<label
				htmlFor={startTime}
				className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
			>
				{label}
			</label>
		</div>
	);
};

export default TimeSlotCalendar;
