export interface RecipeToolButton {
	active?: boolean;
	tool?: string;
	icon?: string;
	label?: string;
	onClick?: (tool: string) => void;
	class?: string;
}
