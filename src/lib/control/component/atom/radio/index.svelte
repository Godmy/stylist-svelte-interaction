<script lang="ts">
	import type { RecipeRadio } from '$stylist/control/interface/recipe/radio';
	import createRadioState from './state.svelte';

	let props: RecipeRadio = $props();
	const state = createRadioState(() => props);
</script>

<div
	class="c-radio"
	data-disabled={state.disabled || undefined}
	data-size={state.size}
	data-required={state.required || undefined}
>
	<input
		id={state.id}
		type="radio"
		class="c-radio__input"
		name={state.name}
		value={state.value}
		checked={state.checked}
		onchange={state.handleChange}
		disabled={state.disabled}
		required={state.required}
		aria-label={state.ariaLabel}
		{...state.restProps}
	/>
	{#if state.label}
		<label class="c-radio__label" for={state.id}>{state.label}</label>
	{/if}
</div>

<style>
	.c-radio {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.c-radio__input {
		width: 1rem;
		height: 1rem;
		accent-color: var(--color-primary-500);
		cursor: pointer;
		margin: 0;
	}

	.c-radio[data-size='sm'] .c-radio__input {
		width: 0.875rem;
		height: 0.875rem;
	}

	.c-radio[data-size='lg'] .c-radio__input {
		width: 1.25rem;
		height: 1.25rem;
	}

	.c-radio[data-size='xl'] .c-radio__input {
		width: 1.5rem;
		height: 1.5rem;
	}

	.c-radio__label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.c-radio[data-required] .c-radio__label::after {
		content: ' *';
		color: var(--color-danger-500, #ef4444);
	}

	.c-radio[data-required] .c-radio__input {
		outline: 1px solid color-mix(in srgb, var(--color-primary-500) 60%, transparent);
		outline-offset: 2px;
	}

	.c-radio[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
