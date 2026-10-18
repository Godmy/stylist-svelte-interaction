import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeSearchForm extends ComputeIntersectAll<[HTMLAttributes<HTMLFormElement>]> {
	query?: string;
	placeholder?: string;
	class?: string;
}
