import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { RecipeContainer } from '$stylist/layout/interface/recipe/container';
import type { RecipeBorder } from '$stylist/layout/interface/recipe/border';
import type { RecipeBackground } from '$stylist/layout/interface/recipe/background';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotBadge } from '$stylist/layout/interface/slot/badge';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeButtonComposed
	extends ComputeIntersectAll<
		[
			ComputeIntersectAll<
				[
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
					HTMLButtonAttributes
				]
			>,
			SlotChildren
		]
	> {
	loadingLabel?: string;
	block?: boolean;
}
