<script lang="ts">
	import type { RecipeRadioButtonGroup } from '$stylist/input/interface/recipe/radio-button-group';
	import createRadioButtonGroupState from '$stylist/input/component/molecule/radio-button-group/state.svelte';
	import { createInputFormReset } from '$stylist/input/function/state/input-form-reset/state.svelte';

	let { value = $bindable(''), ...props }: RecipeRadioButtonGroup = $props();

	const state = createRadioButtonGroupState(() => ({
		...props,
		value,
		onValueInput: (next) => {
			value = next;
			props.onValueInput?.(next);
		}
	}));
	let rootElement: HTMLDivElement | undefined;
	createInputFormReset(
		() => rootElement,
		(element) => {
			value =
				Array.from(element.querySelectorAll<HTMLInputElement>('input[type="radio"]')).find(
					(input) => input.defaultChecked
				)?.value ?? '';
		}
	);
</script>

<div
	bind:this={rootElement}
	{...state.htmlProps}
	class={state.containerClass}
	role="radiogroup"
	data-orientation={props.orientation ?? 'vertical'}
>
	{#each state.options as option (option.value)}
		<label
			class={['c-radio-group__option', props.optionClass]}
			data-disabled={option.disabled || state.disabled || undefined}
		>
			<input
				type="radio"
				name={state.name}
				class={['c-radio-group__input', props.radioClass]}
				checked={state.value === option.value}
				defaultChecked={option.defaultChecked}
				value={option.value}
				oninput={() => state.handleInput(option.value)}
				onchange={() => state.handleChange(option.value)}
				disabled={option.disabled || state.disabled}
				required={state.required}
			/>
			<span class={['c-radio-group__label', props.labelClass]}>{option.label}</span>
		</label>
	{/each}
</div>

<style>
	.c-radio-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.c-radio-group[data-orientation='horizontal'] {
		flex-direction: row;
		flex-wrap: wrap;
	}

	.c-radio-group__option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.c-radio-group__option[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}

	.c-radio-group__input {
		width: 1rem;
		height: 1rem;
		border-color: var(--color-border-primary);
		color: var(--color-primary-600);
		accent-color: var(--color-primary-600);
		cursor: pointer;
	}

	.c-radio-group__option[data-disabled] .c-radio-group__input {
		cursor: not-allowed;
	}

	.c-radio-group__label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.c-radio-group__option[data-disabled] .c-radio-group__label {
		opacity: var(--opacity-50, 0.5);
	}
</style>
