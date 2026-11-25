import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeTick extends ComputeIntersectAll<[HTMLAttributes<HTMLDivElement>]> {
	value?: number;
	position?: number;
	active?: boolean;
	label?: string;
	class?: string;
}
