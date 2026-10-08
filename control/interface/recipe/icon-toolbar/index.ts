import type { TokenOrientation } from '$stylist/layout/type/alias/orientation';
export interface RecipeIconToolbar {
	items: readonly { name: string }[];
	active?: string;
	label?: string;
	orientation?: TokenOrientation;
	showLabel?: boolean;
	availableItems?: readonly string[];
	emptyText?: string;
	onSelect?: (name: string) => void;
	class?: string;
}
