export interface RecipePhraseArcFlight {
	phrase: string;
	points?: {
		x: number;
		y: number;
	}[];
	pathText?: string;
	progress?: number;
	width?: number;
	height?: number;
	amplitude?: number;
	stagger?: number;
	highlight?: boolean;
	highlightIntensity?: number;
	showPath?: boolean;
	still?: boolean;
	class?: string;
}
