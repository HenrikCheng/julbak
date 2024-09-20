import { TimeSlot, TimeSlotAPI } from "@/app/types";
import { Dispatch, SetStateAction } from "react";
import Button from "../Button";
import { Session } from "next-auth";
import loginFeature from "@/app/config/featureFlags";
import TimeSlotField from "./TimeSlotField";

type TimeSlotDayProps = {
	calendar: TimeSlotAPI[];
	weekday: TimeSlot[];
	setCalendar: Dispatch<SetStateAction<never[]>>;
	session?: Session;
};

const TimeSlotDay = ({
	calendar,
	weekday,
	setCalendar,
	session,
}: TimeSlotDayProps) => {
	const toggleAdmission = async ({
		startTime,
		slot,
	}: {
		startTime: string;
		slot: string;
	}) => {
		try {
			const existingEntry = calendar.find(
				(entry) => entry.date === startTime && entry.position === slot,
			);

			const response = await fetch(
				`/api/calendar${existingEntry ? `?_id=${existingEntry._id}` : ""}`,
				{
					method: existingEntry ? "DELETE" : "POST",
					headers: { "Content-Type": "application/json" },
					body: existingEntry
						? undefined
						: JSON.stringify({
								name: session?.user?.name || "Anonymous",
								date: startTime,
								position: slot,
						  }),
				},
			);

			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.error || "Something went wrong");
			}

			const updatedCalendarResponse = await fetch("/api/calendar");
			if (updatedCalendarResponse.ok) {
				setCalendar(await updatedCalendarResponse.json());
			} else {
				throw new Error("Failed to re-fetch updated calendar data");
			}
		} catch (error: any) {
			console.error("Error:", error);
		}
	};

	const renderButton = (slot: TimeSlot, slotNumber: string) => {
		const isRegistered = calendar.some(
			(entry) => entry.date === slot.startTime && entry.position === slotNumber,
		);
		const buttonText = isRegistered
			? session?.user?.name || session?.user?.email || ""
			: "Anmäl mig";

		return (
			<Button
				color={isRegistered ? undefined : "gray"}
				onClick={() =>
					toggleAdmission({ startTime: slot.startTime, slot: slotNumber })
				}
			>
				{buttonText}
			</Button>
		);
	};

	return (
		<div className="grid grid-cols-1 gap-2">
			{weekday.map((slot) => (
				<div
					key={slot.startTime}
					className="grid gap-4 border-t-2 py-4 border-gray-500"
				>
					<div className="flex flex-col gap-1">
						<span className="font-medium">{slot.duration}</span>
						<span className="text-sm text-muted-foreground">{slot.label}</span>
					</div>

					{loginFeature && session ? (
						<div className="flex items-center justify-end gap-2">
							{["1", "2"].map((slotNumber) => renderButton(slot, slotNumber))}
						</div>
					) : (
						<form className="flex items-center justify-end gap-2">
							{["1", "2"].map((slotNumber) => (
								<TimeSlotField
									key={slotNumber}
									startTime={slot.startTime}
									calendar={calendar}
									slot={slotNumber}
									setCalendar={setCalendar}
								/>
							))}
						</form>
					)}
				</div>
			))}
		</div>
	);
};

export default TimeSlotDay;
