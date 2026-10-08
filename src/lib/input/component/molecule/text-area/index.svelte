<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';
	import type { RecipeTextArea } from '$stylist/input/interface/recipe/text-area';
	import createTextareaState from './state.svelte';

	let props: RecipeTextArea &
		Omit<HTMLTextareaAttributes, 'class' | 'autocomplete' | 'id' | 'disabled'> = $props();
	const state = createTextareaState(() => props);

	let textareaElement: HTMLTextAreaElement | null = null;
	onMount(() => {
		if (props.autofocus) textareaElement?.focus();
	});

	$effect(() => {
		if (props.autoResize && props.value) {
			state.autoResizeTextarea(textareaElement);
		}
	});
</script>

<div class={state.containerClasses}>
	<InputLabel
		label={props.label}
		id={props.id}
		labelId={state.labelId}
		size={props.size}
		disabled={props.disabled}
		required={props.required}
		showRequiredIndicator={props.showRequiredIndicator}
	/>

	<textarea
		id={props.id}
		name={props.name}
		bind:value={props.value}
		placeholder={props.placeholder}
		required={props.required ?? false}
		readonly={props.readonly ?? false}
		disabled={props.disabled ?? false}
		autocomplete={props.autocomplete}
		minlength={props.minlength}
		maxlength={props.maxlength}
		rows={props.rows ?? 4}
		bind:this={textareaElement}
		class={`${state.classes} text-area__textarea`}
		data-variant={state.variant}
		data-size={state.size}
		data-disabled={(props.disabled ?? false) || undefined}
		data-error={state.hasError || undefined}
		oninput={() => state.handleInput(textareaElement)}
		aria-describedby={state.hasError && (props.showErrors ?? true)
			? state.errorId
			: props.helperText
				? undefined
				: undefined}
		aria-invalid={state.hasError ? 'true' : 'false'}
		aria-required={props.required ? 'true' : 'false'}
	></textarea>

	{#if state.hasError && (props.showErrors ?? true) && (props.errors?.length ?? 0) > 0}
		<p id={state.errorId} class={state.errorTextClasses} role="alert">
			{#each props.errors ?? [] as error_msg, i}
				{error_msg}{i < (props.errors?.length ?? 0) - 1 ? ' ' : ''}
			{/each}
		</p>
	{:else if state.showHelper}
		<p class={state.helperTextClasses}>{props.helperText}</p>
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
	.text-area__textarea {
		resize: vertical;
	}

	.text-area-counter {
		margin-block-start: 0.25rem;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.text-area-counter__warning {
		margin-inline-start: 0.5rem;
		color: var(--color-warning-600, #ea580c);
	}
</style>
