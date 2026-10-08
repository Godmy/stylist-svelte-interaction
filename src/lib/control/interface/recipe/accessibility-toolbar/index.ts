import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeAccessibilityToolbar
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLDivElement> & {
				showFontSizeControls?: boolean;
				showScreenReaderTester?: boolean;
				showFocusIndicator?: boolean;
				showTokenAnimationToggle?: boolean;
				showFocusIndicatorToggle?: boolean;
				showAnimationToggle?: boolean;
				class?: string;
				toolbarClass?: string;
				buttonClass?: string;
				variant?: 'default' | 'minimal' | 'compact';
				size?: 'sm' | 'md' | 'lg';
			},
			SlotChildren
		]
	> {}
