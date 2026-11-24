import type { HTMLInputAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeRangeSlider extends ComputeIntersectAll<
	[
		Omit<HTMLInputAttributes, 'type' | 'value' | 'min' | 'max' | 'step'>,
		{
			id: string;
			label?: string;
			value?: number | [number, number];
			min?: number;
			max?: number;
			step?: number;
			showValue?: boolean;
			disabled?: boolean;
			description?: string;
			range?: boolean;
			class?: string;
		}
	]
> {}
