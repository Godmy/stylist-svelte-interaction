export class ManagerMotionPreference {
	private static readonly QUERY = '(prefers-reduced-motion: reduce)';

	static getSnapshot(): boolean {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
		return window.matchMedia(ManagerMotionPreference.QUERY).matches;
	}

	static subscribe(callback: () => void): () => void {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};

		const mediaQueryList = window.matchMedia(ManagerMotionPreference.QUERY);
		const handleChange = () => callback();

		if (typeof mediaQueryList.addEventListener === 'function') {
			mediaQueryList.addEventListener('change', handleChange);
			return () => mediaQueryList.removeEventListener('change', handleChange);
		}

		mediaQueryList.addListener(handleChange);
		return () => mediaQueryList.removeListener(handleChange);
	}
}
