import TagInput from './index.svelte';
import type { RecipeTagInput } from '$stylist/input/interface/recipe/tag-input';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A tag input component for managing tags. */
export default {
	component: TagInput,
	title: 'TagInput',
	description: 'A tag input component for managing tags.',
	args: {
		tags: ['svelte', 'design-system'],
		placeholder: 'Enter tags...',
		disabled: false,
		maxTags: 0,
		delimiter: ','
	},
	controls: {
		placeholder: { type: 'text' },
		disabled: { type: 'boolean' },
		maxTags: { type: 'number', min: 0 },
		delimiter: { type: 'text' }
	},
	presets: { 'Max 3 tags': { maxTags: 3 } }
} satisfies ContractStory<RecipeTagInput>;
