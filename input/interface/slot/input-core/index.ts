import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
export interface SlotInputCore<V extends string = TokenColorTone, S extends string = TokenSize> {
	variant?: V;
	size?: S;
	disabled?: boolean;
	error?: boolean;
	class?: string;
	block?: boolean;
}
