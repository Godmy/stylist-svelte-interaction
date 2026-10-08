export interface RecipeMarqueeTicker {
	/** Phrases to loop. Rendered joined by `separator`, then repeated seamlessly. */
	items: string[];
	/** Shown between repeats of the joined phrase. */
	separator?: string;
	/** Approximate seconds for one pass of the text across the screen; auto-derived from text length when omitted. */
	speedSeconds?: number;
	/** Initial loop progress in percent. `0` starts at the right edge, `100` starts one full loop ahead. */
	startPosition?: number;
	/** Background color for the ticker strip. */
	backgroundColor?: string;
	/** Text color for ticker letters. */
	textColor?: string;
	/** Ticker strip height, e.g. `"48px"` or `"3rem"`. */
	height?: string;
	/** Letter size, e.g. `"18px"` or `"1.125rem"`. */
	fontSize?: string;
	/** Color that letters dissolve into and appear from when the text changes. */
	letterTransitionColor?: string;
	/** Milliseconds for the text change appear/disappear effect. */
	letterTransitionMs?: number;
	/** How letters enter at the inline-start edge. */
	appearEffect?: 'none' | 'fade' | 'soft';
	/** How letters leave at the inline-end edge. */
	disappearEffect?: 'none' | 'fade' | 'soft';
	/** Rotate the ticker strip 180 degrees. */
	upsideDown?: boolean;
	/** Render without the scrolling animation. */
	still?: boolean;
	class?: string;
}
