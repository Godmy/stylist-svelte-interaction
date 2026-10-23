/**
 * Destination of a navigation graph: a fragment (leaf) or a nested graph
 * (node with `destinations`), as in an Android navigation graph.
 */
export interface ContractNavigationDestination {
	/** Unique id across the whole graph; actions and the back stack refer to it. */
	id: string;
	/** Title of the top app bar and of the drawer item. */
	label: string;
	/** Svg icon name shown in the drawer item. */
	icon?: string;
	/**
	 * Address of the screen for URL-bound activities; `:name` segments take the entry
	 * args (`/admin/orders/:number`). See `resolveNavigationHref`.
	 */
	href?: string;
	/** Short secondary line for the drawer and the graph overview. */
	description?: string;
	/** Counter or status chip of the drawer item. */
	badge?: string | number;
	/**
	 * Drawer destination: shows the burger instead of the Up button and resets the back
	 * stack when selected. Without any flag in the graph the root children are top-level.
	 */
	topLevel?: boolean;
	/** Hides the floating action button on this fragment; it is shown by default. */
	fab?: boolean;
	disabled?: boolean;
	/** Nested destinations: turns the node into a nested graph. */
	destinations?: ContractNavigationDestination[];
	/** Entry child of a nested graph; the first child when omitted. */
	start?: string;
}
