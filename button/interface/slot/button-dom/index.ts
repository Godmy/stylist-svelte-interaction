import type { HTMLButtonAttributes } from 'svelte/elements';
export interface SlotButtonDom
	extends Omit<HTMLButtonAttributes, 'class' | 'disabled' | 'onclick'> {}
