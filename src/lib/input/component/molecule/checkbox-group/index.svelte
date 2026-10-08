<script lang="ts">
	import SlotCheckbox from '$stylist/control/component/atom/checkbox/index.svelte';
	import type { RecipeCheckboxGroup } from '$stylist/input/interface/recipe/checkbox-group';
	import createCheckboxGroupState from './state.svelte';

	let {
		options,
		value = [],
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

	const state = createCheckboxGroupState({
		options,
		value,
		label,
		description,
		class: hostClass,
		itemClass,
		disabled,
		required,
		name,
		onValueInput,
		onValueChange,
		onInput,
		onChange,
		...restProps
	});
</script>

<fieldset class={['c-checkbox-group', hostClass].filter(Boolean).join(' ')} {...restProps}>
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
		{#each options as option}
			<div class="c-checkbox-group__item">
				<div class="c-checkbox-group__checkbox-wrap">
					<SlotCheckbox
						id={option.id}
						{name}
						value={option.value}
						checked={state.selectedValues.includes(option.value)}
						disabled={disabled || option.disabled}
						onchange={state.handleItemChange(option.value)}
						label={option.label}
					/>
				</div>
				<div class="c-checkbox-group__text">
					<label for={option.id} class="c-checkbox-group__label">
						{option.label}
					</label>
					{#if option.description}
						<p class="c-checkbox-group__option-desc">
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
