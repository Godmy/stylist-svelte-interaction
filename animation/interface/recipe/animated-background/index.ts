import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
export interface RecipeAnimatedBackground
	extends ComputeIntersectAll<[SlotChildren, SlotClass, SlotTheme]> {
	style?: string;
}
