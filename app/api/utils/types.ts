export type Contributor = {
	contributor: string;
	amount: Number;
	note?: string;
};

export type Ingredient = {
	_id: string;
	name: string;
	desired_amount: number;
	current_amount: number;
	unit: string;
	contributors: Contributor[];
};
