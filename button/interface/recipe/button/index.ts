import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotButtonAttributesBase } from '$stylist/button/interface/slot/button-attributes-base';
import type { SlotBadge } from '$stylist/layout/interface/slot/badge';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { RecipeBorder } from '$stylist/layout/interface/recipe/border';
import type { RecipeBackground } from '$stylist/layout/interface/recipe/background';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { RecipeContainer } from '$stylist/layout/interface/recipe/container';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeButton
	extends ComputeIntersectAll<
		[
			SlotButtonAttributesBase,
			SlotButtonAttributesBase & {
				variant?: TokenColorTone;
				size?: TokenSize;
				disabled?: boolean;
				loading?: boolean;
				block?: boolean;
				onClick?: () => void;
			},
			SlotChildren,
			SlotText,
			SlotIcon,
			SlotBadge,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSized,
			BehaviorShapeable,
			RecipeContainer,
			RecipeBackground,
			RecipeBorder,
			SlotTheme
		]
	> {
	loadingLabel?: string;
}
