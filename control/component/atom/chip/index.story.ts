import Chip from './index.svelte';
import type { RecipeChip } from '$stylist/control/interface/recipe/chip';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Compact component for displaying short labels or tags. */
export default {
	component: Chip,
	title: 'Chip',
	description: 'Compact component for displaying short labels or tags',
	args: { label: 'Example chip', variant: 'primary', size: 'md', closable: false, disabled: false },
	controls: {
		label: { type: 'text' },
		// The chip styles every tone except tertiary and info.
		variant: {
			type: 'select',
			options: TOKEN_COLOR_TONE.filter((tone) => tone !== 'tertiary' && tone !== 'info')
		},
		// Only the scalar sizes (xs..2xl) apply to a chip.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		closable: { type: 'boolean' },
		disabled: { type: 'boolean' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeChip>;
