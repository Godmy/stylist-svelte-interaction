import { untrack } from 'svelte';
import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerMotion } from '$stylist/animation/class/manager/motion';
import type { RecipeAnimatedDigit } from '$stylist/animation/interface/recipe/animated-digit';
import { TOKEN_NAMED_EASINGS } from '$stylist/animation/const/array/named-easings';
import { parseDurationMs } from '$stylist/animation/function/transform/duration-ms';
import { prefersReducedMotion } from '$stylist/animation/function/check/reduced-motion';

// The interpolation only knows the named curves; a cubic-bezier token (the
// motion default) would fall back to linear, which reads stiff on a counter.
export function createAnimatedDigitState(getProps: () => RecipeAnimatedDigit) {
	const props = $derived(getProps());
	// SlotState
	let isAnimating = $state(false);
	// `from` is only the starting value: without it the counter starts at 0
	// and counts up on mount; with `from === to` it renders the final value
	// straight away (also in SSR) and only animates later changes.
	let currentValue = $state(
		untrack(() => (getProps().startWhenVisible ? (getProps().to ?? 1) : (getProps().from ?? 0)))
	);
	let started = $state(untrack(() => !getProps().startWhenVisible));
	let element = $state<HTMLElement | null>(null);
	let frame: number | undefined;

	// Нормализация props
	const normalizedProps = $derived(ManagerMotion.normalizeAnimateContract(props));

	// Вычисляемые классы
	const classes = $derived.by(() =>
		ClassNamesManager.merge(
			'c-animated-digit',
			isAnimating && 'c-animated-digit--animating',
			normalizedProps.infinite && 'c-animated-digit--infinite',
			typeof props.class === 'string' ? props.class : undefined
		)
	);

	// Вычисляемые inline стили
	const inlineStyle = $derived(typeof props.style === 'string' ? props.style : undefined);

	// Форматирование значения
	const formattedValue = $derived.by(() => {
		if (props.format) {
			return props.format(currentValue);
		}
		if (props.precision !== undefined && Number.isFinite(props.precision))
			return currentValue.toFixed(Math.max(0, Math.min(20, Math.trunc(props.precision))));
		return currentValue.toString();
	});
	const children = $derived(props.children);
	$effect(() => {
		if (props.startWhenVisible && !started) currentValue = props.to ?? 1;
	});
	$effect(() => {
		if (started || !element) return;
		if (!props.startWhenVisible || typeof IntersectionObserver === 'undefined') {
			started = true;
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				if (!prefersReducedMotion()) currentValue = props.from ?? 0;
				started = true;
				observer.disconnect();
			},
			{ threshold: 0.6 }
		);
		observer.observe(element);
		return () => observer.disconnect();
	});

	// Авто-запуск при изменении props.to: a new target rolls on from whatever
	// is on screen now, so a quick second change never jumps back to `from`.
	$effect(() => {
		if (!started) return;
		const to = normalizedProps.to ?? 1;
		untrack(() => startAnimation(to));
		return cancelFrame;
	});

	function cancelFrame() {
		if (frame !== undefined) cancelAnimationFrame(frame);
		frame = undefined;
	}

	// Запуск анимации
	function startAnimation(to: number = normalizedProps.to ?? 1) {
		cancelFrame();
		const from = currentValue;
		const duration = parseDurationMs(normalizedProps.duration);
		const delay = normalizedProps.delay ?? 0;
		if (from === to || duration <= 0 || prefersReducedMotion()) {
			isAnimating = false;
			currentValue = to;
			return;
		}
		const easing = TOKEN_NAMED_EASINGS.includes(String(props.easing))
			? String(props.easing)
			: 'ease-out';
		isAnimating = true;
		const startTime = performance.now() + delay;

		function animate(now: number) {
			const progress = Math.min(Math.max((now - startTime) / duration, 0), 1);
			currentValue = ManagerMotion.interpolateValue(from, to, progress, easing);

			if (progress < 1 || normalizedProps.infinite) {
				frame = requestAnimationFrame(animate);
			} else {
				frame = undefined;
				isAnimating = false;
				currentValue = to;
			}
		}

		frame = requestAnimationFrame(animate);
	}

	// Остановка анимации
	function stopAnimation() {
		cancelFrame();
		isAnimating = false;
	}

	// Сброс анимации
	function resetAnimation() {
		stopAnimation();
		currentValue = normalizedProps.from ?? 0;
	}

	return {
		get element() {
			return element;
		},
		set element(value: HTMLElement | null) {
			element = value;
		},
		get prefix() {
			return props.prefix ?? '';
		},
		get suffix() {
			return props.suffix ?? '';
		},
		// SlotState getters
		get isAnimating() {
			return isAnimating;
		},
		get currentValue() {
			return currentValue;
		},
		get formattedValue() {
			return formattedValue;
		},
		get children() {
			return children;
		},

		// SlotState
		get classes() {
			return classes;
		},
		get inlineStyle() {
			return inlineStyle;
		},

		// Actions
		startAnimation,
		stopAnimation,
		resetAnimation
	};
}

export default createAnimatedDigitState;
