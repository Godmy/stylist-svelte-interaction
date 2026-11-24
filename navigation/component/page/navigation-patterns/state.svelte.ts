import { siteMenuSearch } from '$stylist/menu/function/transform/site-menu-search';

import type { RecipeNavigationPatterns } from '$stylist/navigation/interface/recipe/navigation-patterns';

/** Reactive behavior of navigation-patterns; props are read lazily when needed. */
export function createNavigationPatternsComponentState(
	getProps: () => Pick<RecipeNavigationPatterns, 'items' | 'pageSize'> & {
		pageSize: Exclude<RecipeNavigationPatterns['pageSize'], undefined>;
	}
) {
	const props = $derived(getProps());
	const layouts = [
		{ value: 'header', label: 'Шапка' },
		{ value: 'sidebar', label: 'Боковая панель' },
		{ value: 'strip', label: 'Полоса разделов' },
		{ value: 'bottom', label: 'Нижняя панель' },
		{ value: 'cover', label: 'Шапка на обложке' }
	] as const;
	let layout = $state<(typeof layouts)[number]['value']>('header');
	let variant = $state<'mega' | 'dropdown' | 'dropup'>('mega');
	let active = $state('');
	let page = $state(1);
	let search = $state('');
	const selected = $derived(props['items'].find((item) => item.id === active) ?? props['items'][0]);
	const matching = $derived(siteMenuSearch(props['items'], search));
	const size = $derived(Math.max(1, Math.floor(props['pageSize'])));
	const pageCount = $derived(Math.max(1, Math.ceil(matching.length / size)));
	const current = $derived(Math.min(page, pageCount));
	const results = $derived(matching.slice((current - 1) * size, current * size));
	const crumbs = $derived(
		selected
			? [
					{ id: props['items'][0].id, label: props['items'][0].group },
					{ id: `group:${selected.group}`, label: selected.group },
					{ id: selected.id, label: selected.label }
				]
			: []
	);
	function select(id: string) {
		if (props['items'].some((item) => item.id === id)) active = id;
	}
	return {
		get layouts(): typeof layouts {
			return layouts;
		},
		get layout(): typeof layout {
			return layout;
		},
		set layout(__nextValue: typeof layout) {
			layout = __nextValue;
		},
		get variant(): typeof variant {
			return variant;
		},
		set variant(__nextValue: typeof variant) {
			variant = __nextValue;
		},
		get page(): typeof page {
			return page;
		},
		set page(__nextValue: typeof page) {
			page = __nextValue;
		},
		get search(): typeof search {
			return search;
		},
		set search(__nextValue: typeof search) {
			search = __nextValue;
		},
		get selected(): typeof selected {
			return selected;
		},
		get pageCount(): typeof pageCount {
			return pageCount;
		},
		get current(): typeof current {
			return current;
		},
		get results(): typeof results {
			return results;
		},
		get crumbs(): typeof crumbs {
			return crumbs;
		},
		get select(): typeof select {
			return select;
		}
	};
}
export default createNavigationPatternsComponentState;
