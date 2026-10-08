import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
export interface RecipeInputText
	extends ComputeIntersectAll<[SlotInputBase<TokenColorTone, TokenSize>]> {}
