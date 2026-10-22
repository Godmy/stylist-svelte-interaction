export type Zoom<TValue = number> = {
	id: string;
	label: string;
	display: 'number' | 'icon' | 'preview';
	steps: import('$stylist/control/type/struct/zoom-step').ZoomStep<TValue>[];
};
