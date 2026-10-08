<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeSplitButton } from '$stylist/button/interface/recipe/split-button';
	import createSplitButtonState from './state.svelte';

	const ChevronDown = 'chevron-down';

	let props: RecipeSplitButton = $props();
	const state = createSplitButtonState(() => props);

	let divAttributes = $derived.by(() => {
		const allProps = props as Record<string, any>;
		const divCompatibleProps: Record<string, any> = {};
		for (const [key, value] of Object.entries(allProps)) {
			if (
				key.startsWith('data-') ||
				key.startsWith('aria-') ||
				![
					'variant',
					'size',
					'disabled',
					'loading',
					'block',
					'loadingLabel',
					'children',
					'items',
					'primaryAction',
					'primaryLabel',
					'type',
					'ariaLabel',
					'onclick',
					'onfocus',
					'onblur',
					'onkeydown',
					'onkeyup',
					'onmousedown',
					'onmouseup',
					'onmouseenter',
					'onmouseleave',
					'onsubmit',
					'onreset'
				].includes(key)
			) {
				divCompatibleProps[key] = value;
			}
		}
		return divCompatibleProps;
	});
	const restProps = $derived(divAttributes);
</script>

<div
	{...restProps}
	class={['c-split-button', props.class].filter(Boolean).join(' ')}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.isDisabled || undefined}
	data-loading={state.loading || undefined}
	id={state.buttonId}
>
	<button
		type={'button' as any}
		disabled={Boolean(state.isDisabled)}
		aria-busy={typeof props.loading === 'boolean' ? props.loading : undefined}
		aria-live={typeof props.loading === 'boolean' && props.loading ? 'polite' : undefined}
		class="c-split-button__primary"
		aria-label={typeof props.ariaLabel === 'string'
			? props.ariaLabel
			: props.primaryLabel || undefined}
		onclick={props.primaryAction}
	>
		{#if props.children}
			{@render props.children()}
		{:else}
			{props.primaryLabel ?? 'Action'}
		{/if}
	</button>
	<button
		type={'button' as any}
		disabled={Boolean(state.isDisabled)}
		class="c-split-button__toggle"
		onclick={state.toggleDropdown}
		aria-haspopup="true"
		aria-expanded={state.isOpen}
		aria-label="Show more options"
	>
		<BaseIcon name={ChevronDown} size={16} aria-hidden="true" />
	</button>

	{#if state.isOpen}
		<div class="c-split-button__menu" role="menu" aria-orientation="vertical" tabindex="-1">
			<div class="c-split-button__menu-inner" role="none">
				{#each props.items as item}
					<button
						class="c-split-button__menu-item"
						data-disabled={item.disabled || undefined}
						onclick={() => state.handleItemClick(item.onClick)}
						disabled={item.disabled}
						role="menuitem"
					>
						{item.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.c-split-button {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	.c-split-button__primary,
	.c-split-button__toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color var(--duration-120, 120ms);
		border: 1px solid transparent;
	}

	.c-split-button__primary {
		padding: 0 1rem;
		height: 2.25rem;
		border-radius: 0.375rem 0 0 0.375rem;
		border-right-width: 0;
	}

	.c-split-button__toggle {
		padding: 0 0.5rem;
		height: 2.25rem;
		border-radius: 0 0.375rem 0.375rem 0;
		border-left-width: 0;
	}

	/* Size variants */
	.c-split-button[data-size='xs'] .c-split-button__primary,
	.c-split-button[data-size='xs'] .c-split-button__toggle {
		height: 1.5rem;
	}
	.c-split-button[data-size='xs'] .c-split-button__primary {
		padding: 0 0.5rem;
		font-size: 0.75rem;
	}
	.c-split-button[data-size='sm'] .c-split-button__primary,
	.c-split-button[data-size='sm'] .c-split-button__toggle {
		height: 2rem;
	}
	.c-split-button[data-size='sm'] .c-split-button__primary {
		padding: 0 0.75rem;
	}
	.c-split-button[data-size='lg'] .c-split-button__primary,
	.c-split-button[data-size='lg'] .c-split-button__toggle {
		height: 2.75rem;
	}
	.c-split-button[data-size='lg'] .c-split-button__primary {
		padding: 0 1.5rem;
		font-size: 1rem;
	}
	.c-split-button[data-size='xl'] .c-split-button__primary,
	.c-split-button[data-size='xl'] .c-split-button__toggle {
		height: 3rem;
	}

	/* Appearance variants */
	.c-split-button[data-variant='default'] .c-split-button__primary,
	.c-split-button[data-variant='default'] .c-split-button__toggle {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}
	.c-split-button[data-variant='default'] .c-split-button__primary:hover:not(:disabled),
	.c-split-button[data-variant='default'] .c-split-button__toggle:hover:not(:disabled) {
		background: var(--color-background-secondary);
	}
	.c-split-button[data-variant='primary'] .c-split-button__primary,
	.c-split-button[data-variant='primary'] .c-split-button__toggle {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
	}
	.c-split-button[data-variant='primary'] .c-split-button__primary:hover:not(:disabled),
	.c-split-button[data-variant='primary'] .c-split-button__toggle:hover:not(:disabled) {
		background: var(--color-primary-700);
	}
	.c-split-button[data-variant='secondary'] .c-split-button__primary,
	.c-split-button[data-variant='secondary'] .c-split-button__toggle {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border-color: var(--color-secondary-700);
	}
	.c-split-button[data-variant='danger'] .c-split-button__primary,
	.c-split-button[data-variant='danger'] .c-split-button__toggle {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
	}
	.c-split-button[data-variant='ghost'] .c-split-button__primary,
	.c-split-button[data-variant='ghost'] .c-split-button__toggle {
		background: transparent;
		color: var(--color-text-primary);
	}
	.c-split-button[data-variant='ghost'] .c-split-button__primary:hover:not(:disabled),
	.c-split-button[data-variant='ghost'] .c-split-button__toggle:hover:not(:disabled) {
		background: var(--color-background-secondary);
	}
	.c-split-button[data-variant='outline'] .c-split-button__primary,
	.c-split-button[data-variant='outline'] .c-split-button__toggle {
		background: transparent;
		color: var(--color-text-primary);
		border-color: var(--color-neutral-400);
	}

	/* Disabled */
	.c-split-button[data-disabled] .c-split-button__primary,
	.c-split-button[data-disabled] .c-split-button__toggle {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Divider between primary and toggle */
	.c-split-button__toggle {
		border-left: 1px solid rgba(255, 255, 255, 0.25);
	}
	.c-split-button[data-variant='default'] .c-split-button__toggle,
	.c-split-button[data-variant='ghost'] .c-split-button__toggle,
	.c-split-button[data-variant='outline'] .c-split-button__toggle {
		border-left-color: var(--color-border-primary);
	}

	/* Dropdown menu */
	.c-split-button__menu {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: var(--z-index-docked, 100);
		margin-top: 0.25rem;
		width: 12rem;
		border-radius: 0.375rem;
		border: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		outline: none;
	}

	.c-split-button__menu-inner {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.25rem;
	}

	.c-split-button__menu-item {
		width: 100%;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		text-align: left;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		border: none;
		cursor: pointer;
		transition: background-color var(--duration-120, 120ms);
	}
	.c-split-button__menu-item:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}
	.c-split-button__menu-item:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: -2px;
	}
	.c-split-button__menu-item[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
