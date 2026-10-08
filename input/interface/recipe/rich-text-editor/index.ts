import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeRichTextEditor extends ComputeIntersectAll<[]> {
	value?: string;
	placeholder?: string;
	onValueInput?: (content: string) => void;
	onValueChange?: (content: string) => void;
	onInput?: (content: string) => void;
	onChange?: (content: string) => void;
	showToolbar?: boolean;
	toolbarPosition?: 'top' | 'bottom';
	class?: string;
	toolbarClass?: string;
	editorClass?: string;
}
