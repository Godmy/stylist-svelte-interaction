import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeProgressBar
	extends ComputeIntersectAll<
		[
			{
				label?: string;
				valueLabel?: string;
				color?: string;
				trackColor?: string;
				class?: string;
				style?: string;
			}
		]
	> {
	value?: number;
	max?: number;
}
