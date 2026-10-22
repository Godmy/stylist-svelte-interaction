import Stepper from '$stylist/dialog/component/molecule/stepper/index.svelte';
import type { RecipeStepper } from '$stylist/dialog/interface/recipe/stepper';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

export default {
	component: Stepper,
	title: 'Stepper',
	description: 'Step progress indicator for multi-step flows.',
	args: {
		orientation: 'horizontal',
		steps: [
			{ id: '1', title: 'Account', description: 'Create profile', status: 'completed' },
			{ id: '2', title: 'Plan', description: 'Choose subscription', status: 'current' },
			{ id: '3', title: 'Checkout', description: 'Confirm payment', status: 'upcoming' }
		]
	},
	controls: {
		orientation: { type: 'select', options: TOKEN_ORIENTATION }
	}
} satisfies ContractStory<RecipeStepper>;
