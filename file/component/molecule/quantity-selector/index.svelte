<script lang="ts">
	import { PresetQuantitySelector } from '$stylist/file/const/preset/quantity-selector';
	import { createQuantitySelectorState } from './state.svelte';
	import type { RecipeQuantitySelector } from '$stylist/file/interface/recipe/quantity-selector';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeQuantitySelector = $props();
	const state = createQuantitySelectorState(() => props);

	let restProps = $derived.by(() => {
		const {
			value,
			min,
			max,
			step,
			disabled,
			variant,
			size,
			class: hostClass,
			inputClass,
			buttonClass,
			onValueChange,
			onIncrement,
			onDecrement,
			showInput,
			showButtons,
			label,
			...rest
		} = props;
		return rest;
	});
</script>

<div
	class={state.rootClasses}
	data-size={props.size ?? 'md'}
	data-disabled={props.disabled || undefined}
	data-variant={props.variant ?? 'default'}
	{...restProps}
>
	{#if props.label}
		<label for={state.inputId} class={state.labelClasses}>{props.label}</label>
	{/if}

	<div class={state.containerClasses}>
		{#if props.showButtons !== false}
			<button
				type="button"
				class={state.decrementButtonClasses}
				onclick={state.decrement}
				disabled={props.disabled || state.quantity <= (props.min ?? 1)}
				aria-label="Decrease quantity"
			>
				<BaseIcon name={PresetQuantitySelector.Minus} size={16} />
			</button>
		{/if}

		{#if props.showInput !== false}
			<input
				id={state.inputId}
				type="number"
				class={state.inputClasses}
				value={state.quantity}
				min={props.min ?? 1}
				max={props.max ?? 99}
				step={props.step ?? 1}
				disabled={props.disabled}
				oninput={state.handleInputChange}
				aria-label="Quantity selector"
			/>
		{/if}

		{#if props.showButtons !== false}
			<button
				type="button"
				class={state.incrementButtonClasses}
				onclick={state.increment}
				disabled={props.disabled || state.quantity >= (props.max ?? 99)}
				aria-label="Increase quantity"
			>
				<BaseIcon name={PresetQuantitySelector.Plus} size={16} />
			</button>
		{/if}
	</div>
</div>

<style>
	.c-qty-selector {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.c-qty-selector__label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.c-qty-selector__controls {
		display: flex;
		align-items: center;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		overflow: hidden;
	}

	.c-qty-selector__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		cursor: pointer;
		background: var(--color-background-primary);
		border: none;
		color: var(--color-text-primary);
		transition: background-color var(--duration-120, 120ms);
	}

	.c-qty-selector__btn:hover:not(:disabled) {
		background: var(--color-background-secondary);
	}

	.c-qty-selector__btn:disabled {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}

	.c-qty-selector[data-size='xs'] .c-qty-selector__btn {
		padding: 0.25rem;
	}

	.c-qty-selector[data-size='sm'] .c-qty-selector__btn {
		padding: 0.375rem;
	}

	.c-qty-selector[data-size='lg'] .c-qty-selector__btn {
		padding: 0.625rem;
	}

	.c-qty-selector__input {
		flex: 1;
		min-width: 0;
		padding: 0.5rem;
		text-align: center;
		border: none;
		border-left: 1px solid var(--color-border-primary);
		border-right: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		-moz-appearance: textfield;
	}

	.c-qty-selector__input::-webkit-outer-spin-button,
	.c-qty-selector__input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	.c-qty-selector[data-disabled] .c-qty-selector__btn {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-qty-selector[data-disabled] .c-qty-selector__input {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}
</style>
