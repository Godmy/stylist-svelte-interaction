import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeExportPanel
	extends ComputeIntersectAll<
		[
			SlotChildren,
			SlotText,
			SlotText,
			BehaviorSelectable<string>,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {
	class?: string;
	onexport?: (
		event: CustomEvent<{
			format: 'png' | 'jpeg' | 'svg' | 'pdf';
			includeLegend: boolean;
			includeFilters: boolean;
		}>
	) => void;
	onExport?: (detail: {
		format: 'png' | 'jpeg' | 'svg' | 'pdf';
		includeLegend: boolean;
		includeFilters: boolean;
	}) => void;
}
