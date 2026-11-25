import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeSpinner extends ComputeIntersectAll<[HTMLAttributes<HTMLSpanElement>]> {
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	class?: string;
	style?: string;
}
