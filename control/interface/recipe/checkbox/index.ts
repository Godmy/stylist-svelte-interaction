import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotToggleInput } from '$stylist/control/interface/slot/toggle-input';
export interface RecipeCheckbox extends ComputeIntersectAll<[SlotToggleInput]> {
	id?: string;
	label?: string;
	description?: string;
	errors?: string[];
	required?: boolean;
	indeterminate?: boolean;
}
