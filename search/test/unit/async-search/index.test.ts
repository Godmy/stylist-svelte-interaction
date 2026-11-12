import { describe, expect, it, vi } from 'vitest';
const lifecycle = vi.hoisted(() => ({ cleanup: undefined as undefined | (() => void) }));
vi.mock('svelte', async (original) => ({
	...(await original<object>()),
	onDestroy: (cleanup: () => void) => {
		lifecycle.cleanup = cleanup;
	}
}));
import { createAsyncSearchState } from '$stylist/search/function/state/async-search/state.svelte';

describe('async search lifetime', () => {
	it('ignores an old response even if the loader does not honor abort', async () => {
		const pending: ((hits: string[]) => void)[] = [];
		const signals: AbortSignal[] = [];
		const state = createAsyncSearchState<string>(() => ({
			load: (_query, signal) => {
				signals.push(signal);
				return new Promise((resolve) => pending.push(resolve));
			}
		}));
		const first = state.search('first');
		const second = state.search('second');
		expect(signals[0].aborted).toBe(true);
		pending[1](['new']);
		await second;
		pending[0](['old']);
		await first;
		expect(state.hits).toEqual(['new']);
		expect(state.searchedQuery).toBe('second');
	});
	it('reset cancels pending work and clears the visible query', async () => {
		let resolve!: (hits: string[]) => void;
		const state = createAsyncSearchState<string>(() => ({
			load: () =>
				new Promise((done) => {
					resolve = done;
				})
		}));
		state.query = 'island';
		const request = state.search('island');
		state.reset();
		resolve(['late']);
		await request;
		expect(state.query).toBe('');
		expect(state.hits).toEqual([]);
		expect(state.searchedQuery).toBe('');
	});
	it('does not call a loader for short input and aborts on component destruction', async () => {
		const loader = vi.fn(async (_q: string, _signal: AbortSignal) => []);
		const state = createAsyncSearchState(() => ({ load: loader, minLength: 3 }));
		await state.search('ab');
		expect(loader).not.toHaveBeenCalled();
		await state.search('abc');
		lifecycle.cleanup?.();
		expect(loader.mock.calls[0][1].aborted).toBe(true);
	});
});
