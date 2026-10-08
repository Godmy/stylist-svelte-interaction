import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotButtonDom } from '$stylist/button/interface/slot/button-dom';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeButtonElement
	extends ComputeIntersectAll<
		[
			{
				class?: string;
			},
			SlotButtonDom,
			SlotChildren
		]
	> {
	[prop: string]: unknown;
}
