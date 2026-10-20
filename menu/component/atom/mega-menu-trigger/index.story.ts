import MegaMenuTrigger from './index.svelte';
import type { RecipeMegaMenuTrigger } from '$stylist/menu/interface/recipe/mega-menu-trigger';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Top-level disclosure button of a mega menu. */
export default {
	component: MegaMenuTrigger,
	title: 'MegaMenuTrigger',
	description:
		'Top-level disclosure button of a mega menu with a rotating chevron, aria-expanded and aria-controls.',
	args: {
		label: 'Экскурсии',
		open: false,
		active: false,
		disabled: false,
		controls: 'mega-trigger-demo-panel'
	},
	controls: {
		label: { type: 'text', description: 'Trigger text' },
		open: { type: 'boolean', description: 'Whether the controlled panel is open' },
		active: {
			type: 'boolean',
			description: 'Section contains the current page (underline + accent colour)'
		},
		disabled: { type: 'boolean', description: 'Disable the trigger' }
	}
} satisfies ContractStory<RecipeMegaMenuTrigger>;
