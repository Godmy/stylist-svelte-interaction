import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeInputName extends ComputeIntersectAll<[Omit<SlotInputBase, 'type'>]> {
	autocomplete?:
		| 'name'
		| 'given-name'
		| 'family-name'
		| 'additional-name'
		| 'nickname'
		| 'off'
		| 'on';
}
