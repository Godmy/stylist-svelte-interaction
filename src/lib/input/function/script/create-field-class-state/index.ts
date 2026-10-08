import { createFieldPresetState } from '$stylist/input/function/script/create-field-preset-state';
import type { SlotInputStateOptions } from '$stylist/input/interface/slot/input-state-options';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';

export function createFieldClassState(
	props: SlotInputStateOptions<TokenColorTone, TokenSize> & Record<string, unknown>,
	className: string
) {
	const state = createFieldPresetState(props);
	return {
		...state,
		classes: [className, typeof props.class === 'string' ? props.class : '']
			.filter(Boolean)
			.join(' ')
	};
}
