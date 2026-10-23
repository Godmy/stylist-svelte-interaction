import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
import type { RecipeHtmlInputText } from '$stylist/html/interface/recipe/input-text';

export interface RecipeInputPinDigit extends Omit<RecipeHtmlInputText, 'size' | 'class' | 'value'> {
	class?: string;
	value?: string;
	focused?: boolean;
	invalid?: boolean;
	variant?: TokenColorTone;
	size?: 'sm' | 'md' | 'lg';
}
