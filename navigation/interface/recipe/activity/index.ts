import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ContractNavigationEntry } from '$stylist/navigation/interface/contract/navigation-entry';
import type { ContractNavigationGraph } from '$stylist/navigation/interface/contract/navigation-graph';
import type { ContractNavigator } from '$stylist/navigation/interface/contract/navigator';

/**
 * Activity: app shell with a top app bar, a navigation drawer, switching fragments
 * of a navigation graph and an optional floating action button.
 */
export interface RecipeActivity extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	graph: ContractNavigationGraph;
	/** Deep-linked destination id. */
	initial?: string;
	/** App name in the drawer header. */
	heading?: string;
	/** Media query of the permanent drawer; `(min-width: 1024px)` by default. */
	permanentDrawer?: string;
	/** Current fragment content; switch on `navigator.destination.id`. */
	fragment: Snippet<[ContractNavigator]>;
	/** Action buttons on the right of the top app bar. */
	actions?: Snippet<[ContractNavigator]>;
	/** Floating action button; hidden on destinations with `fab: false`. */
	fab?: Snippet<[ContractNavigator]>;
	drawerHeader?: Snippet;
	drawerFooter?: Snippet;
	onNavigate?: (entry: ContractNavigationEntry) => void;
}
