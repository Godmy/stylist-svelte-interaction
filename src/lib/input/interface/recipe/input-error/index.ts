import type { RecipeInputHelper } from '$stylist/input/interface/recipe/input-helper';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeInputError
	extends ComputeIntersectAll<[RecipeInputHelper<HTMLParagraphElement>]> {
	visible?: boolean;
}
