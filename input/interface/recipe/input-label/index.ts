import type { SlotInputWithLabel } from '$stylist/input/interface/slot/input-with-label';
import type { HTMLLabelAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/design-token/type/alias/size';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeInputLabel extends ComputeIntersectAll<
	[
		SlotInputWithLabel,
		{
			labelId?: string;
			size?: TokenSize;
			disabled?: boolean;
			required?: boolean;
		},
		Omit<HTMLLabelAttributes, 'id' | 'children'>
	]
> {}
