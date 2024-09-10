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
							<div className="relative z-0 w-full mb-5 group">
								<input
									type="text"
									name="floating_participant_1"
									id="floating_participant_1"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required
								/>
								<label
									htmlFor="floating_participant_1"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Deltagare 1
								</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input
									type="text"
									name="floating_participant_2"
									id="floating_participant_2"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required
								/>
								<label
									htmlFor="floating_participant_2"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Deltagare 2
								</label>
							</div>
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
