import type { ContractNavigationAction } from '$stylist/navigation/interface/contract/navigation-action';
import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';

/** Root navigation graph of a site: its fragments, nested graphs and transitions. */
export interface ContractNavigationGraph extends ContractNavigationDestination {
	destinations: ContractNavigationDestination[];
	/** Declared transitions; top-level destinations are always reachable from the drawer. */
	actions?: ContractNavigationAction[];
}
