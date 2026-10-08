<script lang="ts">
	import type { RecipeTabs } from '$stylist/dialog/interface/recipe/tabs';
	import { setContext } from 'svelte';
	import { createTabsState } from './state.svelte';

	let props: RecipeTabs = $props();

	const state = createTabsState(() => props);

	setContext('tabs-context', {
		tabsId: state.tabsId,
		get selectedTabId() {
			return state.selectedTabId;
		},
		registerTab: state.registerTab,
		unregisterTab: state.unregisterTab,
		handleTabChange: state.handleTabChange,
		get variant() {
			return state.variant;
		},
		get size() {
			return state.size;
		},
		get disabled() {
			return state.disabled;
		}
	});

	const restProps = $derived(
		(() => {
			const {
				selectedId: _selectedId,
				onValueChange: _onValueChange,
				variant: _variant,
				size: _size,
				class: _class,
				children: _children,
				disabled: _disabled,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<div {...restProps} class={state.classes} data-disabled={state.disabled || undefined}>
	{#if props.children}{@render props.children()}{/if}
</div>

<style>
	.c-tabs {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.c-tabs[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		pointer-events: none;
	}
</style>
