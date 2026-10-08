import type { TOKEN_FLOW } from '$stylist/calendar/const/array/flow';
import type { Snippet } from 'svelte';
import type { SlotContent } from '$stylist/theme/interface/slot/content';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenOrientation } from '$stylist/layout/type/alias/orientation';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeTimeline extends ComputeIntersectAll<[HTMLAttributes<HTMLDivElement>]> {
	items: (ComputeIntersectAll<[SlotContent]> & {
		id: string;
		title: string;
		date?: string;
		status?: (typeof TOKEN_FLOW)[number];
		icon?: Snippet;
	})[];
	orientation?: TokenOrientation;
	class?: string;
	itemClass?: string;
	connectorClass?: string;
	iconClass?: string;
}
