import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
export interface SlotTabPanel
	extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
		SlotChildren {
	id: string;
	disabled?: boolean;
}
