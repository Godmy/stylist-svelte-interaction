import type { HTMLLabelAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeFormHoneypot extends ComputeIntersectAll<
	[Omit<HTMLLabelAttributes, 'children'>]
> {
	/** Field name the server checks: any value in it marks the submission as a bot. */
	name?: string;
	/** Hint for the rare person who still reaches the hidden field. */
	label?: string;
}
