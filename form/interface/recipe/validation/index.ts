import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

export interface RecipeValidation extends ComputeIntersectAll<[HTMLAttributes<HTMLDivElement>]> {
	label?: string;
	description?: string;
	required?: boolean;
	error?: string;
	hint?: string;
	disabled?: boolean;
	orientation?: (typeof TOKEN_ORIENTATION)[number];
	class?: string;
	id?: string;
	children: Snippet;
}
