export type Zoom<TValue = number> = {
	id: string;
	label: string;
	display: 'number' | 'icon' | 'preview';
	steps: import('../../zoom-step').ZoomStep<TValue>[];
};
