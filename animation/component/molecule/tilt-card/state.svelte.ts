import { pointerPosition } from '$stylist/animation/function/transform/pointer-position';
import { tiltSample } from '$stylist/animation/function/transform/tilt-sample';
import type { RecipeTiltCard } from '$stylist/animation/interface/recipe/tilt-card';
/** Reactive behavior of tilt-card; props are read lazily when needed. */
export function createTiltCardComponentState(
	getProps: () => Pick<
		RecipeTiltCard,
		| 'disabled'
		| 'maxAngle'
		| 'perspective'
		| 'scale'
		| 'reverse'
		| 'duration'
		| 'xAxis'
		| 'yAxis'
		| 'recovery'
		| 'strength'
		| 'glareOpacity'
		| 'depth'
		| 'onTilt'
	> & {
		disabled: Exclude<RecipeTiltCard['disabled'], undefined>;
		maxAngle: Exclude<RecipeTiltCard['maxAngle'], undefined>;
		perspective: Exclude<RecipeTiltCard['perspective'], undefined>;
		scale: Exclude<RecipeTiltCard['scale'], undefined>;
		reverse: Exclude<RecipeTiltCard['reverse'], undefined>;
		duration: Exclude<RecipeTiltCard['duration'], undefined>;
		xAxis: Exclude<RecipeTiltCard['xAxis'], undefined>;
		yAxis: Exclude<RecipeTiltCard['yAxis'], undefined>;
		recovery: Exclude<RecipeTiltCard['recovery'], undefined>;
		strength: Exclude<RecipeTiltCard['strength'], undefined>;
		glareOpacity: Exclude<RecipeTiltCard['glareOpacity'], undefined>;
		depth: Exclude<RecipeTiltCard['depth'], undefined>;
	}
) {
	const props = $derived(getProps());
	let position = $state({ x: 0.5, y: 0.5 });
	let active = $state(false);
	let motionAllowed = $state(false);
	const enabled = $derived(!props['disabled'] && motionAllowed);
	const sample = $derived(
		tiltSample(
			position.x,
			position.y,
			props['maxAngle'],
			props['reverse'],
			props['strength'],
			props['xAxis'],
			props['yAxis'],
			active && enabled
		)
	);
	const safePerspective = $derived(
		Number.isFinite(props['perspective']) ? Math.max(1, props['perspective']) : 1000
	);
	const safeScale = $derived(
		Number.isFinite(props['scale']) ? Math.min(3, Math.max(0.1, props['scale'])) : 1.02
	);
	const safeDuration = $derived(
		Number.isFinite(props['duration']) ? Math.max(0, props['duration']) : 180
	);
	const safeDepth = $derived(
		Number.isFinite(props['depth']) ? Math.min(100, Math.max(0, props['depth'])) : 0
	);
	const opacity = $derived(
		Number.isFinite(props['glareOpacity']) ? Math.min(1, Math.max(0, props['glareOpacity'])) : 0.3
	);
	$effect(() => {
		const media = window.matchMedia?.('(prefers-reduced-motion: reduce), (hover: none)');
		if (!media) {
			motionAllowed = true;
			return;
		}
		const update = () => {
			motionAllowed = !media.matches;
			if (media.matches) active = false;
		};
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	});
	$effect(() => {
		if (!props['disabled']) return;
		active = false;
		position = { x: 0.5, y: 0.5 };
	});
	function emit(x: number, y: number, engaged: boolean) {
		props['onTilt']?.(
			tiltSample(
				x,
				y,
				props['maxAngle'],
				props['reverse'],
				props['strength'],
				props['xAxis'],
				props['yAxis'],
				engaged
			)
		);
	}
	function move(event: PointerEvent) {
		if (!enabled || event.pointerType === 'touch') return;
		position = pointerPosition(
			event.clientX,
			event.clientY,
			(event.currentTarget as HTMLElement).getBoundingClientRect()
		);
		active = true;
		emit(position.x, position.y, true);
	}
	function reset(force = false) {
		if (!force && !props['recovery']) return;
		active = false;
		position = { x: 0.5, y: 0.5 };
		emit(0.5, 0.5, false);
	}
	return {
		get enabled(): typeof enabled {
			return enabled;
		},
		get sample(): typeof sample {
			return sample;
		},
		get safePerspective(): typeof safePerspective {
			return safePerspective;
		},
		get safeScale(): typeof safeScale {
			return safeScale;
		},
		get safeDuration(): typeof safeDuration {
			return safeDuration;
		},
		get safeDepth(): typeof safeDepth {
			return safeDepth;
		},
		get opacity(): typeof opacity {
			return opacity;
		},
		get move(): typeof move {
			return move;
		},
		get reset(): typeof reset {
			return reset;
		}
	};
}
export default createTiltCardComponentState;
