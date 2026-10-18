import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeFormWithValidation extends ComputeIntersectAll<
	[HTMLAttributes<HTMLFormElement>]
> {
	email?: string;
	password?: string;
	class?: string;
}
