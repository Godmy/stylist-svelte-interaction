import TopAppBar from '$stylist/navigation/component/organism/top-app-bar/index.svelte';
import type { RecipeTopAppBar } from '$stylist/navigation/interface/recipe/top-app-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Top app bar with the burger or Up button, a title and actions. */
export default {
	component: TopAppBar,
	title: 'TopAppBar',
	description:
		'Header of an activity: burger (menu) or Up navigation on the left, the fragment title and optional subtitle.',
	args: { heading: 'Tours', navigation: 'menu', menuOpen: false, elevated: false },
	controls: {
		heading: { type: 'text' },
		subheading: { type: 'text' },
		navigation: { type: 'select', options: ['menu', 'up', 'none'] },
		menuOpen: { type: 'boolean' },
		elevated: { type: 'boolean' }
	},
	presets: {
		Up: { navigation: 'up', heading: 'Tour details', subheading: 'Sigiriya sunrise' },
		Elevated: { elevated: true }
	}
} satisfies ContractStory<RecipeTopAppBar>;
