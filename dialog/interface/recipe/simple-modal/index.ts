import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeSimpleModal extends ComputeIntersectAll<[HTMLAttributes<HTMLDivElement>]> {
	open?: boolean;
	title?: string;
	class?: string;
	onClose?: () => void;
}
