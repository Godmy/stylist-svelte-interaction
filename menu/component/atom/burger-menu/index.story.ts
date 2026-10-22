import BurgerMenu from '$stylist/menu/component/atom/burger-menu/index.svelte';
import type { RecipeBurgerMenu } from '$stylist/menu/interface/recipe/burger-menu';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** BurgerMenu component for toggling navigation menus. */
export default {
	component: BurgerMenu,
	title: 'BurgerMenu',
	description: 'BurgerMenu component for toggling navigation menus.',
	args: { open: false, size: 'md', color: '#1f2937', activeColor: '#2563eb' },
	controls: {
		open: { type: 'boolean', description: 'Whether the menu is open' },
		// Only the scalar sizes (xs..2xl) apply to a burger button.
		size: {
			type: 'select',
			options: TOKEN_SIZE.slice(0, 6),
			description: 'Size of the burger menu'
		},
		color: { type: 'color', description: 'Color of the burger menu when closed' },
		activeColor: { type: 'color', description: 'Color of the burger menu when open' }
	},
	presets: {
		Open: { open: true },
		Small: { size: 'sm' },
		Large: { size: 'lg' }
	}
} satisfies ContractStory<RecipeBurgerMenu>;
