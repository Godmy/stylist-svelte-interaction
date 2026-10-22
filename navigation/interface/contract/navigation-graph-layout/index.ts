/** Computed overview of a navigation graph: fragment boxes and transition paths in px. */
export interface ContractNavigationGraphLayout {
	width: number;
	height: number;
	nodes: {
		id: string;
		label: string;
		description?: string;
		/** Nested graph label of the fragment. */
		group?: string;
		/** `drawer` is the pseudo node of top-level transitions. */
		kind: 'fragment' | 'drawer';
		start: boolean;
		topLevel: boolean;
		x: number;
		y: number;
		width: number;
		height: number;
	}[];
	edges: {
		key: string;
		from: string;
		to: string;
		label?: string;
		kind: 'action' | 'drawer';
		/** SVG path data. */
		path: string;
		labelX: number;
		labelY: number;
	}[];
}
