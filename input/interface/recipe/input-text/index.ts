import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
import type { TokenSize } from '$stylist/design-token/type/alias/size';
export interface RecipeInputText extends SlotInputBase<TokenColorTone, TokenSize> {
	/** Current text for bind:value; defaultValue defines the native reset value. */
	value?: string;
}
