import PageEllipsis from './index.svelte';
import type { RecipePageEllipsis } from '$stylist/navigation/interface/recipe/page-ellipsis';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import type { HTMLAttributes } from 'svelte/elements';

/** Pagination overflow marker. */
export default {
	component: PageEllipsis,
	title: 'PageEllipsis',
	description: 'Pagination overflow marker between distant page buttons.',
	args: { class: '' },
	controls: { class: { type: 'text' } }
} satisfies ContractStory<RecipePageEllipsis & HTMLAttributes<HTMLDivElement>>;
