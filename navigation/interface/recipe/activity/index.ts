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
	/**
	 * Controlled current destination id, e.g. from the router. When it changes from
	 * outside (a link, a reload, the browser Back button) the back stack is synced to it
	 * without calling `onNavigate`; takes precedence over `initial`.
	 */
	current?: string;
	/** Args of the `current` destination, e.g. route params. */
	currentArgs?: Record<string, unknown>;
	/** App name in the drawer header. */
	heading?: string;
	/** Media query of the permanent drawer; `(min-width: 1024px)` by default. */
	permanentDrawer?: string;
	/** SSR/hydration fallback for the permanent-drawer query; false by default. */
	permanentDrawerFallback?: boolean;
	/**
	 * `false` renders no navigation drawer: top-level fragments show no navigation icon,
	 * inner ones the Up button. For an activity nested in a sheet or a dialog.
	 */
	drawer?: boolean;
	/**
	 * `false` switches fragments without the slide-in, e.g. for a full-screen workspace
	 * where moving content distracts; reduced motion disables it as well.
	 */
	animated?: boolean;
	/** Labelled drawer sections (nested graphs) as an accordion, one open at a time. */
	drawerAccordion?: boolean;
	/** Keep every labelled drawer section expanded. */
	drawerExpandAll?: boolean;
	/** Current fragment content; switch on `navigator.destination.id`. */
	fragment: Snippet<[ContractNavigator]>;
	/** Action buttons on the right of the top app bar. */
	actions?: Snippet<[ContractNavigator]>;
	/** Floating action button; hidden on destinations with `fab: false`. */
	fab?: Snippet<[ContractNavigator]>;
	drawerHeader?: Snippet;
	/** Footer receives navigation and a callback to dismiss a modal drawer. */
	drawerFooter?: Snippet<[ContractNavigator, () => void]>;
	onNavigate?: (entry: ContractNavigationEntry) => void;
}
