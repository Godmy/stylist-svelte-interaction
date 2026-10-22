import NavigationItem from '$stylist/navigation/component/molecule/navigation-item/index.svelte';
import type { RecipeNavigationItem } from '$stylist/navigation/interface/recipe/navigation-item';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Drawer row of a destination. */
export default {
	component: NavigationItem,
	title: 'NavigationItem',
	description: 'Destination row of the navigation drawer with an icon, a label and a badge.',
	args: {
		destination: { id: 'bookings', label: 'Bookings', icon: 'calendar', badge: 2 },
		active: true
	},
	controls: {
		active: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeNavigationItem>;
