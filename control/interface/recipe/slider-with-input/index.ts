import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeSliderWithInput extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			value?: number;
			min?: number;
			max?: number;
			step?: number;
			disabled?: boolean;
			showInput?: boolean;
			inputWidth?: string;
			class?: string;
			sliderClass?: string;
			inputClass?: string;
			onValueInput?: (value: number) => void;
			onValueChange?: (value: number) => void;
			onInput?: (value: number) => void;
			onChange?: (value: number) => void;
		}
	]
> {}
