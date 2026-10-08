<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import { onMount } from 'svelte';
	import type { RecipeInputGroup as IInputGroupProps } from '$stylist/input/interface/recipe/input-group';
	import createInputGroupState from './state.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';

	let props: IInputGroupProps = $props();
	const state = createInputGroupState(() => props);

	let inputElement: HTMLInputElement | null = null;
	onMount(() => {
		if (props.autofocus) inputElement?.focus();
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

	<div class={state.groupContainerClasses}>
		<input
			id={props.id}
			type="text"
			name={props.name}
			bind:value={props.value}
			placeholder={props.placeholder}
			required={props.required ?? false}
			readonly={props.readonly ?? false}
			disabled={props.disabled ?? false}
			bind:this={inputElement}
			autocomplete={props.autocomplete}
			pattern={props.pattern}
			minlength={props.minlength}
			maxlength={props.maxlength}
			class={`${state.inputClasses} ${state.groupInputClasses}`}
			data-variant={state.inputVariant}
			data-size={state.inputSize}
			data-disabled={(props.disabled ?? false) || undefined}
			data-error={state.hasError || undefined}
			oninput={state.handleInput}
			onchange={state.handleChange}
			aria-describedby={state.hasError && (props.showErrors ?? true)
				? state.errorId
				: props.helperText
					? undefined
					: undefined}
			aria-invalid={state.hasError ? 'true' : 'false'}
			aria-required={props.required ? 'true' : 'false'}
		/>
		<Button
			variant={props.buttonVariant ?? 'primary'}
			size={props.size ?? 'md'}
			disabled={(props.buttonDisabled ?? false) || (props.disabled ?? false)}
			onclick={props.onButtonClick}
			class={state.groupButtonClasses}
		>
			{props.buttonLabel ?? 'Action'}
		</Button>
	</div>

	{#if state.hasError && (props.showErrors ?? true) && (props.errors?.length ?? 0) > 0}
		<p id={state.errorId} class={state.errorTextClasses} role="alert">
			{#each props.errors ?? [] as error_msg, i}
				{error_msg}{i < (props.errors?.length ?? 0) - 1 ? ' ' : ''}
			{/each}
		</p>
	{:else if state.showHelper}
		<p class={state.helperTextClasses}>{props.helperText}</p>
	{/if}
</div>

<style>
	.input-group-container {
		display: flex;
		align-items: stretch;
		gap: 0;
	}

	.input-group-input {
		flex: 1;
		border-start-end-radius: 0;
		border-end-end-radius: 0;
		border-inline-end: none;
	}

	.input-group-button {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
	}
</style>
