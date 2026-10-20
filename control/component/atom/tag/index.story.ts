import Tag from './index.svelte';
import type { RecipeTag } from '$stylist/control/interface/recipe/tag';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Tag for labelling and categorising content. */
export default {
	component: Tag,
	title: 'Tag',
	description: 'Тег для маркировки и категоризации контента',
	args: { text: 'Label', variant: 'default', size: 'md', closable: false, disabled: false },
	controls: {
		text: { type: 'text' },
		// The tag styles every tone except tertiary and info.
		variant: {
			type: 'select',
			options: TOKEN_COLOR_TONE.filter((tone) => tone !== 'tertiary' && tone !== 'info')
		},
		// Only the scalar sizes (xs..2xl) apply to a tag.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		closable: { type: 'boolean' },
		disabled: { type: 'boolean' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeTag>;
