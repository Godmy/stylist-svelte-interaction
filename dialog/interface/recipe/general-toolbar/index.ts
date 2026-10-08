import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeGeneralToolbar
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLDivElement> & {
				toolbarItems?: {
					id: string;
					label: string;
					icon: string;
					action: () => void;
				}[];
				compact?: boolean;
				disabled?: boolean;
				class?: string;
			}
		]
	> {}
