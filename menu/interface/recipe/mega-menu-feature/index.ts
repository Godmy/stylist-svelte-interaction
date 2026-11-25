import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { SlotMegaMenuFeature } from '$stylist/menu/interface/slot/mega-menu-feature';

export interface RecipeMegaMenuFeature extends ComputeIntersectAll<
	[Omit<HTMLAnchorAttributes, 'href' | 'title' | 'children'>, SlotMegaMenuFeature]
> {
	/** Additional CSS classes */
	class?: string;
	/** Fired when the card is activated */
	onNavigate?: (event: MouseEvent) => void;
}
