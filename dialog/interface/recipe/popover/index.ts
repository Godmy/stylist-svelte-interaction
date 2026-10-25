import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { Snippet } from 'svelte';
import type { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';
export interface RecipePopover extends ComputeIntersectAll<[]> {
	title?: string;
	content: Snippet;
	trigger: Snippet;
	open?: boolean;
	position?: (typeof TOKEN_ALIGNMENT)[number];
	class?: string;
	id?: string;
}
