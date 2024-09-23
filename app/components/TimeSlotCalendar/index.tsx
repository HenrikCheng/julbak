"use client";

import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import TimeSlotDay from "./TimeSlotDay";
import { TIME_SLOTS_SATURDAY } from "@/app/constants";
import { Session } from "next-auth";

type TimeSlotCalendarProps = {
	session?: Session;
};

const TimeSlotCalendar = ({ session }: TimeSlotCalendarProps) => {
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

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="flex flex-col min-w-80">
			<h2 className="text-2xl font-semibold">Lördag 14/12</h2>
			{loading ? (
				<div className="min-w-80">
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<TimeSlotDay
					calendar={calendar}
					weekday={TIME_SLOTS_SATURDAY}
					setCalendar={setCalendar}
					session={session || undefined}
				/>
			)}
		</div>
	);
};

export default TimeSlotCalendar;
