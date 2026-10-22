import TextInputDialog from '$stylist/dialog/component/organism/text-input-dialog/index.svelte';
import type { RecipeTextInputDialog } from '$stylist/dialog/interface/recipe/text-input-dialog';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Text editor modal; index.story.svelte binds its value to a local draft and validates it. */
export default {
	component: TextInputDialog,
	title: 'TextInputDialog',
	description: 'Modal text editor used by the domain page for backlog and notes editing.',
	args: {
		open: true,
		title: 'Story Backlog',
		path: 'src/lib/layout/component/atom/clickable/README.md',
		placeholder: 'Write component guidance...',
		loading: false,
		saving: false,
		rows: 10
	},
	controls: {
		open: { type: 'boolean' },
		loading: { type: 'boolean' },
		saving: { type: 'boolean' },
		rows: { type: 'number' }
	}
} satisfies ContractStory<RecipeTextInputDialog>;
