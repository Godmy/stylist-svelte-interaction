import { render, cleanup, fireEvent } from '@testing-library/svelte';
import { afterEach, expect, test, vi } from 'vitest';
import Digit from '$stylist/animation/component/atom/animated-digit/index.svelte';
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});
test('visible counter exposes final formatted value before observer and honours reduced motion', async () => {
	let reveal: Function = () => {};
	const disconnect = vi.fn();
	vi.stubGlobal(
		'IntersectionObserver',
		class {
			constructor(callback: Function) {
				reveal = callback;
			}
			observe() {}
			disconnect = disconnect;
		}
	);
	vi.stubGlobal('matchMedia', () => ({ matches: true }));
	const view = render(Digit, {
		from: 0,
		to: 800,
		prefix: 'Up to ',
		suffix: ' GB',
		precision: 0,
		startWhenVisible: true
	});
	expect(view.container.textContent).toBe('Up to 800 GB');
	reveal([{ isIntersecting: true }]);
	await vi.waitFor(() => expect(view.container.textContent).toBe('Up to 800 GB'));
	view.unmount();
	expect(disconnect).toHaveBeenCalled();
});

test('a visible counter animates once from its starting value and reaches its target', async () => {
	let reveal: Function = () => {},
		frame: FrameRequestCallback = () => {};
	vi.stubGlobal(
		'IntersectionObserver',
		class {
			constructor(callback: Function) {
				reveal = callback;
			}
			observe() {}
			disconnect() {}
		}
	);
	vi.stubGlobal('matchMedia', () => ({ matches: false }));
	vi.stubGlobal(
		'requestAnimationFrame',
		vi.fn((callback) => {
			frame = callback;
			return 1;
		})
	);
	vi.stubGlobal('cancelAnimationFrame', vi.fn());
	const view = render(Digit, {
		from: 0,
		to: 15,
		precision: 0,
		startWhenVisible: true,
		duration: '100ms'
	});
	expect(view.container.textContent).toBe('15');
	reveal([{ isIntersecting: true }]);
	await vi.waitFor(() => expect(requestAnimationFrame).toHaveBeenCalled());
	frame(performance.now() + 200);
	await vi.waitFor(() => expect(view.container.textContent).toBe('15'));
	expect(view.container.querySelector('.c-animated-digit--animating')).toBeNull();
});
