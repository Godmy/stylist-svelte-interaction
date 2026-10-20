import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeScreenReader extends ComputeIntersectAll<[HTMLAttributes<HTMLDivElement>]> {
	title?: string;
	content?: string;
	class?: string;
}
