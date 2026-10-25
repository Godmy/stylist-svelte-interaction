import Popover from '$stylist/dialog/component/molecule/popover/index.svelte';
import type { RecipePopover } from '$stylist/dialog/interface/recipe/popover';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';

/** Floating panel; index.story.svelte passes the trigger and content snippets. */
export default {
	component: Popover,
	title: 'Popover',
	description: 'Floating contextual panel anchored to a trigger.',
	args: { title: 'Team members', open: true, position: 'bottom' },
	controls: {
		title: { type: 'text' },
		open: { type: 'boolean' },
		// The popover styles only the four sides.
		position: {
			type: 'select',
			options: TOKEN_ALIGNMENT.filter(
				(side) => side === 'top' || side === 'bottom' || side === 'left' || side === 'right'
			)
		}
	},
	presets: { Top: { position: 'top' }, Closed: { open: false } }
} satisfies ContractStory<RecipePopover>;
