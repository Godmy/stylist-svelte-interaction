/** Choosing a site section reports its id; the host decides which one becomes active. */
export interface BehaviorSectionSelect {
	onItemSelect?: (id: string) => void;
}
