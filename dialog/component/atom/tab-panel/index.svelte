<script lang="ts">
	import { getContext } from 'svelte';
	import { TAB_PANEL_CONTEXT } from '$stylist/dialog/const/record/tab-panel-context';
	import type { RecipeTabPanel } from '$stylist/dialog/interface/recipe/tab-panel';
	import createTabPanelState from './state.svelte';

	let props: RecipeTabPanel = $props();

	const context = getContext<typeof TAB_PANEL_CONTEXT>('tabs-context') ?? TAB_PANEL_CONTEXT;

	let selectedTabId = $derived(context?.selectedTabId ?? '');
	let tabsId = $derived(context?.tabsId ?? '');
	let isSelected = $derived(selectedTabId === props.id);
	let tabId = $derived(`tab-${tabsId}-${props.id}`);
	let panelId = $derived(`panel-${tabsId}-${props.id}`);

	const state = createTabPanelState(
		() => props,
		() => isSelected
	);

	const restProps = $derived(
		(() => {
			const { id: _id, disabled: _disabled, class: _class, children: _children, ...rest } = props;
			return rest;
		})()
	);
</script>

<div
	{...restProps}
	id={panelId}
	role="tabpanel"
	aria-labelledby={tabId}
	class="c-tab-panel"
	data-selected={state.isSelected ? '' : undefined}
	data-disabled={state.disabled ? '' : undefined}
>
	{#if props.children}{@render props.children()}{/if}
</div>

<style>
	.c-tab-panel {
		display: none;
	}

	.c-tab-panel[data-selected] {
		display: block;
	}

	.c-tab-panel[data-disabled] {
		opacity: var(--opacity-50, 0.5);
	}
</style>
