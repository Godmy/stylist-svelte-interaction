<script lang="ts">
	import type { RecipeTabList } from '$stylist/dialog/interface/recipe/tab-list';
	import createTabListState from './state.svelte';

	let props: RecipeTabList = $props();

	const state = createTabListState(() => props);

	const restProps = $derived(
		(() => {
			const { disabled: _disabled, class: _class, children: _children, ...rest } = props;
			return rest;
		})()
	);
</script>

<div
	{...restProps}
	role="tablist"
	aria-orientation="horizontal"
	class="c-tab-list"
	data-disabled={state.disabled ? '' : undefined}
>
	{#if props.children}{@render props.children()}{/if}
</div>

<style>
	.c-tab-list {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.c-tab-list[data-disabled] {
		opacity: var(--opacity-50, 0.5);
	}
</style>
