/** Reactive behavior of scroll-phase-debug; props are read lazily when needed. */
export function createScrollPhaseDebugComponentState() {
	let viewportWidth = $state(0);
	let viewportHeight = $state(0);
	function trackViewport(_node: HTMLElement) {
		function update() {
			viewportWidth = window.innerWidth;
			viewportHeight = window.innerHeight;
		}

		update();
		window.addEventListener('resize', update);

		return {
			destroy() {
				window.removeEventListener('resize', update);
			}
		};
	}
	return {
		get viewportWidth(): typeof viewportWidth {
			return viewportWidth;
		},
		set viewportWidth(__nextValue: typeof viewportWidth) {
			viewportWidth = __nextValue;
		},
		get viewportHeight(): typeof viewportHeight {
			return viewportHeight;
		},
		set viewportHeight(__nextValue: typeof viewportHeight) {
			viewportHeight = __nextValue;
		},
		get trackViewport(): typeof trackViewport {
			return trackViewport;
		}
	};
}
export default createScrollPhaseDebugComponentState;
