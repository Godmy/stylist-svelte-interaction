import type { ContractNavigationAction } from '$stylist/navigation/interface/contract/navigation-action';
import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';
import type { ContractNavigationEntry } from '$stylist/navigation/interface/contract/navigation-entry';

/** Runtime navigator of an activity, passed to its fragment, actions and FAB snippets. */
export interface ContractNavigator {
	/** Top of the back stack. */
	readonly entry: ContractNavigationEntry;
	/** Destination of the top entry. */
	readonly destination: ContractNavigationDestination;
	readonly stack: readonly ContractNavigationEntry[];
	readonly canGoBack: boolean;
	/** The current fragment is a drawer destination (burger instead of Up). */
	readonly isTopLevel: boolean;
	/** Direction of the last transition, for the fragment animation. */
	readonly direction: 'forward' | 'back' | 'replace';
	/** Actions declared from the current fragment or its parent graphs. */
	readonly actions: readonly ContractNavigationAction[];
	/** Follows an action id or opens a destination id; false when the target is unknown. */
	navigate(target: string, args?: Record<string, unknown>): boolean;
	/** Pops the back stack; false at its root. */
	back(): boolean;
	/** Drawer selection: resets the back stack to the start and the chosen destination. */
	select(id: string): void;
	/** The destination or a nested graph containing it is on top of the stack. */
	isActive(id: string): boolean;
}
