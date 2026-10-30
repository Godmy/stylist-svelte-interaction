export interface SlotSearchSkin {
	/**
	 * Renders the html skin scoped to this component (`[data-search-skin]`). Turn it off
	 * when an ancestor already provides `[data-html-skin]` or the consumer styles natively.
	 * @default true
	 */
	skin?: boolean;
}
