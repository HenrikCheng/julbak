export type Contributor = {
	contributor: string;
	amount: number;
	note?: string;
	date: string;
};

export type Ingredient = {
	_id: string;
	name: string;
	desired_amount: number;
	current_amount: number;
	unit: string;
	contributors: Contributor[];
	date: string;
};

export type TimeSlotAPI = {
	_id: string;
	name: string;
	date: string;
	position: string;
};

export type TimeSlot = {
	duration: string;
	label: string;
	startTime: string;
};
