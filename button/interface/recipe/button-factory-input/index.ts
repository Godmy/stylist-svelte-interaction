import type { RecipeButtonElement } from '$stylist/button/interface/recipe/button-element';
import type { HTMLButtonAttributes } from 'svelte/elements';
export interface RecipeButtonFactoryInput {
	contract: {
		variant?: RecipeButtonElement['variant'];
		size?: RecipeButtonElement['size'];
		disabled?: RecipeButtonElement['disabled'];
		loading?: RecipeButtonElement['loading'];
		block?: RecipeButtonElement['block'];
		ariaLabel?: RecipeButtonElement['ariaLabel'];
		loadingLabel?: RecipeButtonElement['loadingLabel'];
	};
	html: {
		class?: string;
		type?: HTMLButtonAttributes['type'];
		attrs: Omit<
			HTMLButtonAttributes,
			| 'class'
			| 'type'
			| 'disabled'
			| 'children'
			| 'ariaLabel'
			| 'variant'
			| 'size'
			| 'loading'
			| 'block'
		>;
	};
	slots: {
		children?: RecipeButtonElement['children'];
	};
}
