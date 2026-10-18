import MenuItem from './index.svelte';
import type { RecipeMenuItem } from '$stylist/menu/interface/recipe/menu-item';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** MenuItem component for navigation menus. */
export default {
	component: MenuItem,
	title: 'MenuItem',
	description: 'MenuItem component for navigation menus.',
	args: { icon: 'home', active: false, variant: 'default', disabled: false, external: false },
	controls: {
		active: { type: 'boolean', description: 'Whether the menu item is active' },
		variant: { type: 'select', options: TOKEN_COLOR_TONE, description: 'Variant of the menu item' },
		disabled: { type: 'boolean', description: 'Whether the menu item is disabled' },
		external: { type: 'boolean', description: 'Whether the link opens in a new tab' }
	},
	presets: {
		Active: { active: true },
		Disabled: { disabled: true },
		External: { external: true, href: '#' },
		Primary: { variant: 'primary' },
		Success: { variant: 'success' },
		Danger: { variant: 'danger' }
	},
	content: [{ kind: 'text', value: 'Home' }]
} satisfies ContractStory<RecipeMenuItem>;
