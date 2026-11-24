import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeAccordionGroup extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			children?: Snippet;
			defaultValues?: string[];
			value?: string[];
			onValueChange?: (value: string[]) => void;
			class?: string;
		}
	]
> {}
