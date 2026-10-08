<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeNumberInput } from '$stylist/input/interface/recipe/number-input';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createNumberInputState } from './state.svelte';

	const Minus = 'minus';
	const Plus = 'plus';

	let props: RecipeNumberInput & HTMLAttributes<HTMLInputElement> = $props();
	const state = createNumberInputState(() => props);
</script>

<div class={state.containerClasses}>
	<button
		type="button"
		class={state.decrementButtonClasses}
		onclick={state.decrement}
		disabled={state.disabled || state.readonly || state.currentValue <= state.min}
	>
		<BaseIcon name={Minus} size={16} />
	</button>

	<input
		type="number"
		class={state.inputClasses}
		bind:value={state.currentValue}
		min={state.min}
		max={state.max}
		step={state.step}
		disabled={state.disabled}
		readonly={state.readonly}
		oninput={state.handleInput}
		{...props}
	/>

	<button
		type="button"
		class={state.incrementButtonClasses}
		onclick={state.increment}
		disabled={state.disabled || state.readonly || state.currentValue >= state.max}
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

	.number-input__input {
		width: 5rem;
		padding: 0.5rem;
		text-align: center;
		border-block: 1px solid var(--color-border-primary);
		border-inline: none;
		background-color: var(--color-background-primary);
	}

	.number-input__input--disabled {
		background-color: var(--color-background-secondary);
	}

	.number-input__input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	.number-input__button {
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
