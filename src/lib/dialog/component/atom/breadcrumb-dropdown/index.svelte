<script lang="ts">
	import type { RecipeBreadcrumbDropdown } from '$stylist/dialog/interface/recipe/breadcrumb-dropdown';
	import createBreadcrumbDropdownState from './state.svelte';
	import type { BreadcrumbDropdownItem } from '$stylist/dialog/interface/slot/breadcrumb-dropdown-item';

	let props: RecipeBreadcrumbDropdown & {
		open?: boolean;
		items?: BreadcrumbDropdownItem[];
		onSelect?: (targetId: string) => void;
		class?: string;
	} = $props();

	const state = createBreadcrumbDropdownState(() => props);
</script>

{#if state.open && state.items.length > 0}
	<div class={state.dropdownClass} {...state.restProps}>
		{#each state.items as item (item.id)}
			<button
				type="button"
				class={state.itemClass}
				onclick={() => state.handleSelect(item.targetId)}
			>
				<span class={state.itemLabelClass}>{item.label}</span>
				{#if item.description}
					<span class={state.itemDescriptionClass}>{item.description}</span>
				{/if}
			</button>
		{/each}
	</div>
{/if}

<style>
	.breadcrumb-dropdown {
		position: absolute;
		left: 0;
		top: calc(100% + 0.5rem);
		z-index: 20;
		min-width: 16rem;
		display: flex;
		flex-direction: column;
		border-radius: 0.75rem;
		border: 1px solid var(--color-border-secondary);
		background-color: var(--color-background-primary);
		padding: 0.5rem;
		box-shadow:
			0 20px 25px -5px rgba(15, 23, 42, 0.15),
			0 8px 10px -6px rgba(15, 23, 42, 0.1);
	}
	.breadcrumb-dropdown-item {
		display: flex;
		width: 100%;
		flex-direction: column;
		border: none;
		background: none;
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		text-align: left;
		cursor: pointer;
		transition: background-color var(--duration-150, 150ms) var(--easing-smooth, ease-in-out);
	}
	.breadcrumb-dropdown-item:hover {
		background-color: var(--color-background-secondary);
	}
	.breadcrumb-dropdown-item__label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	.breadcrumb-dropdown-item__description {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
