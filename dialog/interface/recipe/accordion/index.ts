import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeAccordion extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			children?: Snippet;
			defaultValue?: string;
			class?: string;
		}
	]
> {}
