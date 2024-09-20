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
		<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto py-6 sm:py-8 md:py-10 flex-shrink-0">
			<div className="space-y-4 min-w-80">
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
			{/* <div className="space-y-4">
				<h2 className="text-2xl font-semibold">Söndag 15/12</h2>
				{loading ? (
					<div className="w-80">
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
					/>
				)}
			</div> */}
		</div>
	);
};

export default TimeSlotCalendar;
