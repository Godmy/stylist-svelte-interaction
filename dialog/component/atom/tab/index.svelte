<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { TAB_CONTEXT } from '$stylist/dialog/const/record/tab-context';
	import type { RecipeTab } from '$stylist/dialog/interface/recipe/tab';
	import createTabState from './state.svelte';

	let props: RecipeTab = $props();

	const context = getContext<typeof TAB_CONTEXT>('tabs-context') ?? TAB_CONTEXT;

	onMount(() => {
		context.registerTab(props.id);
	});

	onDestroy(() => {
		context.unregisterTab(props.id);
	});

	let isSelected = $derived(context.selectedTabId === props.id);
	let tabId = $derived(`tab-${context.tabsId}-${props.id}`);
	let panelId = $derived(`panel-${context.tabsId}-${props.id}`);

	const state = createTabState({
		...props,
		variant: props.variant ?? context.variant,
		size: props.size ?? context.size,
		disabled: props.disabled ?? context.disabled
	});

	function handleClick() {
		if (!state.disabled) {
			context.handleTabChange(props.id);
		}
	}

	const restProps = $derived(
		(() => {
			const {
				id: _id,
				selected: _selected,
				variant: _variant,
				size: _size,
				class: _class,
				children: _children,
				ariaLabel: _ariaLabel,
				disabled: _disabled,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<button
	{...restProps}
	id={tabId}
	role="tab"
	aria-selected={isSelected}
	aria-controls={panelId}
	aria-label={props.ariaLabel || undefined}
	class="c-tab"
	data-active={isSelected ? '' : undefined}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled ? '' : undefined}
	disabled={state.disabled}
	onclick={handleClick}
>
	{#if props.children}{@render props.children()}{/if}
</button>

<style>
	.c-tab {
		padding: 0.5rem 1rem;
		font-weight: 500;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		background: transparent;
		border: none;
		cursor: pointer;
		transition:
			color var(--duration-200, 200ms),
			background-color var(--duration-200, 200ms);
	}

	.c-tab:hover:not([data-disabled]) {
		color: var(--color-text-primary);
	}

	.c-tab[data-active] {
		color: var(--color-primary-500);
		border-bottom: 2px solid var(--color-primary-500);
	}

	.c-tab[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}
</style>
