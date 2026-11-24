import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDialog extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			open?: boolean;
			title?: string;
			description?: string;
			class?: string;
			onClose?: () => void;
		}
	]
> {}
