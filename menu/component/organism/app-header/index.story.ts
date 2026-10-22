import AppHeader from '$stylist/menu/component/organism/app-header/index.svelte';
import type { RecipeAppHeader } from '$stylist/menu/interface/recipe/app-header';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Top-level application header. */
export default {
	component: AppHeader,
	title: 'AppHeader',
	description:
		'Top-level application header combining brand, primary navigation links, and trailing actions.',
	args: {
		brand: 'Vibe Manager',
		brandHref: '#home',
		navLinks: [
			{ href: '#overview', label: 'Overview', active: true },
			{ href: '#projects', label: 'Projects' },
			{ href: '#reports', label: 'Reports' },
			{ href: '#settings', label: 'Settings' }
		]
	},
	controls: {
		brand: { type: 'text', description: 'Brand name' },
		brandHref: { type: 'text', description: 'Brand link (empty renders a heading)' }
	}
} satisfies ContractStory<RecipeAppHeader>;
