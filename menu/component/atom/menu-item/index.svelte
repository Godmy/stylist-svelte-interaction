<script lang="ts">
	import type { RecipeMenuItem } from '$stylist/menu/interface/recipe/menu-item';
	import { createMenuItemState } from '$stylist/menu/function/state/menu-item/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeMenuItem = $props();
	const state = createMenuItemState(() => props);

	const restProps = $derived.by(() => {
		const { class: _class, children: _children, ...rest } = props;
		return rest;
	});
</script>

{#if state.href}
	<a
		href={state.href}
		class={['c-menu-item', props.class].filter(Boolean).join(' ')}
		data-active={state.active || undefined}
		data-disabled={state.disabled || undefined}
		target={state.external ? '_blank' : undefined}
		rel={state.external ? 'noopener noreferrer' : undefined}
		aria-current={state.active ? 'page' : undefined}
		role="menuitem"
		onclick={state.handleClick}
		{...restProps}
	>
		{#if state.icon}
			<span class="c-menu-item__icon">
				<Icon name={state.icon} aria-hidden="true" />
			</span>
		{/if}
		{#if state.children}
			{@render state.children()}
		{/if}
		{#if state.external}
			<span class="c-menu-item__icon">
				<Icon name="external-link" aria-hidden="true" />
			</span>
		{/if}
	</a>
{:else}
	<button
		class={['c-menu-item', props.class].filter(Boolean).join(' ')}
		data-active={state.active || undefined}
		data-disabled={state.disabled || undefined}
		disabled={state.disabled}
		type="button"
		aria-current={state.active ? 'true' : undefined}
		role="menuitem"
		onclick={state.handleClick}
		{...restProps}
	>
		{#if state.icon}
			<span class="c-menu-item__icon">
				<Icon name={state.icon} aria-hidden="true" />
			</span>
		{/if}
		{#if state.children}
			{@render state.children()}
		{/if}
	</button>
{/if}

<style>
	.c-menu-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-primary);
		background: transparent;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
		border-radius: 0.375rem;
		transition: background-color var(--duration-120, 120ms);
		text-decoration: none;
	}

	.c-menu-item:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-menu-item[data-active] {
		background: var(--color-primary-50, #eff6ff);
		color: var(--color-primary-600);
	}

	.c-menu-item[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-menu-item__icon {
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
</style>
