import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeBreadcrumbSeparator
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLSpanElement> & {
				class?: string;
				children?: Snippet;
			}
		]
	> {}
