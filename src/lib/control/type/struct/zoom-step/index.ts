export type ZoomStep<TValue = number> = {
	id: number;
	value: TValue;
	label: string;
	preview?: string;
};
