import { TimeSlot, TimeSlotAPI } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
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
	const toggleAdmission = async ({ startTime, slot }: any) => {
		try {
			// Check if the entry already exists
			const existingEntry = calendar.find(
				(entry) => entry.date === startTime && entry.position === slot,
			);

			if (existingEntry) {
				// Clear the existing entry
				const response = await fetch(`/api/calendar?_id=${existingEntry._id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const result = await response.json();
				if (!response.ok) {
					throw new Error(result.error || "Something went wrong");
				}
			} else {
				// Add new entry
				const response = await fetch("/api/calendar", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: session?.user?.name || "Anonymous", // Use session user name or fallback to 'Anonymous'
						date: startTime,
						position: slot,
					}),
				});

				const result = await response.json();
				if (!response.ok) {
					throw new Error(result.error || "Something went wrong");
				}
			}

			// Re-fetch updated calendar data
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
		<div className="grid grid-cols-1 gap-2">
			{weekday.map((slot) => (
				<div key={slot.startTime}>
					<div className="grid gap-4">
						<div className="flex flex-col gap-1">
							<span className="font-medium">{slot.duration}</span>
							<span className="text-sm text-muted-foreground">
								{slot.label}
							</span>
						</div>
						{loginFeature && session ? (
							<div className="flex items-center justify-end gap-2">
								{calendar.find(
									(entry) =>
										entry.date === slot.startTime && entry.position === "1",
								) ? (
									<Button
										color="green"
										onClick={() =>
											toggleAdmission({ startTime: slot.startTime, slot: "1" })
										}
									>
										{session?.user?.name || session?.user?.email || ""}
									</Button>
								) : (
									<Button
										color="gray"
										onClick={() =>
											toggleAdmission({ startTime: slot.startTime, slot: "1" })
										}
									>
										Anmäl mig
									</Button>
								)}

								{calendar.find(
									(entry) =>
										entry.date === slot.startTime && entry.position === "2",
								) ? (
									<Button
										color="green"
										onClick={() =>
											toggleAdmission({ startTime: slot.startTime, slot: "2" })
										}
									>
										{session?.user?.name || session?.user?.email || ""}
									</Button>
								) : (
									<Button
										color="gray"
										onClick={() =>
											toggleAdmission({ startTime: slot.startTime, slot: "2" })
										}
									>
										Anmäl mig
									</Button>
								)}
							</div>
						) : (
							<form className="flex items-center justify-end gap-2">
								<TimeSlotField
									startTime={slot.startTime}
									calendar={calendar}
									slot="1"
									setCalendar={setCalendar}
								/>
								<TimeSlotField
									startTime={slot.startTime}
									calendar={calendar}
									slot="2"
									setCalendar={setCalendar}
								/>
							</form>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeSlotDay;
