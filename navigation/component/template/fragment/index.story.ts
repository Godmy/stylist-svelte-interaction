import Fragment from '$stylist/navigation/component/template/fragment/index.svelte';
import type { RecipeFragment } from '$stylist/navigation/interface/recipe/fragment';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Switchable activity screen with a heading and a layout mode. */
export default {
	component: Fragment,
	title: 'Fragment',
	description:
		'Screen of an activity: readable column, wide grid, full-bleed landing or a fill area for a pager or a map.',
	args: {
		heading: 'Tours',
		description: 'Fragment content follows the heading.',
		layout: 'content'
	},
	controls: {
		heading: { type: 'text' },
		description: { type: 'text' },
		layout: { type: 'select', options: ['content', 'wide', 'full', 'fill'] }
	},
	content: [
		{
			kind: 'element',
			tag: 'p',
			children: [
				{ kind: 'text', value: 'A pager, a recycler view, a landing or any other content.' }
			]
		}
	]
} satisfies ContractStory<RecipeFragment>;
