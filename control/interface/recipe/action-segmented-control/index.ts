import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeActionSegmentedControl extends ComputeIntersectAll<
	[HTMLAttributes<HTMLDivElement>]
> {
	items: string[];
	selectedIndex?: number;
	onValueInput?: (value: number) => void;
	onValueChange?: (value: number) => void;
	onChange?: (value: number) => void;
	class?: string;
}
