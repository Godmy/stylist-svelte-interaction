import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDocumentPreview extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			title?: string;
			content?: string;
			format?: 'text' | 'json' | 'markdown';
			class?: string;
		}
	]
> {}
