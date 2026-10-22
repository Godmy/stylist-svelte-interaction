import FormHeader from '$stylist/form/component/atom/form-header/index.svelte';
import type { RecipeFormHeader } from '$stylist/form/interface/recipe/form-header';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Heading of a form step; index.story.svelte supplies the backAction callback. */
export default {
	component: FormHeader,
	title: 'FormHeader',
	description: 'Consistent heading section for multi-step forms.',
	args: {
		title: 'Personal information',
		subtitle: 'Step 1 of 3',
		description: 'Fill in profile details to continue setup.',
		showBackButton: true,
		backButtonLabel: 'Back'
	},
	controls: {
		title: { type: 'text' },
		subtitle: { type: 'text' },
		description: { type: 'text' },
		// showBackButton is a story knob: the render passes a backAction only when it is on.
		showBackButton: { type: 'boolean' },
		backButtonLabel: { type: 'text' }
	},
	presets: { WithoutBackButton: { showBackButton: false } },
	layout: 'padded'
} satisfies ContractStory<RecipeFormHeader & { showBackButton?: boolean }>;
