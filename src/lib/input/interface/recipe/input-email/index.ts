import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeInputEmail extends ComputeIntersectAll<[Omit<SlotInputBase, 'type'>]> {
	autocomplete?: 'email' | 'off' | 'on';
}
