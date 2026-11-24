import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeFormFooter extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			primaryButtonLabel?: string;
			secondaryButtonLabel?: string;
			primaryButtonDisabled?: boolean;
			secondaryButtonDisabled?: boolean;
			showSecondaryButton?: boolean;
			onPrimaryClick?: () => void;
			onSecondaryClick?: () => void;
			class?: string;
			primaryButtonClass?: string;
			secondaryButtonClass?: string;
			actionsClass?: string;
		},
		BehaviorClickable,
		BehaviorFocusable,
		BehaviorSizable
	]
> {}
