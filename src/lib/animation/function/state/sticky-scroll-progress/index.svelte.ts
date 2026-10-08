/**
 * Tracks scroll progress (0-1) through a tracked element's own extra height —
 * for a `position: sticky` element pinned inside a taller wrapper, this is
 * the fraction of that extra height scrolled through so far. 0 while the
 * wrapper's top is still at the viewport top, 1 once its bottom has reached
 * the viewport bottom (i.e. right as the sticky pin releases).
 */
export function createStickyScrollProgress() {
	let progress = $state(0);

	function track(node: HTMLElement) {
		let ticking = false;

		function update() {
			ticking = false;
			const rect = node.getBoundingClientRect();
			const scrollable = Math.max(rect.height - window.innerHeight, 1);
			progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
		}

		function schedule() {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(update);
		}

		schedule();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);

		return {
			destroy() {
				window.removeEventListener('scroll', schedule);
				window.removeEventListener('resize', schedule);
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

export default createStickyScrollProgress;
