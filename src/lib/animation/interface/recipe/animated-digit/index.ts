import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorMotion } from '$stylist/animation/interface/behavior/motion';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { Snippet } from 'svelte';
import type { TokenAnimation } from '$stylist/theme/type/alias/animation';
import type { TokenDuration } from '$stylist/theme/type/alias/duration';
import type { TokenEasing } from '$stylist/theme/type/alias/easing';
export interface RecipeAnimatedDigit extends ComputeIntersectAll<[BehaviorMotion, SlotTheme]> {
	animation?: TokenAnimation;
	duration?: TokenDuration;
	easing?: TokenEasing;
	delay?: number;
	infinite?: boolean;
	direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
	iterations?: number | 'infinite';
	from?: number;
	to?: number;
	format?: (value: number) => string;
	children?: Snippet;
	class?: string;
	style?: string;
}
