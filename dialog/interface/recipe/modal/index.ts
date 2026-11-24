import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeModal extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			open?: boolean;
			title?: string;
			class?: string;
			onClose?: () => void;
		}
	]
> {}
