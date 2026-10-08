import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeActionSegmentedControl extends HTMLAttributes<HTMLDivElement> {
	items: string[];
	selectedIndex?: number;
	onValueInput?: (value: number) => void;
	onValueChange?: (value: number) => void;
	onChange?: (value: number) => void;
	class?: string;
}
