<script lang="ts">
	import createRadioGroupState from '$stylist/input/component/molecule/radio-group/state.svelte';
	import type { RecipeRadioGroup } from '$stylist/input/interface/recipe/radio-group';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	import { createInputFormReset } from '$stylist/input/function/state/input-form-reset/index.svelte';

	let { value = $bindable(''), ...props }: RecipeRadioGroup = $props();
	const state = createRadioGroupState(() => ({ ...props, value }));
	const nativeProps = $derived(resolveInputAttributes(props, ['options', 'orientation']));
	let rootElement: HTMLFieldSetElement | undefined;
	createInputFormReset(
		() => rootElement,
		(element) => {
			value =
				Array.from(element.querySelectorAll<HTMLInputElement>('input[type="radio"]')).find(
					(input) => input.defaultChecked
				)?.value ?? '';
		},
		() => props.form
	);
</script>

<fieldset
	form={props.form}
	bind:this={rootElement}
	disabled={props.disabled}
	class="{state.rootClass} {props.class ?? ''}"
>
	{#if props.label}
		<legend class={state.labelClass}>
			{props.label}
			{#if props.required}
				<span class={state.requiredMarkClass} aria-hidden="true">*</span>
			{/if}
		</legend>
	{/if}

	{#if props.description}
		<p class={state.descriptionClass}>{props.description}</p>
	{/if}

	<div class={state.optionsContainerClass}>
		{#each props.options as option (option.value)}
			{@const isChecked = value === option.value}
			<label class="{state.optionLabelClass} {isChecked ? 'radio-option--checked' : ''}">
				<span class="radio-option-indicator-wrapper">
					<span class="radio-indicator-container">
						<input
							{...nativeProps}
							type="radio"
							class={state.inputClass}
							name={props.name}
							value={option.value}
							bind:group={value}
							defaultChecked={option.defaultChecked}
							disabled={props.disabled || option.disabled}
							required={props.required}
						/>
						<span class={state.indicatorClass} aria-hidden="true"></span>
					</span>
				</span>

				<span class="radio-option-content">
					<span class={state.optionTextClass}>
						{option.label}
					</span>
					{#if option.description}
						<span class={state.optionDescriptionClass}>{option.description}</span>
					{/if}
				</span>
			</label>
		{/each}
	</div>

	{#if props.error}
		<p class={state.errorClass}>{props.error}</p>
	{/if}
</fieldset>

<style>
	.c-radio-group {
		min-width: 0;
		margin: 0;
		padding: 0;
		border: 0;
	}
	.c-radio-group__options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.c-radio-group__options--horizontal {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.c-radio-group__option {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		border: 1px solid transparent;
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
	}
	.radio-option--checked {
		border-color: var(--color-primary-500);
		background-color: var(--color-primary-50);
		color: var(--color-primary-900, #1e3a8a);
	}

	.radio-option-indicator-wrapper {
		margin-top: 0.25rem;
	}

	.radio-indicator-container {
		position: relative;
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		align-items: center;
		justify-content: center;
	}

	.radio-option-content {
		display: flex;
		flex-direction: column;
	}
</style>
