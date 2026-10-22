import type { Snippet } from 'svelte';
import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';

/** Fragment: a switchable screen of an activity holding a pager, a list, a landing or anything else. */
export interface RecipeFragment extends RecipeHtmlSection {
	heading?: string;
	description?: string;
	/**
	 * `content` — readable column, `wide` — grids and lists, `full` — edge to edge (landing),
	 * `fill` — fills the activity height for content with its own scroll (pager, map).
	 */
	layout?: 'content' | 'wide' | 'full' | 'fill';
	/** Replaces the heading block. */
	header?: Snippet;
	children?: Snippet;
}
