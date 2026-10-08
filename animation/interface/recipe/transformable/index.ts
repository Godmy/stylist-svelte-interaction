import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorMotion } from '$stylist/animation/interface/behavior/motion';
import type { BehaviorTransform } from '$stylist/animation/interface/behavior/transform';
import type { Snippet } from 'svelte';
import type { TokenAnimation } from '$stylist/theme/type/alias/animation';
import type { TokenDuration } from '$stylist/theme/type/alias/duration';
import type { TokenEasing } from '$stylist/theme/type/alias/easing';
export interface RecipeTransformable
	extends ComputeIntersectAll<
		[SlotTheme, BehaviorMotion, BehaviorTransform, HTMLAttributes<HTMLDivElement>]
	> {
	animation?: TokenAnimation;
	duration?: TokenDuration;
	easing?: TokenEasing;
	delay?: number;
	infinite?: boolean;
	direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
	iterations?: number | 'infinite';
	scale?: number;
	rotate?: number;
	translateX?: number;
	translateY?: number;
	skewX?: number;
	skewY?: number;
	transformOrigin?: string;
	animateOnHover?: boolean;
	animateOnClick?: boolean;
	animateInfinite?: boolean;
	disabled?: boolean;
	children?: Snippet;
	class?: string;
}
