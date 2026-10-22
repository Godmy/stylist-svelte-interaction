import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';

/** Drawer row of one destination: icon, label and badge. */
export interface RecipeNavigationItem extends Omit<HTMLButtonAttributes, 'onselect'> {
	destination: ContractNavigationDestination;
	active?: boolean;
	onSelect?: (id: string) => void;
}
