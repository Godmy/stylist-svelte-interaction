import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotToggleBase } from '$stylist/control/interface/slot/toggle-base';
import type { HTMLInputAttributes } from 'svelte/elements';

export interface SlotToggleInput
	extends ComputeIntersectAll<
		[Omit<HTMLInputAttributes, 'size' | 'disabled' | 'checked' | 'class'>, SlotToggleBase]
	> {
	checked?: boolean;
}
