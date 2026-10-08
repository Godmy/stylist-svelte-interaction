import type { SlotToggleInput } from '$stylist/control/interface/slot/toggle-input';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeRadio
	extends ComputeIntersectAll<
		[
			SlotToggleInput & {
				value: string;
				label?: string;
			},
			HTMLAttributes<HTMLInputElement>
		]
	> {}
