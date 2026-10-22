/**
 * Declared transition between destinations. An action from a nested graph is
 * available on every destination inside it.
 */
export interface ContractNavigationAction {
	/** Unique action id; `navigate(id)` triggers it from an allowed destination. */
	id: string;
	/** Source destination or nested graph id. */
	from: string;
	/** Target destination; a nested graph resolves to its start fragment. */
	to: string;
	/** Caption of the transition in the graph overview. */
	label?: string;
	/** Pops the back stack down to this destination before pushing the target. */
	popUpTo?: string;
	/** Also pops the `popUpTo` destination itself. */
	popUpToInclusive?: boolean;
	/** Reuses the current entry when the target is already on top. */
	singleTop?: boolean;
}
