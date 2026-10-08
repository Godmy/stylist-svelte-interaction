import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeLoading
	extends ComputeIntersectAll<
		[
			{
				label?: string;
				size?: 'sm' | 'md' | 'lg';
				centered?: boolean;
				class?: string;
				style?: string;
			}
		]
	> {
	loading?: boolean;
	label?: string;
}
