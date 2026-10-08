import { ManagerScrollProgress } from '$stylist/animation/class/manager/scroll-progress';

export function createScrollProgressState() {
	let progress = $state(0);

	function track(node: HTMLElement) {
		const unobserve = ManagerScrollProgress.observe(node, (value) => {
			progress = value;
		});

		return {
			destroy() {
				unobserve();
			}
		};
	}

	return {
		get progress() {
			return progress;
		},
		track
	};
}

export default createScrollProgressState;
