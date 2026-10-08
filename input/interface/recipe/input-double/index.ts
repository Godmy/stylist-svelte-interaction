import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
export interface RecipeInputDouble {
	label1?: string;
	label2?: string;
	id1?: string;
	id2?: string;
	value1?: string;
	value2?: string;
	placeholder1?: string;
	placeholder2?: string;
	type1?: HTMLInputAttributes['type'];
	type2?: HTMLInputAttributes['type'];
	disabled1?: boolean;
	disabled2?: boolean;
	errors1?: string[];
	errors2?: string[];
	required1?: boolean;
	required2?: boolean;
	variant?: TokenColorTone;
	size?: TokenSize;
	class?: string;
}
