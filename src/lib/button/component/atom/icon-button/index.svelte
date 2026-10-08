<script lang="ts">
	import { createButtonFactoryInput } from '$stylist/button/function/transform/button-factory-input';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	const Loader2 = 'loader-2';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { RecipeIconButton } from '$stylist/button/interface/recipe/icon-button';
	import createIconButtonState from './state.svelte';

	let props: RecipeIconButton & HTMLButtonAttributes = $props();
	const factoryInput = $derived(createButtonFactoryInput(props as any));
	const state = $derived(createIconButtonState(factoryInput));

	const restProps = $derived.by(() => {
		const {
			variant: _variant,
			size: _size,
			disabled: _disabled,
			loading: _loading,
			block: _block,
			loadingLabel: _loadingLabel,
			children: _children,
			icon: _icon,
			class: _class,
			...rest
		} = props;
		return rest;
	});
</script>

<button
	class={['c-icon-button', props.class].filter(Boolean).join(' ')}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.isDisabled || undefined}
	data-loading={state.loading || undefined}
	type={props.type ?? 'button'}
	{...restProps}
	{...state.attrs}
>
	{#if state.loading}
		<BaseIcon name={Loader2} size={state.iconSize} aria-hidden="true" />
		<span class="_c1">{props.loadingLabel ?? 'Loading...'}</span>
	{:else if props.icon !== undefined && props.icon !== null}
		{#if typeof props.icon === 'string'}
			<BaseIcon name={props.icon} size={state.iconSize} />
		{:else}
			{@render props.icon()}
		{/if}
	{:else if props.children}
		{@render props.children()}
	{/if}
</button>

<style>
	.c-icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid transparent;
		background: transparent;
		color: var(--color-text-primary);
		cursor: pointer;
		transition: background-color var(--duration-120, 120ms);
		border-radius: 0.375rem;
	}

	.c-icon-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-icon-button[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-icon-button[data-size='xs'] {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.25rem;
	}

	.c-icon-button[data-size='sm'] {
		width: 2rem;
		height: 2rem;
		border-radius: 0.375rem;
	}

	.c-icon-button[data-size='md'] {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 0.375rem;
	}

	.c-icon-button[data-size='lg'] {
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 0.5rem;
	}

	.c-icon-button[data-size='xl'] {
		width: 3rem;
		height: 3rem;
		border-radius: 0.5rem;
	}

	.c-icon-button[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}

	.c-icon-button[data-variant='default']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-icon-button[data-variant='ghost']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-icon-button[data-variant='outline'] {
		border-color: var(--color-neutral-300);
	}

	.c-icon-button[data-variant='outline']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-icon-button[data-variant='primary'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
	}

	.c-icon-button[data-variant='primary']:hover:not([data-disabled]) {
		background: var(--color-primary-700);
	}

	.c-icon-button[data-variant='subtle'] {
		background: var(--color-neutral-100);
	}

	.c-icon-button[data-variant='subtle']:hover:not([data-disabled]) {
		background: var(--color-neutral-200);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	._c1 {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
