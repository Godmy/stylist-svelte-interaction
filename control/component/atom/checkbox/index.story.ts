import Checkbox from '$stylist/control/component/atom/checkbox/index.svelte';
import type { RecipeCheckbox } from '$stylist/control/interface/recipe/checkbox';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Checkbox with label, description, required and disabled states. */
export default {
	component: Checkbox,
	title: 'Checkbox',
	description: 'Checkbox with label, description, required and disabled states.',
	args: {
		id: 'checkbox-story',
		label: 'Accept terms and conditions',
		required: false,
		disabled: false,
		description: 'Please read and accept our terms'
	},
	controls: {
		label: { type: 'text' },
		required: { type: 'boolean' },
		disabled: { type: 'boolean' },
		description: { type: 'text' }
	}
} satisfies ContractStory<RecipeCheckbox>;
