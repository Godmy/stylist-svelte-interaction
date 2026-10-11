import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/typography/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeShortcutsPanel extends ComputeIntersectAll<
	[SlotThemeBorder, SlotTypography]
> {
	class?: string;
}
