import type { HTMLButtonAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { Snippet } from 'svelte';
export interface SlotTab extends Omit<HTMLButtonAttributes, 'disabled' | 'onclick'> {
	id: string;
	selected?: boolean;
	variant?: TokenColorTone;
	size?: TokenSize;
	class?: string;
	children?: Snippet<[]>;
	ariaLabel?: string;
	disabled?: boolean;
}
