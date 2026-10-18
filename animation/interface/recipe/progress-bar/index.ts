import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeProgressBar extends ComputeIntersectAll<
	[
		{
			label?: string;
			valueLabel?: string;
			color?: string;
			trackColor?: string;
			class?: string;
			style?: string;
		},
		HTMLAttributes<HTMLDivElement>
	]
> {
	value?: number;
	max?: number;
}
