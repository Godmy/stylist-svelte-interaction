import type { HTMLAttributes } from 'svelte/elements';
import type { SlotMegaMenuColumn } from '$stylist/menu/interface/slot/mega-menu-column';

export interface RecipeMegaMenuColumn
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'>,
		Omit<SlotMegaMenuColumn, 'id'> {
	/** Hide link descriptions */
	compact?: boolean;
	/** Additional CSS classes */
	class?: string;
	/** Fired when any link of the column is activated */
	onNavigate?: (event: MouseEvent) => void;
}
