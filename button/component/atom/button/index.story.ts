import Button from './index.svelte';
import type { RecipeButtonElement } from '$stylist/button/interface/recipe/button-element';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Base button component. */
export default {
	component: Button,
	title: 'Button',
	description: 'Base button component with variants, sizes, loading and block states.',
	args: { variant: 'primary', size: 'md', disabled: false, loading: false, block: false },
	controls: {
		variant: {
			type: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']
		},
		// xs … 2xl: the size tokens the button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' },
		block: { type: 'boolean' }
	},
	presets: { Loading: { loading: true }, Outline: { variant: 'outline' } },
	content: [{ kind: 'text', value: 'Click me' }],
	layout: 'centered'
} satisfies ContractStory<RecipeButtonElement>;
