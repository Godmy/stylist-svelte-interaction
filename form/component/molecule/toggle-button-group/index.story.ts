import ToggleButtonGroup from '$stylist/form/component/molecule/toggle-button-group/index.svelte';
import type { RecipeToggleButtonGroup } from '$stylist/form/interface/recipe/toggle-button-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Segmented group of toggle buttons. */
export default {
	component: ToggleButtonGroup,
	title: 'ToggleButtonGroup',
	description: 'Group of toggle buttons for selection',
	args: {
		value: 'medium',
		size: 'md',
		disabled: false,
		multiple: false,
		options: [
			{ label: 'Small', value: 'small' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Large', value: 'large' }
		]
	},
	controls: {
		value: { type: 'text', description: 'Selected value' },
		// sm, md, lg: the size tokens the group styles.
		size: {
			type: 'select',
			options: TOKEN_SIZE.slice(1, 4),
			description: 'Size of the toggle buttons'
		},
		disabled: { type: 'boolean', description: 'Whether the component is disabled' }
	},
	presets: { Multiple: { multiple: true, value: ['small', 'large'] } },
	layout: 'centered'
} satisfies ContractStory<RecipeToggleButtonGroup>;
