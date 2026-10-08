import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
export interface RecipeChip
	extends ComputeIntersectAll<[SlotTheme, SlotChildren, HTMLAttributes<HTMLDivElement>]> {
	variant?: TokenColorTone;
	size?: TokenSize;
	disabled?: boolean;
	label?: string;
	closable?: boolean;
	onClick?: () => void;
	onClose?: () => void;
	text?: string;
	icon?: Snippet;
	content?: Snippet;
}
