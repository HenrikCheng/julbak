"use client";

import Button from "./Button";

const TimeSlotCalendar = () => {
	const timeslots = [
		"08:00 - 10:00",
		"10:00 - 12:00",
		"12:00 - 14:00",
		"14:00 - 16:00",
		"16:00 - 18:00",
	];
	return (
		<div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 flex-shrink-0">
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Lördag</h2>
				<div className="grid grid-cols-1 gap-2">
					{timeslots.map((slot, index) => (
						<div key={index}>
							<div className="grid grid-cols-2 gap-4 p-4">
								<div className="flex flex-col gap-1">
									<span className="font-medium">{slot}</span>
									<span className="text-sm text-muted-foreground">
										{index === 0
											? "Förberedelser"
											: index + 1 === timeslots.length
											? "Städning"
											: "Bakning"}
									</span>
								</div>
								<div className="flex items-center justify-end gap-2">
									<Button
										color="blue"
										onClick={() => console.log("button click")}
									>
										Jag kan hjälpa
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Söndag</h2>
				<div className="grid grid-cols-1 gap-2">
					{timeslots.map((slot, index) => (
						<div key={index}>
							<div className="grid grid-cols-2 gap-4 p-4">
								<div className="flex flex-col gap-1">
									<span className="font-medium">{slot}</span>
									<span className="text-sm text-muted-foreground">
										{index === 0
											? "Förberedelser"
											: index + 1 === timeslots.length
											? "Städning"
											: "Bakning"}
									</span>
								</div>
								<div className="flex items-center justify-end gap-2">
									<Button
										color="blue"
										onClick={() => console.log("button click")}
									>
										Jag kan hjälpa
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TimeSlotCalendar;
