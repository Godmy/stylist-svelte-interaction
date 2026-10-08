import type { HTMLButtonAttributes } from 'svelte/elements';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
export interface SlotButtonAttributesBase extends Omit<HTMLButtonAttributes, 'class'>, SlotClass {}
