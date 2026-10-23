import type { RecipeHtmlInputNumber } from '$stylist/html/interface/recipe/input-number';
export interface SlotNumberInput extends Omit<
	RecipeHtmlInputNumber,
	'value' | 'min' | 'max' | 'step'
> {
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
