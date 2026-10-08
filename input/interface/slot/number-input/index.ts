import type { HTMLAttributes } from 'svelte/elements';
export interface SlotNumberInput extends HTMLAttributes<HTMLInputElement> {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	inputClass?: string;
	buttonClass?: string;
	buttonWrapperClass?: string;
	onValueInput?: (value: number) => void;
	onValueChange?: (value: number) => void;
	/** @deprecated use onValueChange */
	onChange?: (value: number) => void;
}
