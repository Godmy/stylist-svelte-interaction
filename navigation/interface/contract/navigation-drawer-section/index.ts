import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';

/** Group of drawer destinations; a nested graph gives its label to the group. */
export interface ContractNavigationDrawerSection {
	label?: string;
	destinations: ContractNavigationDestination[];
}
