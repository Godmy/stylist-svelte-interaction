import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeLoginForm extends ComputeIntersectAll<[HTMLAttributes<HTMLFormElement>]> {
	email?: string;
	rememberMe?: boolean;
	class?: string;
}
