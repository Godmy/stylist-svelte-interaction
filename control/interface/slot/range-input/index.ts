import type { HTMLAttributes } from 'svelte/elements';
export interface SlotRangeInput extends HTMLAttributes<HTMLInputElement> {
	min?: number;
	max?: number;
	minValue?: number;
	maxValue?: number;
	step?: number;
	disabled?: boolean;
	showInputFields?: boolean;
	class?: string;
	rangeClass?: string;
	inputClass?: string;
	onInput?: (value: { min: number; max: number }) => void;
	onChange?: (value: { min: number; max: number }) => void;
}
