import type { SlotInputLabel } from '$stylist/input/interface/slot/input-label';
import type { SlotInputWithLabel } from '$stylist/input/interface/slot/input-with-label';
import type { HTMLLabelAttributes } from 'svelte/elements';
export interface RecipeInputLabel
	extends SlotInputWithLabel, SlotInputLabel, Omit<HTMLLabelAttributes, 'id' | 'children'> {}
