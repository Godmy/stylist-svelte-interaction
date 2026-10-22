import NavigationDrawer from '$stylist/navigation/component/organism/navigation-drawer/index.svelte';
import type { RecipeNavigationDrawer } from '$stylist/navigation/interface/recipe/navigation-drawer';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Drawer of top-level destinations, modal or permanent. */
export default {
	component: NavigationDrawer,
	title: 'NavigationDrawer',
	description:
		'Destinations grouped by nested graph. Modal mode slides over a scrim and closes on Escape; permanent mode stays beside the content.',
	args: {
		mode: 'permanent',
		open: true,
		label: 'Navigation',
		sections: [
			{
				destinations: [
					{ id: 'discover', label: 'Discover', icon: 'landing' },
					{ id: 'catalog', label: 'Catalog', icon: 'list' },
					{ id: 'bookings', label: 'Bookings', icon: 'calendar', badge: 2 }
				]
			},
			{
				label: 'Account',
				destinations: [
					{ id: 'profile', label: 'Profile', icon: 'user' },
					{ id: 'settings', label: 'Settings', icon: 'settings', disabled: true }
				]
			}
		]
	},
	controls: {
		mode: { type: 'select', options: ['modal', 'permanent'] },
		open: { type: 'boolean' },
		label: { type: 'text' }
	},
	layout: 'fullscreen'
} satisfies ContractStory<RecipeNavigationDrawer>;
