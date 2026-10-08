import type { HTMLAttributes } from 'svelte/elements';
import type { StylistTabItem } from '$stylist/dialog/interface/slot/stylist-tab-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeStylistTab
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
				class?: string;
				items?: StylistTabItem[];
				selectedId?: string;
				onSelect?: (item: StylistTabItem) => void;
			}
		]
	> {}
