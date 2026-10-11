import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
import type { TokenSize } from '$stylist/design-token/type/alias/size';
export interface SlotInputStateOptions<
	V extends string = TokenColorTone,
	S extends string = TokenSize
> {
	variant?: V;
	size?: S;
	disabled?: boolean;
	loading?: boolean;
	error?: boolean;
	block?: boolean;
	class?: string;
	ariaLabel?: string;
}
