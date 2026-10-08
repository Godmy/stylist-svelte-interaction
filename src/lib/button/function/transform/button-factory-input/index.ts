import type { HTMLButtonAttributes } from 'svelte/elements';
import type { RecipeButtonElement as SlotButtonElement } from '$stylist/button/interface/recipe/button-element';
import type { RecipeButtonFactoryInput } from '$stylist/button/interface/recipe/button-factory-input';

export function createButtonFactoryInput(
	props: SlotButtonElement & HTMLButtonAttributes
): RecipeButtonFactoryInput {
	const {
		variant,
		size,
		disabled,
		loading,
		block,
		ariaLabel,
		loadingLabel,
		children,
		class: className,
		type,
		...attrs
	} = props;

	return {
		contract: {
			variant,
			size,
			disabled,
			loading,
			block,
			ariaLabel,
			loadingLabel
		},
		html: {
			class: className,
			type,
			attrs
		},
		slots: {
			children
		}
	};
}
