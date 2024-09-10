"use client";

const TimeSlotDay = () => {
	const timeslots = [
		{ time: "09:00 - 10:00", label: "Förberedelser" },
		{ time: "10:00 - 11:00", label: "Bakning" },
		{ time: "11:00 - 12:00", label: "Bakning" },
		{ time: "12:00 - 13:00", label: "Bakning" },
		{ time: "13:00 - 14:00", label: "Bakning" },
		{ time: "14:00 - 15:00", label: "Bakning" },
		{ time: "15:00 - 16:00", label: "Bakning" },
		{ time: "16:00 - 17:00", label: "Städning" },
	];

	return (
		<div className="grid grid-cols-1 gap-2">
			{timeslots.map((slot, index) => (
				<div key={`${slot.time}_${slot.label}`}>
					<div className="grid gap-4">
						<div className="flex flex-col gap-1">
							<span className="font-medium">{slot.time}</span>
							<span className="text-sm text-muted-foreground">
								{slot.label}
							</span>
						</div>
						<form className="flex items-center justify-end gap-2">
							<input
								type="text"
								id={`Participant1-${index}`}
								className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="deltagare 1"
							/>
							<input
								type="text"
								id={`Participant2-${index}`}
								className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="deltagare 2"
							/>
						</form>
					</div>
				</div>
			))}
		</div>
	);
};

const TimeSlotCalendar = () => {
	return (
		<div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 flex-shrink-0">
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Lördag</h2>
				<TimeSlotDay />
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Söndag</h2>
				<TimeSlotDay />
			</div>
		</div>
	);
};

export default TimeSlotCalendar;
