import type { SlotInputLabel } from '$stylist/input/interface/slot/input-label';
import type { SlotInputWithLabel } from '$stylist/input/interface/slot/input-with-label';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeInputLabel
	extends ComputeIntersectAll<[SlotInputWithLabel, SlotInputLabel]> {}
