import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenSize } from '$stylist/theme/type/alias/size';
export interface RecipeBurgerMenu extends ComputeIntersectAll<[HTMLAttributes<HTMLButtonElement>]> {
	open?: boolean;
	size?: TokenSize;
	color?: string;
	activeColor?: string;
	class?: string;
	onValueInput?: (event: MouseEvent) => void;
	onValueChange?: (event: MouseEvent) => void;
}
