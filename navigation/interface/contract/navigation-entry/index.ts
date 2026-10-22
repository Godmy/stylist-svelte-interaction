/** Back stack entry: a fragment instance with its arguments. */
export interface ContractNavigationEntry {
	/** Fragment (leaf destination) id. */
	id: string;
	/** Unique per entry; keys the fragment transition. */
	key: string;
	args?: Record<string, unknown>;
}
