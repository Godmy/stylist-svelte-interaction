import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeCheckboxGroup extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'class'> {
	options: {
		id: string;
		label: string;
		value: string;
		disabled?: boolean;
		description?: string;
	}[];
	value?: string[];
	label?: string;
	description?: string;
	class?: string;
	itemClass?: string;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	onValueInput?: (values: string[]) => void;
	onValueChange?: (values: string[]) => void;
	onInput?: (values: string[]) => void;
	onChange?: (values: string[]) => void;
}
