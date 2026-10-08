import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
export interface RecipeInputGroup extends ComputeIntersectAll<[Omit<SlotInputBase, 'type'>]> {
	htmlFor?: string;
	buttonLabel?: string;
	buttonVariant?: TokenColorTone;
	buttonDisabled?: boolean;
	onButtonClick?: () => void;
	onValueInput?: (value: string) => void;
	onValueChange?: (value: string) => void;
}
