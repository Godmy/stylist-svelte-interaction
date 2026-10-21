import SelectionButton from './index.svelte';
import type { RecipeSelectionButton } from '$stylist/button/interface/recipe/selection-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Toggle button with the `selection` effect; toggles `selected` itself on click. */
export default {
	component: SelectionButton,
	title: 'Selection Button',
	description: 'Toggle selection with mouse, touch, Space or Enter; selected is bindable.',
	args: { selected: false, disabled: false, loading: false },
	controls: {
		selected: { type: 'boolean' },
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	content: [{ kind: 'text', value: 'Выбрать экскурсию' }],
	layout: 'centered'
} satisfies ContractStory<RecipeSelectionButton>;
