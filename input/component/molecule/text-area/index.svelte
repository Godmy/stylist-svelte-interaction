<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';
	import HtmlTextarea from '$stylist/html/component/atom/textarea/index.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';
	import type { RecipeTextArea } from '$stylist/input/interface/recipe/text-area';
	import createTextareaState from '$stylist/input/component/molecule/text-area/state.svelte';

	let {
		value = $bindable(''),
		element: textareaElement = $bindable<HTMLTextAreaElement | null>(null),
		...props
	}: RecipeTextArea &
		Omit<HTMLTextareaAttributes, 'class' | 'autocomplete' | 'id' | 'disabled'> = $props();
	const generatedId = $props.id();
	const controlId = $derived(props.id ?? generatedId);
	const nativeProps = $derived(resolveInputAttributes(props));
	const state = createTextareaState(() => ({ ...props, value, id: controlId }));
	const showErrorText = $derived(
		state.hasError && (props.showErrors ?? true) && (props.errors?.length ?? 0) > 0
	);

	onMount(() => {
		if (props.autofocus) textareaElement?.focus();
	});

	$effect(() => {
		const currentValue = value;
		if (props.autoResize && typeof currentValue === 'string') {
			state.autoResizeTextarea(textareaElement);
		}
	});
</script>

<div class={state.containerClasses}>
	<InputLabel
		label={props.label}
		id={controlId}
		labelId={state.labelId}
		size={props.size}
		disabled={props.disabled}
		required={props.required}
		showRequiredIndicator={props.showRequiredIndicator}
	/>

	<HtmlTextarea
		{...nativeProps}
		id={controlId}
		name={props.name}
		bind:value
		placeholder={props.placeholder}
		required={props.required ?? false}
		readonly={props.readonly ?? false}
		disabled={props.disabled ?? false}
		autocomplete={props.autocomplete}
		minlength={props.minlength}
		maxlength={props.maxlength}
		rows={props.rows ?? 4}
		bind:element={textareaElement}
		class={`${state.classes} text-area__textarea`}
		data-variant={state.variant}
		data-size={state.size}
		data-disabled={(props.disabled ?? false) || undefined}
		data-error={state.hasError || undefined}
		oninput={(event) => {
			state.handleInput(textareaElement);
			props.oninput?.call(event.currentTarget, event);
		}}
		aria-describedby={[
			props['aria-describedby'],
			showErrorText ? state.errorId : state.showHelper ? `${controlId}-helper` : undefined
		]
			.filter(Boolean)
			.join(' ') || undefined}
		aria-invalid={state.hasError ? 'true' : props['aria-invalid']}
		aria-required={props.required ? 'true' : 'false'}
	/>

	{#if showErrorText}
		<p id={state.errorId} class={state.errorTextClasses} role="alert">
			{#each props.errors ?? [] as error_msg, i (i)}
				{error_msg}{i < (props.errors?.length ?? 0) - 1 ? ' ' : ''}
			{/each}
		</p>
	{:else if state.showHelper}
		<p id={`${controlId}-helper`} class={state.helperTextClasses}>{props.helperText}</p>
	{/if}

	{#if props.maxlength}
		<p class="text-area-counter">
			{state.currentLength} / {props.maxlength}
			{#if state.remainingChars !== null && state.remainingChars <= 10}
				<span class="text-area-counter__warning">Characters left: {state.remainingChars}</span>
			{/if}
		</p>
	{/if}
</div>

<style>
	:global(.text-area__textarea) {
		resize: vertical;
	}

	.text-area-counter {
		margin-block-start: 0.25rem;
		font-size: var(--font-size-3, 0.75rem);
		color: var(--color-text-secondary);
	}

	.text-area-counter__warning {
		margin-inline-start: 0.5rem;
		color: var(--color-warning-600, #ea580c);
	}
</style>
