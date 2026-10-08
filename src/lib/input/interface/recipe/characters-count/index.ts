import type { RecipeInputHelper } from '$stylist/input/interface/recipe/input-helper';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeCharactersCount
	extends ComputeIntersectAll<[RecipeInputHelper<HTMLDivElement>]> {
	current?: number;
	max?: number;
	showPercentage?: boolean;
}
