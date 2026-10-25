import type { TokenIconName } from '$stylist/svg/type/alias/icon-name';
export interface RecipeToolButton {
	active?: boolean;
	tool?: string;
	icon?: TokenIconName;
	label?: string;
	onClick?: (tool: string) => void;
	class?: string;
}
