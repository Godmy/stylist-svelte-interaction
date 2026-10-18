import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeAddressForm extends ComputeIntersectAll<[HTMLAttributes<HTMLFormElement>]> {
	street?: string;
	city?: string;
	region?: string;
	postalCode?: string;
	country?: string;
	class?: string;
}
