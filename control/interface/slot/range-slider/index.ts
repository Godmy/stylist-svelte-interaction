import type { HTMLInputAttributes } from 'svelte/elements';
export interface SlotRangeSlider
	extends Omit<HTMLInputAttributes, 'type' | 'value' | 'min' | 'max' | 'step'> {
	id: string;
	label?: string;
	value?: number | [number, number];
	min?: number;
	max?: number;
	step?: number;
	showValue?: boolean;
	disabled?: boolean;
	description?: string;
	range?: boolean;
	class?: string;
}
