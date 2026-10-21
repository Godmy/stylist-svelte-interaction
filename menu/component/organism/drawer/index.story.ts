import Drawer from './index.svelte';
import type { RecipeDrawer } from '$stylist/menu/interface/recipe/drawer';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';

/** Slide-in panel for secondary navigation and settings. */
export default {
	component: Drawer,
	title: 'Drawer',
	description: 'Slide-in panel for secondary navigation and settings.',
	args: {
		closeLabel: 'Close drawer',
		open: true,
		position: 'right',
		size: '320px',
		closable: true,
		showBackdrop: true
	},
	controls: {
		closeLabel: { type: 'text' },
		open: { type: 'boolean', description: 'Whether the drawer is open' },
		// The drawer slides in from one of the four edges.
		position: {
			type: 'select',
			options: TOKEN_ALIGNMENT.filter(
				(alignment) =>
					alignment === 'left' ||
					alignment === 'right' ||
					alignment === 'top' ||
					alignment === 'bottom'
			),
			description: 'Edge the drawer slides in from'
		},
		size: { type: 'text', description: 'Width (left/right) or height (top/bottom) of the drawer' },
		closable: { type: 'boolean', description: 'Show the close button' },
		showBackdrop: { type: 'boolean', description: 'Show the backdrop' }
	}
} satisfies ContractStory<RecipeDrawer>;
