type ScrollProgressTracker = {
	element: HTMLElement;
	callback: (progress: number) => void;
	active: boolean;
};

export class ManagerScrollProgress {
	private static trackers = new Set<ScrollProgressTracker>();
	private static intersectionObserver: IntersectionObserver | null = null;
	private static listenersAttached = false;
	private static ticking = false;

	static observe(element: HTMLElement, callback: (progress: number) => void): () => void {
		if (typeof window === 'undefined') {
			callback(0);
			return () => {};
		}

		const tracker: ScrollProgressTracker = { element, callback, active: true };
		ManagerScrollProgress.trackers.add(tracker);
		ManagerScrollProgress.ensureListeners();
		ManagerScrollProgress.getIntersectionObserver().observe(element);
		ManagerScrollProgress.scheduleUpdate();

		return () => {
			ManagerScrollProgress.trackers.delete(tracker);
			ManagerScrollProgress.intersectionObserver?.unobserve(element);
		};
	}

	private static ensureListeners() {
		if (ManagerScrollProgress.listenersAttached) return;
		ManagerScrollProgress.listenersAttached = true;
		window.addEventListener('scroll', ManagerScrollProgress.scheduleUpdate, { passive: true });
		window.addEventListener('resize', ManagerScrollProgress.scheduleUpdate);
	}

	private static getIntersectionObserver(): IntersectionObserver {
		if (!ManagerScrollProgress.intersectionObserver) {
			ManagerScrollProgress.intersectionObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						for (const tracker of ManagerScrollProgress.trackers) {
							if (tracker.element === entry.target) {
								tracker.active = entry.isIntersecting;
							}
						}
					}
					ManagerScrollProgress.scheduleUpdate();
				},
				{ rootMargin: '25% 0px 25% 0px' }
			);
		}
		return ManagerScrollProgress.intersectionObserver;
	}

	private static scheduleUpdate = () => {
		if (ManagerScrollProgress.ticking) return;
		ManagerScrollProgress.ticking = true;
		window.requestAnimationFrame(() => {
			ManagerScrollProgress.ticking = false;
			ManagerScrollProgress.updateAll();
		});
	};

	private static updateAll() {
		const viewportHeight = window.innerHeight;

		for (const tracker of ManagerScrollProgress.trackers) {
			if (!tracker.active) continue;

			const rect = tracker.element.getBoundingClientRect();
			const total = rect.height + viewportHeight;
			const progress = total <= 0 ? 0 : (viewportHeight - rect.top) / total;

			tracker.callback(Math.min(Math.max(progress, 0), 1));
		}
	}
}
