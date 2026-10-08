import type { HTMLAttributes } from 'svelte/elements';
import type { SlotComponentLibraryStats } from '$stylist/animation/interface/slot/component-library-stats';
import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/theme/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeComponentLibraryStats
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLDivElement>, 'class'> &
				SlotThemeBorder &
				SlotTypography & {
					stats: SlotComponentLibraryStats;
					sectionId?: string;
					animateOnVisible?: boolean;
					durationMs?: number;
					steps?: number;
					class?: string;
				}
		]
	> {}
