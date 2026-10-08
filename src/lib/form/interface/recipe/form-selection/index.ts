import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

export interface RecipeFormSelection extends ComputeIntersectAll<[HTMLAttributes<HTMLElement>]> {
	title?: string;
	description?: string;
	collapsible?: boolean;
	initiallyCollapsed?: boolean;
	required?: boolean;
	border?: boolean;
	padding?: boolean;
	class?: string;
	headerClass?: string;
	contentClass?: string;
	children: Snippet;
}
