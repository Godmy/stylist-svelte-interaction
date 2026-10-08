import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
import type { TokenOrientation } from '$stylist/layout/type/alias/orientation';
import type { TokenSelectionType } from '$stylist/control/type/alias/selection-type';
export interface RecipeToggleGroupRoot
	extends ComputeIntersectAll<[Omit<HTMLAttributes<HTMLDivElement>, 'class'>]> {
	value?: string;
	disabled?: boolean;
	orientation?: TokenOrientation;
	type?: TokenSelectionType;
	class?: string;
	onValueChange?: (event: CustomEvent<{ value: string | string[] | null }>) => void;
}
