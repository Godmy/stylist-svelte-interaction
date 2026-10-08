<script lang="ts">
	import createRadioGroupState from './state.svelte';
	import type { RecipeRadioGroup } from '$stylist/input/interface/recipe/radio-group';

	const props: RecipeRadioGroup = $props();
	const state = createRadioGroupState(() => props);
</script>

<fieldset class="{state.rootClass} {props.class ?? ''}">
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
			{@const isChecked = props.value === option.value}
			<label class="{state.optionLabelClass} {isChecked ? 'radio-option--checked' : ''}">
				<span class="radio-option-indicator-wrapper">
					<span class="radio-indicator-container">
						<input
							type="radio"
							class={state.inputClass}
							name={props.name}
							value={option.value}
							bind:group={props.value}
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
	.radio-option--checked {
		border-color: var(--color-primary-500);
		background-color: var(--color-primary-50);
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
