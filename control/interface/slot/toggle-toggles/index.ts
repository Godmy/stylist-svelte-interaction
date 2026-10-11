import type { TokenSize } from '$stylist/design-token/type/alias/size';
import type { SlotToggleInput } from '$stylist/control/interface/slot/toggle-input';

export interface SlotToggle extends SlotToggleInput {
	toggleSize?: TokenSize;
}
