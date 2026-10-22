import Radio from '$stylist/control/component/atom/radio/index.svelte';
import type { RecipeRadio } from '$stylist/control/interface/recipe/radio';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Single radio option with checked, required, size, and disabled states. */
export default {
	component: Radio,
	title: 'Radio',
	description: 'Single radio option with checked, required, size, and disabled states.',
	args: {
		id: 'radio-main',
		name: 'story-radio',
		value: 'primary',
		label: 'Email notifications',
		checked: true,
		disabled: false,
		required: false,
		size: 'md'
	},
	controls: {
		label: { type: 'text' },
		checked: { type: 'boolean' },
		disabled: { type: 'boolean' },
		required: { type: 'boolean' },
		// The radio styles sm..xl.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 5) }
	}
} satisfies ContractStory<RecipeRadio>;
