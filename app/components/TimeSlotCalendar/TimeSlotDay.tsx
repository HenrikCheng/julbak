import { TIME_SLOTS } from "@/app/api/constants";
import { TimeSlotAPI } from "@/app/api/types";
import TimeSlotField from "./TimeSlotField";

const TimeSlotDay = ({ calendar }: { calendar: TimeSlotAPI[] }) => {
	return (
		<div className="grid grid-cols-1 gap-2">
			{/* <p>{JSON.stringify(calendar, null, 2)}</p> */}
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

export default TimeSlotDay;
