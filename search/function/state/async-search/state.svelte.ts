import { onDestroy } from 'svelte';
import type { ContractAsyncSearch } from '$stylist/search/interface/contract/async-search';
export function createAsyncSearchState<T>(getContract: () => ContractAsyncSearch<T>) {
	let query = $state('');
	let searchedQuery = $state('');
	let hits = $state.raw<readonly T[] | null>([]);
	let controller: AbortController | undefined;
	function reset() {
		controller?.abort();
		controller = undefined;
		query = '';
		searchedQuery = '';
		hits = [];
	}
	async function search(value: string) {
		controller?.abort();
		controller = undefined;
		const trimmed = value.trim();
		if (trimmed.length < (getContract().minLength ?? 2)) {
			searchedQuery = '';
			hits = [];
			return;
		}
		const request = (controller = new AbortController());
		searchedQuery = trimmed;
		hits = null;
		try {
			const result = await getContract().load(trimmed, request.signal);
			if (controller === request && !request.signal.aborted) hits = result;
		} catch {
			if (controller === request && !request.signal.aborted) hits = [];
		}
	}
	onDestroy(() => controller?.abort());
	return {
		get query() {
			return query;
		},
		set query(value: string) {
			query = value;
		},
		get searchedQuery() {
			return searchedQuery;
		},
		get hits() {
			return hits;
		},
		search,
		reset
	};
}
export default createAsyncSearchState;
