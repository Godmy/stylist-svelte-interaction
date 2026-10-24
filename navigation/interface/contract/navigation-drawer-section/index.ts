import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';

/** Group of drawer destinations; a nested graph gives its label to the group. */
export interface ContractNavigationDrawerSection {
	label?: string;
	/** Icon of the functional section, independent of its children. */
	icon?: string;
	iconSvg?: string;
	destinations: ContractNavigationDestination[];
	/** Nested labelled groups within a functional section. */
	sections?: ContractNavigationDrawerSection[];
}
