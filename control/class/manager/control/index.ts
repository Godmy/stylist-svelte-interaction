export class ControlManager {
	static debounce<A extends unknown[]>(
		fn: (...args: A) => unknown,
		delay: number
	): (...args: A) => void {
		let timeoutId: number | null = null;

		return (...args: A) => {
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}

			timeoutId = window.setTimeout(() => {
				fn(...args);
			}, delay);
		};
	}
}
