<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import { onMount } from 'svelte';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';
	import createInputTextState from './state.svelte';
	import type { RecipeInputText as IInputBaseProps } from '$stylist/input/interface/recipe/input-text';

	let {
		variant = 'default',
		size = 'md',
		disabled = false,
		error = false,
		block = false,
		class: className = '',
		label,
		id,
		showRequiredIndicator = true,
		errors = [],
		showErrors = true,
		helperText,
		showHelperWhenError = false,
		value = $bindable<string>(''),
		type = 'text',
		placeholder,
		name,
		required = false,
		readonly = false,
		autofocus = false,
		autocomplete,
		pattern,
		minlength,
		maxlength,
		min,
		max,
		step,
		...restProps
	}: IInputBaseProps = $props();

	const state = createInputTextState({
		variant,
		size,
		disabled,
		error: error || errors.length > 0,
		block,
		class: className,
		id,
		helperText,
		showHelperWhenError
	});

	let inputElement: HTMLInputElement | null = null;
	onMount(() => {
		if (autofocus) inputElement?.focus();
	});
</script>

<div class={state.containerClasses}>
	<InputLabel
		{label}
		{id}
		labelId={state.labelId}
		{size}
		{disabled}
		{required}
		{showRequiredIndicator}
	/>

	<input
		{id}
		{type}
		{name}
		bind:value
		{placeholder}
		{required}
		{readonly}
		{disabled}
		bind:this={inputElement}
		{autocomplete}
		{pattern}
		{minlength}
		{maxlength}
		{min}
		{max}
		{step}
		class={state.classes}
		data-variant={state.variant}
		data-size={state.size}
		data-disabled={disabled || undefined}
		data-error={state.hasError || undefined}
		aria-describedby={state.hasError && showErrors
			? state.errorId
			: helperText
				? undefined
				: undefined}
		aria-invalid={state.hasError ? 'true' : 'false'}
		aria-required={required ? 'true' : 'false'}
		{...restProps}
	/>

	{#if state.hasError && showErrors && errors.length > 0}
		<p id={state.errorId} class={state.errorTextClasses} role="alert">
			{#each errors as error_msg, i}
				{error_msg}{i < errors.length - 1 ? ' ' : ''}
			{/each}
		</p>
	{:else if state.showHelper}
		<p class={state.helperTextClasses}>{helperText}</p>
	{/if}
</div>
