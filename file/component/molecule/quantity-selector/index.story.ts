import QuantitySelector from '$stylist/file/component/molecule/quantity-selector/index.svelte';
import type { RecipeQuantitySelector } from '$stylist/file/interface/recipe/quantity-selector';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';
import { TOKEN_SELECTOR_KIND } from '$stylist/control/const/array/selection-kind';

/** Interactive quantity selector with customizable options. */
export default {
	component: QuantitySelector,
	title: 'QuantitySelector',
	description: 'Interactive quantity selector with customizable options.',
	args: {
		value: 1,
		size: 'md',
		variant: 'default',
		min: 1,
		max: 99,
		disabled: false,
		showInput: true,
		showButtons: true
	},
	controls: {
		value: { type: 'number' },
		// xs … lg: the sizes the selector styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 4) },
		variant: { type: 'select', options: TOKEN_SELECTOR_KIND },
		min: { type: 'number' },
		max: { type: 'number' },
		disabled: { type: 'boolean' },
		showInput: { type: 'boolean' },
		showButtons: { type: 'boolean' },
		label: { type: 'text' }
	},
	presets: {
		'Small Size': { value: 1, size: 'sm', variant: 'default' },
		'Large Size': { value: 5, size: 'lg', variant: 'filled' },
		'Minimal Variant': { value: 3, size: 'md', variant: 'minimal' }
	}
} satisfies ContractStory<RecipeQuantitySelector>;
