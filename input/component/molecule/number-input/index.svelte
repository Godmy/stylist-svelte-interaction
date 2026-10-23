<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeNumberInput } from '$stylist/input/interface/recipe/number-input';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createNumberInputState } from '$stylist/input/component/molecule/number-input/state.svelte';
	import HtmlInputNumber from '$stylist/html/component/atom/input-number/index.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';

	const Minus = 'minus';
	const Plus = 'plus';

	let {
		value = $bindable<number | undefined>(),
		element: inputElement = $bindable<HTMLInputElement | null>(null),
		...props
	}: RecipeNumberInput & HTMLAttributes<HTMLInputElement> = $props();
	const nativeProps = $derived(resolveInputAttributes(props));
	const state = createNumberInputState(
		() => ({
			...props,
			value,
			onValueInput: (next) => {
				value = next;
				props.onValueInput?.(next);
			}
		}),
		() => inputElement
	);
</script>

<div class={state.containerClasses}>
	<button
		type="button"
		class={state.decrementButtonClasses}
		aria-label="Decrease value"
		onclick={state.decrement}
		disabled={state.disabled ||
			state.readonly ||
			(state.currentValue !== undefined && state.currentValue <= state.min)}
	>
		<BaseIcon name={Minus} size={16} />
	</button>

	<HtmlInputNumber
		{...nativeProps}
		class={state.inputClasses}
		bind:element={inputElement}
		bind:value
		min={props.min}
		max={props.max}
		step={state.step}
		disabled={state.disabled}
		readonly={state.readonly}
		oninput={(event) => {
			state.handleInput(event);
			props.oninput?.call(event.currentTarget, event);
		}}
	/>

	<button
		type="button"
		class={state.incrementButtonClasses}
		aria-label="Increase value"
		onclick={state.increment}
		disabled={state.disabled ||
			state.readonly ||
			(state.currentValue !== undefined && state.currentValue >= state.max)}
	>
		<BaseIcon name={Plus} size={16} />
	</button>
</div>

<style>
	.number-input {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	:global(.number-input__input) {
		width: 5rem;
		padding: 0.5rem;
		text-align: center;
		border-block: 1px solid var(--color-border-primary);
		border-inline: none;
		background-color: var(--color-background-primary);
		color: var(--color-text-primary, CanvasText);
	}

	:global(.number-input__input--disabled) {
		background-color: var(--color-background-secondary);
	}

	:global(.number-input__input:focus-visible) {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	.number-input__button {
		color: var(--color-text-primary, CanvasText);
		padding: 0.5rem;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-secondary);
		cursor: pointer;
	}

	.number-input__button:hover {
		background-color: var(--color-background-tertiary);
	}

	.number-input__button:disabled,
	.number-input__button--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.number-input__button--decrement {
		border-start-start-radius: var(--border-radius-base, 0.375rem);
		border-end-start-radius: var(--border-radius-base, 0.375rem);
		border-inline-end: none;
	}

	.number-input__button--increment {
		border-start-end-radius: var(--border-radius-base, 0.375rem);
		border-end-end-radius: var(--border-radius-base, 0.375rem);
		border-inline-start: none;
	}
</style>
