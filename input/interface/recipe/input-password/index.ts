import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeInputPassword extends ComputeIntersectAll<[Omit<SlotInputBase, 'type'>]> {
	showPassword?: boolean;
	allowTogglePassword?: boolean;
	showPasswordStrength?: boolean;
}
