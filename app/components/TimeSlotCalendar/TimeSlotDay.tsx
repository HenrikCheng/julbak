import { TimeSlot, TimeSlotAPI } from "@/app/types";
import TimeSlotField from "./TimeSlotField";
import { Dispatch, SetStateAction } from "react";

type TimeSlotDayProps = {
	calendar: TimeSlotAPI[];
	weekday: TimeSlot[];
	setCalendar: Dispatch<SetStateAction<never[]>>;
};

const TimeSlotDay = ({ calendar, weekday, setCalendar }: TimeSlotDayProps) => {
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
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeSlotDay;
