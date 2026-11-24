import { untrack } from 'svelte';

import type { RecipePhraseArcFlight } from '$stylist/animation/interface/recipe/phrase-arc-flight';
/** Reactive behavior of phrase-arc-flight; props are read lazily when needed. */
export function createPhraseArcFlightComponentState(
	getProps: () => Pick<
		RecipePhraseArcFlight,
		| 'phrase'
		| 'points'
		| 'pathText'
		| 'progress'
		| 'amplitude'
		| 'stagger'
		| 'highlight'
		| 'highlightIntensity'
		| 'still'
	> & {
		progress: Exclude<RecipePhraseArcFlight['progress'], undefined>;
		amplitude: Exclude<RecipePhraseArcFlight['amplitude'], undefined>;
		stagger: Exclude<RecipePhraseArcFlight['stagger'], undefined>;
		highlight: Exclude<RecipePhraseArcFlight['highlight'], undefined>;
		highlightIntensity: Exclude<RecipePhraseArcFlight['highlightIntensity'], undefined>;
		still: Exclude<RecipePhraseArcFlight['still'], undefined>;
	}
) {
	const props = $derived(getProps());
	const DEFAULT_POINTS = [
		{ x: 820, y: 48 },
		{ x: 740, y: 40 },
		{ x: 660, y: 64 },
		{ x: 580, y: 108 },
		{ x: 500, y: 146 },
		{ x: 420, y: 136 },
		{ x: 340, y: 154 },
		{ x: 260, y: 194 },
		{ x: 180, y: 212 },
		{ x: 90, y: 192 },
		{ x: 0, y: 180 },
		{ x: -150, y: 190 }
	];
	let animatedProgress = $state(untrack(() => props['progress']));
	let frame = 0;
	let startedAt = 0;
	const parsedPoints = $derived(parsePoints(props['pathText'], props['points']));
	const characters = $derived(
		Array.from(props['phrase'] || '').filter((character) => character.length > 0)
	);
	const clampedProgress = $derived(Math.min(1, Math.max(0, props['progress'])));
	const displayProgress = $derived(props['still'] ? clampedProgress : animatedProgress);
	const headProgress = $derived(
		displayProgress * (1 + Math.max(0, characters.length - 1) * props['stagger'])
	);
	const pathProgress = $derived(clamp(headProgress, 0, 1));
	const letterStates = $derived(
		characters.map((character, index) => {
			const rawProgress = headProgress - index * props['stagger'];
			const localProgress = clamp(rawProgress, 0, 1);
			const pathState = getPointAtProgress(parsedPoints, easeLinear(localProgress));
			const wave =
				Math.sin(localProgress * Math.PI * 8 + index * Math.PI) *
				props['amplitude'] *
				visibilityAt(rawProgress);
			const highlightPhase = (Math.sin(localProgress * Math.PI * 5 - index * 0.52) + 1) / 2;
			const highlightAmount = props['highlight']
				? clamp((0.34 + highlightPhase * 0.66) * props['highlightIntensity'], 0.24, 1)
				: 0;

			return {
				character,
				x: pathState.x,
				y: pathState.y + wave,
				opacity: visibilityAt(rawProgress),
				rotation: getReadableRotation(pathState.rotation),
				scale: 1,
				highlight: highlightAmount * visibilityAt(rawProgress)
			};
		})
	);
	$effect(() => {
		if (props['still']) {
			animatedProgress = clampedProgress;
			return;
		}

		if (typeof requestAnimationFrame === 'undefined') return;

		startedAt = performance.now() - clampedProgress * 5200;

		const tick = (time: number) => {
			animatedProgress = ((time - startedAt) % 5200) / 5200;
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(frame);
	});
	function parsePoints(
		text: string | undefined,
		explicitPoints: { x: number; y: number }[] | undefined
	): { x: number; y: number }[] {
		if (text && text.trim()) {
			const nextPoints = text
				.split(/[\s;]+/)
				.map((pair) => pair.split(',').map(Number))
				.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
				.map(([x, y]) => ({ x, y }));

			if (nextPoints.length > 1) return nextPoints;
		}

		if (explicitPoints && explicitPoints.length > 1) return explicitPoints;
		return DEFAULT_POINTS;
	}
	function getPointAtProgress(points: { x: number; y: number }[], progress: number) {
		if (points.length < 2) {
			const point = points[0] ?? { x: 0, y: 0 };
			return { x: point.x, y: point.y, rotation: 0 };
		}

		const lengths = points.slice(1).map((point, index) => {
			const previous = points[index];
			return Math.hypot(point.x - previous.x, point.y - previous.y);
		});
		const totalLength = lengths.reduce((total, length) => total + length, 0);
		let targetLength = clamp(progress, 0, 1) * totalLength;

		for (let index = 0; index < lengths.length; index += 1) {
			const segmentLength = lengths[index];
			const start = points[index];
			const end = points[index + 1];

			if (targetLength <= segmentLength || index === lengths.length - 1) {
				const segmentProgress = segmentLength === 0 ? 0 : targetLength / segmentLength;
				return {
					x: start.x + (end.x - start.x) * segmentProgress,
					y: start.y + (end.y - start.y) * segmentProgress,
					rotation: (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI
				};
			}

			targetLength -= segmentLength;
		}

		const last = points[points.length - 1];
		return { x: last.x, y: last.y, rotation: 0 };
	}
	function easeLinear(value: number) {
		return value;
	}
	function visibilityAt(value: number) {
		if (value <= 0 || value >= 1) return 0;
		return Math.min(1, value / 0.08, (1 - value) / 0.08);
	}
	function getReadableRotation(rotation: number) {
		const normalized = rotation > 90 ? rotation - 180 : rotation < -90 ? rotation + 180 : rotation;
		return clamp(normalized * 0.28, -7, 7);
	}
	function clamp(value: number, min: number, max: number) {
		return Math.min(max, Math.max(min, value));
	}
	return {
		get parsedPoints(): typeof parsedPoints {
			return parsedPoints;
		},
		get pathProgress(): typeof pathProgress {
			return pathProgress;
		},
		get letterStates(): typeof letterStates {
			return letterStates;
		}
	};
}
export default createPhraseArcFlightComponentState;
