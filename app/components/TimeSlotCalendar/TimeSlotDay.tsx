import { TimeSlot, TimeSlotAPI } from "@/app/types";
import TimeSlotField from "./TimeSlotField";

type TimeSlotDayProps = { calendar: TimeSlotAPI[]; weekday: TimeSlot[] };

const TimeSlotDay = ({ calendar, weekday }: TimeSlotDayProps) => {
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
							/>
							<TimeSlotField
								startTime={slot.startTime}
								calendar={calendar}
								slot="2"
							/>
						</form>
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeSlotDay;
