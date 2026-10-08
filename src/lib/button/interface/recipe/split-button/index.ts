import type { Snippet } from 'svelte';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotButtonAttributesBase } from '$stylist/button/interface/slot/button-attributes-base';
import type { SplitButtonItem } from '$stylist/button/type/object/split-button-item';
export interface RecipeSplitButton
	extends ComputeIntersectAll<
		[
			SlotButtonAttributesBase,
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {
	children?: Snippet;
	items: SplitButtonItem[];
	primaryAction: () => void;
	primaryLabel?: string;
	variant?: TokenColorTone;
	size?: TokenSize;
	block?: boolean;
	loadingLabel?: string;
}
