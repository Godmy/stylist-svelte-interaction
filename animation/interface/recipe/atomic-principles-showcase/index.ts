import type { HTMLAttributes } from 'svelte/elements';
import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/theme/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeAtomicPrinciplesShowcase
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLElement>, 'class'> &
				SlotThemeBorder &
				SlotTypography & {
					stats?: {
						atoms: number;
						molecules: number;
						organisms: number;
					};
					badgeText?: string;
					title?: string;
					description?: string;
					class?: string;
				}
		]
	> {}
