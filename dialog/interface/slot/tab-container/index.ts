import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
export interface SlotTabContainer
	extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
		SlotChildren {
	disabled?: boolean;
}
