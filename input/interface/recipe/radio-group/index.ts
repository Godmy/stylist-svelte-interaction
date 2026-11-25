import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { TokenOrientation } from '$stylist/layout/type/alias/orientation';
export interface RecipeRadioGroup extends ComputeIntersectAll<
	[Omit<HTMLInputAttributes, 'type' | 'value' | 'name' | 'checked'>]
> {
	name: string;
	value?: string;
	options: {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
		defaultChecked?: boolean;
	}[];
	label?: string;
	description?: string;
	orientation?: TokenOrientation;
	disabled?: boolean;
	required?: boolean;
	error?: string;
	class?: string;
}
