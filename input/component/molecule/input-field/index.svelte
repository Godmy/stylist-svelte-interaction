<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import InputText from '$stylist/input/component/molecule/input-text/index.svelte';
	import type { RecipeInputField as IInputFieldProps } from '$stylist/input/interface/recipe/input-field';
	import { createInputFieldState } from './state.svelte';

	let { value = $bindable<string>(''), ...props }: IInputFieldProps = $props();
	const state = createInputFieldState(() => props);
</script>

<div class={state.containerClasses}>
	<InputText
		label={props.label}
		id={props.id}
		showRequiredIndicator={props.showRequiredIndicator}
		errors={props.errors ?? []}
		showErrors={props.showErrors}
		showHelperWhenError={props.showHelperWhenError}
		variant={props.variant}
		size={props.size}
		disabled={props.disabled}
		error={props.error}
		block={props.block}
		class={props.class}
		bind:value
		type={props.type}
		placeholder={props.placeholder}
		name={props.name}
		required={props.required}
		readonly={props.readonly}
		autofocus={props.autofocus}
		autocomplete={props.autocomplete}
		pattern={props.pattern}
		minlength={props.minlength}
		maxlength={props.maxlength}
		min={props.min}
		max={props.max}
		step={props.step}
	/>
	{#if state.showHelper}
		<p class={state.helperTextClasses}>{props.helperText}</p>
	{/if}
</div>

<style>
	.input-field-helper-text {
		margin-block-start: 0.25rem;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}
</style>
