import type { RecipeMarqueeTicker } from '$stylist/animation/interface/recipe/marquee-ticker';
import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';
/** Reactive behavior of marquee-ticker; props are read lazily when needed. */
export function createMarqueeTickerComponentState(
	getProps: () => Pick<
		RecipeMarqueeTicker,
		'items' | 'separator' | 'speedSeconds' | 'startPosition' | 'letterTransitionMs' | 'still'
	> & {
		separator: Exclude<RecipeMarqueeTicker['separator'], undefined>;
		startPosition: Exclude<RecipeMarqueeTicker['startPosition'], undefined>;
		letterTransitionMs: Exclude<RecipeMarqueeTicker['letterTransitionMs'], undefined>;
		still: Exclude<RecipeMarqueeTicker['still'], undefined>;
	}
) {
	const props = $derived(getProps());
	const motionPreference = createMotionPreferenceState();
	const REPEATS = 12;
	// The track always renders REPEATS copies of the text (for a seamless loop
	// on short phrases), but scaling the duration by the full REPEATS count
	// reads as too slow on screen. This smaller factor keeps the loop seamless
	// while landing at a comfortable reading pace.
	const PACE = 4;
	const text = $derived(props['items'].filter(Boolean).join(`  ${props['separator']}  `));
	const repeats = $derived(Array.from({ length: REPEATS }, () => text));
	const duration = $derived((props['speedSeconds'] ?? Math.max(10, text.length * 0.22)) * PACE);
	const startProgress = $derived(Math.min(100, Math.max(0, props['startPosition'])));
	const animated = $derived(
		!props['still'] && !motionPreference.prefersReducedMotion && text.length > 0
	);
	const transitionDuration = $derived(
		motionPreference.prefersReducedMotion ? 0 : props['letterTransitionMs']
	);
	function lettersFromBackground(_node: Element, params: { duration?: number } = {}) {
		const durationMs = params.duration ?? 620;

		return {
			duration: durationMs,
			css: (t: number) => `
				opacity: ${t};
				filter: blur(${(1 - t) * 0.3}em);
				color: color-mix(in srgb, var(--marquee-ticker-color, currentColor) ${t * 100}%, var(--marquee-ticker-letter-transition-color, transparent));
			`
		};
	}
	function lettersIntoBackground(_node: Element, params: { duration?: number } = {}) {
		const durationMs = params.duration ?? 620;

		return {
			duration: durationMs,
			css: (t: number) => `
				opacity: ${t};
				filter: blur(${(1 - t) * 0.3}em);
				color: color-mix(in srgb, var(--marquee-ticker-color, currentColor) ${t * 100}%, var(--marquee-ticker-letter-transition-color, transparent));
			`
		};
	}
	return {
		get text(): typeof text {
			return text;
		},
		get repeats(): typeof repeats {
			return repeats;
		},
		get duration(): typeof duration {
			return duration;
		},
		get startProgress(): typeof startProgress {
			return startProgress;
		},
		get animated(): typeof animated {
			return animated;
		},
		get transitionDuration(): typeof transitionDuration {
			return transitionDuration;
		},
		get lettersFromBackground(): typeof lettersFromBackground {
			return lettersFromBackground;
		},
		get lettersIntoBackground(): typeof lettersIntoBackground {
			return lettersIntoBackground;
		}
	};
}
export default createMarqueeTickerComponentState;
