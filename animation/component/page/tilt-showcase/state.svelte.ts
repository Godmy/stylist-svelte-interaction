import type { TiltSample } from '$stylist/animation/type/struct/tilt-sample';
/** Reactive behavior of tilt-showcase; props are read lazily when needed. */
export function createTiltShowcaseComponentState() {
	let sample = $state<TiltSample>({ x: 0.5, y: 0.5, rotateX: 0, rotateY: 0, active: false });
	return {
		get sample(): typeof sample {
			return sample;
		},
		set sample(__nextValue: typeof sample) {
			sample = __nextValue;
		}
	};
}
export default createTiltShowcaseComponentState;
