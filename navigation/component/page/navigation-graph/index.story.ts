import NavigationGraph from '$stylist/navigation/component/page/navigation-graph/index.svelte';
import demoGraph from '$stylist/navigation/data/json/navigation-graph-demo/index.json';
import type { RecipeNavigationGraph } from '$stylist/navigation/interface/recipe/navigation-graph';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Site map of fragments and the transitions between them. */
export default {
	component: NavigationGraph,
	title: 'NavigationGraph',
	description:
		'Overview of a navigation graph: drawer transitions (dashed), declared actions, nested graph groups and a table of back stack effects.',
	args: { graph: demoGraph, heading: 'Navigation graph', activeId: 'catalog-detail', table: true },
	controls: {
		heading: { type: 'text' },
		activeId: {
			type: 'select',
			options: [
				'discover',
				'catalog-list',
				'catalog-detail',
				'catalog-gallery',
				'bookings',
				'profile',
				'settings'
			]
		},
		drawerLabel: { type: 'text' },
		table: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeNavigationGraph>;
