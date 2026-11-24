import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeTabPanel extends ComputeIntersectAll<
	[
		Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
		SlotChildren,
		{
			id: string;
			disabled?: boolean;
		}
	]
> {}
