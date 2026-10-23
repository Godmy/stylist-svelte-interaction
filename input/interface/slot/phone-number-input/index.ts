import type { RecipeHtmlInputTel } from '$stylist/html/interface/recipe/input-tel';
/**
 * PhoneNumberInput types and interfaces following SOLID principles
 */

export interface SlotPhoneNumberInput extends RecipeHtmlInputTel {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	error?: boolean;
	helpText?: string;
	onValueInput?: (value: string, event: Event) => void;
	onValueChange?: (value: string) => void;
	onInput?: (event: Event) => void;
}
