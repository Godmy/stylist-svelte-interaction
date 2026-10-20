import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeLoading extends ComputeIntersectAll<
	[
		{
			label?: string;
			size?: 'sm' | 'md' | 'lg';
			centered?: boolean;
			class?: string;
			style?: string;
		},
		HTMLAttributes<HTMLDivElement>
	]
> {
	loading?: boolean;
	label?: string;
}
