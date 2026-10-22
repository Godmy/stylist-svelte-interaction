import FloatingActionButton from '$stylist/navigation/component/atom/floating-action-button/index.svelte';
import type { RecipeFloatingActionButton } from '$stylist/navigation/interface/recipe/floating-action-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Primary action of a fragment, round or extended with a label. */
export default {
	component: FloatingActionButton,
	title: 'FloatingActionButton',
	description:
		'Floating action button of an activity: round with an icon or extended with a label.',
	args: { icon: 'add', size: 'md', 'aria-label': 'Add' },
	controls: {
		icon: { type: 'text' },
		label: { type: 'text' },
		size: { type: 'select', options: ['sm', 'md', 'lg'] },
		disabled: { type: 'boolean' }
	},
	presets: {
		Extended: { icon: 'calendar', label: 'Book' },
		Small: { size: 'sm' },
		Large: { size: 'lg' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeFloatingActionButton>;
