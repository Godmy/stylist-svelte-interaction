import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { Snippet } from 'svelte';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
export interface RecipeSkeleton extends ComputeIntersectAll<[SlotDimensionable]> {
	variant?: 'text' | 'circle' | 'rectangle';
	lines?: number;
	animated?: boolean;
	children?: Snippet;
	class?: string;
	style?: string;
}
