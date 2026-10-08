import type { RecipeTabs } from '$stylist/dialog/interface/recipe/tabs';

export function createTabsState(getProps: () => RecipeTabs) {
	const props = $derived(getProps());
	const variant = $derived(props.variant ?? 'default');
	const size = $derived(props.size ?? 'md');
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived(['c-tabs', props.class].filter(Boolean).join(' '));
	const tabsId = $derived(Math.random().toString(36).substring(2, 9));
	let selectedTabId = $state(props.selectedId || '');
	let tabs = $state<string[]>([]);

	$effect(() => {
		selectedTabId = props.selectedId || '';
	});

	return {
		get classes() {
			return classes;
		},
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get tabsId() {
			return tabsId;
		},
		get selectedTabId() {
			return selectedTabId;
		},
		get tabsList() {
			return tabs;
		},
		handleTabChange(id: string) {
			selectedTabId = id;
			props.onValueChange?.(id);
		},
		registerTab(id: string) {
			if (!tabs.includes(id)) {
				tabs = [...tabs, id];
				if (tabs.length === 1 && !props.selectedId) {
					selectedTabId = id;
				}
			}
		},
		unregisterTab(id: string) {
			tabs = tabs.filter((tabId) => tabId !== id);
		}
	};
}
