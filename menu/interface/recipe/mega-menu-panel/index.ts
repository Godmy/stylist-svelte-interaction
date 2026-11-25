import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
import type { SlotMegaMenuSection } from '$stylist/menu/interface/slot/mega-menu-section';

export interface RecipeMegaMenuPanel extends ComputeIntersectAll<
	[Omit<HTMLAttributes<HTMLDivElement>, 'children'>]
> {
	/** Section whose content the panel renders */
	section: SlotMegaMenuSection;
	/** Hide link descriptions */
	compact?: boolean;
	/** Additional CSS classes */
	class?: string;
	/** Fired when any link inside the panel is activated */
	onNavigate?: (event: MouseEvent) => void;
}
