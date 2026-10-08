export class ControlManager {
	static debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
		let timeoutId: number | null = null;

		return ((...args: any[]) => {
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}

			timeoutId = window.setTimeout(() => {
				fn(...args);
			}, delay);
		}) as T;
	}
}
