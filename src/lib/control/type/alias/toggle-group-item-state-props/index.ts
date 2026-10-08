import type { RecipeToggleGroupItem as RecipeToggleGroupItem } from '$stylist/control/interface/recipe/toggle-group-item';

export type ToggleGroupItemStateProps = RecipeToggleGroupItem & {
	groupValue?: string | string[] | null;
	groupDisabled?: boolean;
	updateValue?: (value: string) => void;
};
