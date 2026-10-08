import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotButtonAttributesBase } from '$stylist/button/interface/slot/button-attributes-base';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotBadge } from '$stylist/layout/interface/slot/badge';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeFollowButton
	extends ComputeIntersectAll<
		[
			SlotButtonAttributesBase,
			SlotText,
			SlotBadge,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {
	isFollowing?: boolean;
	showText?: boolean;
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	followingText?: string;
	unfollowText?: string;
	onFollow?: () => void | Promise<void>;
	onUnfollow?: () => void | Promise<void>;
}
