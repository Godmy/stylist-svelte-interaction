<script lang="ts">
	import createActionSegmentedControlState from './state.svelte';
	import type { RecipeActionSegmentedControl } from '$stylist/control/interface/recipe/action-segmented-control';

	let props: RecipeActionSegmentedControl = $props();
	const restProps = $derived.by(() => {
		const {
			class: _class,
			items: _items,
			selectedIndex: _selectedIndex,
			onValueInput: _onValueInput,
			onValueChange: _onValueChange,
			onChange: _onChange,
			...rest
		} = props;
		return rest;
	});

	const state = createActionSegmentedControlState(() => props);
</script>

<div class={['c-action-segmented', props.class].filter(Boolean).join(' ')} {...restProps}>
	{#each state.items as item, i}
		<button
			class="c-action-segmented__item"
			data-active={state.localSelectedIndex === i || undefined}
			type="button"
			onclick={() => state.handleClick(i)}
		>
			{item}
		</button>
	{/each}
</div>

<style>
	.c-action-segmented {
		display: inline-flex;
		border-radius: 0.375rem;
		border: 1px solid var(--color-border-primary);
		overflow: hidden;
		background: var(--color-background-secondary);
	}

	.c-action-segmented__item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		background: transparent;
		border: none;
		cursor: pointer;
		transition:
			background-color var(--motion-duration-120, 120ms),
			color var(--motion-duration-120, 120ms);
	}

	.c-action-segmented__item:hover:not([data-disabled]) {
		color: var(--color-text-primary);
	}

	.c-action-segmented__item[data-active] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.c-action-segmented__item[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}
</style>
