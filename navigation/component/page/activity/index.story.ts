import Activity from '$stylist/navigation/component/page/activity/index.svelte';
import demoGraph from '$stylist/navigation/data/json/navigation-graph-demo/index.json';
import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Android-like activity: drawer, top app bar, switching fragments and a FAB. */
export default {
	component: Activity,
	title: 'Activity',
	description:
		'App shell over a navigation graph: burger and drawer of top-level destinations, Up button inside flows, action buttons, a floating action button and fragments holding a landing, lists, a pager and the graph overview.',
	args: { graph: demoGraph, heading: 'Stylist Tours', permanentDrawer: '(min-width: 1024px)' },
	controls: {
		heading: { type: 'text', description: 'App name in the drawer header' },
		initial: {
			type: 'select',
			options: [
				'discover',
				'catalog-list',
				'catalog-detail',
				'catalog-gallery',
				'bookings',
				'profile',
				'settings'
			],
			description: 'Deep-linked destination'
		},
		permanentDrawer: { type: 'text', description: 'Media query of the permanent drawer' }
	},
	presets: {
		'Deep link': { initial: 'catalog-detail' },
		'Always modal drawer': { permanentDrawer: 'not all' }
	},
	layout: 'fullscreen'
} satisfies ContractStory<RecipeActivity>;
