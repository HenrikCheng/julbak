import { useState, useEffect } from "react";
import { TimeSlot, TimeSlotAPI } from "@/app/types";
import TimeSlotFieldV2 from "./TimeSlotFieldV2";

type TimeSlotDayProps = {
	calendarSlots: TimeSlot[];
	calendar: TimeSlotAPI[];
};

const TimeSlotDayV2 = ({ calendarSlots, calendar }: TimeSlotDayProps) => {
	const [calendarAPI, setCalendarAPI] = useState(calendar);
	console.log("🚀 ~ TimeSlotDayV2 ~ calendarAPI:", calendarAPI);

	return (
		<div>
			{/* <p>calendarSlots</p>
			{JSON.stringify(calendarSlots, null, 2)}

			<p>calendarAPI</p>
			{JSON.stringify(calendarAPI, null, 2)} */}

			<table className="min-w-full bg-slate-800 border border-slate-700 mt-4">
				<thead>
					<tr className="bg-slate-700">
						<th className="py-3 px-4 border-b border-slate-600 text-left text-white font-semibold"></th>
						<th className="py-3 px-4 border-b border-slate-600 text-left text-white font-semibold">
							Deltagare 1
						</th>
						<th className="py-3 px-4 border-b border-slate-600 text-left text-white font-semibold">
							Deltagare 2
						</th>
					</tr>
				</thead>
				<tbody>
					{calendarSlots.map((rowNumber) => (
						<tr key={rowNumber.startTime}>
							<td className="py-3 px-4 border-b border-slate-700 text-white font-medium">
								<p>{rowNumber.duration}</p>
								<p>{rowNumber.label}</p>
							</td>
							{["1", "2"].map((participantNumber) => (
								<td
									key={participantNumber}
									className="py-3 px-4 border-b border-slate-700"
								>
									<TimeSlotFieldV2
										calendarAPI={calendarAPI}
										participantNumber={participantNumber}
										rowNumber={rowNumber}
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TimeSlotDayV2;
