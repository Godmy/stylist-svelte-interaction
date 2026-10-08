import type { SlotAutoComplete } from '$stylist/search/interface/slot/auto-complete';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
export interface RecipeAutoComplete
	extends ComputeIntersectAll<
		[SlotAutoComplete, SlotTheme, SlotText, SlotText, SlotIcon, HTMLAttributes<HTMLInputElement>]
	> {}
