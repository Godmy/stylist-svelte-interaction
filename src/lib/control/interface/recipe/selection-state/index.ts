import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SelectionMode } from '$stylist/control/type/alias/selection-mode/index';
export interface RecipeSelectionState extends ComputeIntersectAll<[]> {
	selectedIds: Set<string>;
	mode: SelectionMode;
	isSelecting: boolean;
	marqueeStart: { x: number; y: number } | null;
	marqueeCurrent: { x: number; y: number } | null;
}
