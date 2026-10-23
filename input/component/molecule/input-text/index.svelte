<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import { onMount } from 'svelte';
	import HtmlInput from '$stylist/html/component/atom/input/index.svelte';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';
	import createInputTextState from '$stylist/input/component/molecule/input-text/state.svelte';
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
		element: inputElement = $bindable<HTMLInputElement | null>(null),
		'aria-describedby': describedBy,
		'aria-invalid': ariaInvalid,
		...restProps
	}: IInputBaseProps = $props();

	const generatedId = $props.id();
	const controlId = $derived(id ?? generatedId);
	const showErrorText = $derived((error || errors.length > 0) && showErrors && errors.length > 0);
	const helperId = $derived(`${controlId}-helper`);
	const state = createInputTextState(() => ({
		variant,
		size,
		disabled,
		error: error || errors.length > 0,
		block,
		class: className,
		id: controlId,
		helperText,
		showHelperWhenError
	}));

	onMount(() => {
		if (autofocus) inputElement?.focus();
	});
</script>

<div class={state.containerClasses}>
	<InputLabel
		{label}
		id={controlId}
		labelId={state.labelId}
		{size}
		{disabled}
		{required}
		{showRequiredIndicator}
	/>

	<HtmlInput
		{...restProps}
		id={controlId}
		{type}
		{name}
		bind:value
		{placeholder}
		{required}
		{readonly}
		{disabled}
		bind:element={inputElement}
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
		aria-describedby={[
			describedBy,
			showErrorText ? state.errorId : state.showHelper ? helperId : undefined
		]
			.filter(Boolean)
			.join(' ') || undefined}
		aria-invalid={state.hasError ? 'true' : ariaInvalid}
		aria-required={required ? 'true' : 'false'}
	/>

	{#if showErrorText}
		<p id={state.errorId} class={state.errorTextClasses} role="alert">
			{#each errors as error_msg, i (i)}
				{error_msg}{i < errors.length - 1 ? ' ' : ''}
			{/each}
		</p>
	{:else if state.showHelper}
		<p id={helperId} class={state.helperTextClasses}>{helperText}</p>
	{/if}
</div>
