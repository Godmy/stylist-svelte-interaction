/** Choosing a destination closes the menu and reports its id. */
export interface BehaviorSiteMenu {
	onItemSelect?: (id: string) => void;
}
