<script lang="ts">
	import HtmlInputCheckbox from '$stylist/html/component/atom/input-checkbox/index.svelte';
	import type { RecipeCheckboxGroup } from '$stylist/input/interface/recipe/checkbox-group';
	import createCheckboxGroupState from '$stylist/input/component/molecule/checkbox-group/state.svelte';
	import { createInputFormReset } from '$stylist/input/function/state/input-form-reset/state.svelte';

	let {
		options,
		value = $bindable<string[]>([]),
		label,
		description,
		class: hostClass = '',
		itemClass = '',
		disabled = false,
		required = false,
		name,
		onValueInput,
		onValueChange,
		onInput,
		onChange,
		...restProps
	}: RecipeCheckboxGroup = $props();

	const state = createCheckboxGroupState(() => ({
		options,
		value,
		label,
		description,
		class: hostClass,
		itemClass,
		disabled,
		required,
		name,
		onValueInput: (next) => {
			value = next;
			onValueInput?.(next);
		},
		onValueChange,
		onInput,
		onChange,
		...restProps
	}));
	let rootElement: HTMLFieldSetElement | undefined;
	createInputFormReset(
		() => rootElement,
		(element) => {
			value = Array.from(element.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
				.filter((input) => input.defaultChecked)
				.map((input) => input.value);
		},
		() => restProps.form
	);
</script>

<fieldset
	bind:this={rootElement}
	{...restProps}
	{disabled}
	class={['c-checkbox-group', hostClass].filter(Boolean).join(' ')}
>
	{#if label}
		<legend class="c-checkbox-group__legend">
			{label}
			{#if required}<span class="c-checkbox-group__required">*</span>{/if}
		</legend>
	{/if}

	{#if description}
		<p class="c-checkbox-group__description">{description}</p>
	{/if}

	<div class="c-checkbox-group__options">
		{#each options as option (option.id)}
			<div class={['c-checkbox-group__item', itemClass]}>
				<div class="c-checkbox-group__checkbox-wrap">
					<HtmlInputCheckbox
						id={option.id}
						{name}
						value={option.value}
						checked={state.selectedValues.includes(option.value)}
						defaultChecked={option.defaultChecked}
						required={required &&
							state.selectedValues.length === 0 &&
							options.find((candidate) => !candidate.disabled)?.value === option.value}
						disabled={disabled || option.disabled}
						onchange={state.handleItemChange(option.value)}
						form={restProps.form}
						aria-describedby={option.description ? `${option.id}-description` : undefined}
					/>
				</div>
				<div class="c-checkbox-group__text">
					<label for={option.id} class="c-checkbox-group__label">
						{option.label}
					</label>
					{#if option.description}
						<p id={`${option.id}-description`} class="c-checkbox-group__option-desc">
							{option.description}
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</fieldset>

<style>
	.c-checkbox-group {
		border: none;
		padding: 0;
		margin: 0;
	}

	.c-checkbox-group__legend {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 0.25rem;
	}

	.c-checkbox-group__required {
		color: var(--color-error-500);
		margin-left: 0.25rem;
	}

	.c-checkbox-group__description {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.75rem;
	}

	.c-checkbox-group__options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.c-checkbox-group__item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.c-checkbox-group__checkbox-wrap {
		display: flex;
		align-items: center;
		height: 1.25rem;
	}

	.c-checkbox-group__text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.c-checkbox-group__label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.c-checkbox-group__option-desc {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
