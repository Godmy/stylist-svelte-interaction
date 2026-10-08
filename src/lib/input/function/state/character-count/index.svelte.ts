import { createFieldPresetState } from '$stylist/input/function/script/create-field-preset-state';
import { resolveCharacterCountState } from '$stylist/input/function/script/resolve-character-count-state';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { SlotInputStateOptions } from '$stylist/input/interface/slot/input-state-options';

const COLOR_CLASS_BY_VARIANT: Record<'default' | 'warning' | 'danger', string> = {
	default: '',
	warning: 'characters-count--warning',
	danger: 'characters-count--danger'
};

export function createCharacterCountState(
	ratio: number,
	props: SlotInputStateOptions<TokenColorTone, TokenSize> & Record<string, unknown>
) {
	const state = createFieldPresetState(props);
	const variant = resolveCharacterCountState(ratio);
	const colorClass = COLOR_CLASS_BY_VARIANT[variant];

	return {
		...state,
		colorClass
	};
}

export default createCharacterCountState;
