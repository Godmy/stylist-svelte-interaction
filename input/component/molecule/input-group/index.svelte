<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import { onMount } from 'svelte';
	import HtmlInputText from '$stylist/html/component/atom/input-text/index.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	import type { RecipeInputGroup as IInputGroupProps } from '$stylist/input/interface/recipe/input-group';
	import createInputGroupState from '$stylist/input/component/molecule/input-group/state.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';

	let {
		value = $bindable(''),
		element: inputElement = $bindable<HTMLInputElement | null>(null),
		...props
	}: IInputGroupProps = $props();
	const generatedId = $props.id();
	const controlId = $derived(props.id ?? generatedId);
	const nativeProps = $derived(resolveInputAttributes(props));
	const state = createInputGroupState(() => ({ ...props, value, id: controlId }));
	const showErrorText = $derived(
		state.hasError && (props.showErrors ?? true) && (props.errors?.length ?? 0) > 0
	);

	onMount(() => {
		if (props.autofocus) inputElement?.focus();
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

	<div class={state.groupContainerClasses}>
		<HtmlInputText
			{...nativeProps}
			id={controlId}
			name={props.name}
			bind:value
			placeholder={props.placeholder}
			required={props.required ?? false}
			readonly={props.readonly ?? false}
			disabled={props.disabled ?? false}
			bind:element={inputElement}
			autocomplete={props.autocomplete}
			pattern={props.pattern}
			minlength={props.minlength}
			maxlength={props.maxlength}
			class={`${state.inputClasses} ${state.groupInputClasses}`}
			data-variant={state.inputVariant}
			data-size={state.inputSize}
			data-disabled={(props.disabled ?? false) || undefined}
			data-error={state.hasError || undefined}
			oninput={(event) => {
				state.handleInput(event);
				props.oninput?.call(event.currentTarget, event);
			}}
			onchange={(event) => {
				state.handleChange(event);
				props.onchange?.call(event.currentTarget, event);
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
		<Button
			type="button"
			style={`color: var(--color-on-${props.buttonVariant ?? 'primary'}, var(--color-on-primary, white));`}
			variant={props.buttonVariant ?? 'primary'}
			size={props.size ?? 'md'}
			disabled={(props.buttonDisabled ?? false) || (props.disabled ?? false)}
			onclick={props.onButtonClick}
			class={state.groupButtonClasses}
		>
			{props.buttonLabel ?? 'Action'}
		</Button>
	</div>

	{#if showErrorText}
		<p id={state.errorId} class={state.errorTextClasses} role="alert">
			{#each props.errors ?? [] as error_msg, i (i)}
				{error_msg}{i < (props.errors?.length ?? 0) - 1 ? ' ' : ''}
			{/each}
		</p>
	{:else if state.showHelper}
		<p id={`${controlId}-helper`} class={state.helperTextClasses}>{props.helperText}</p>
	{/if}
</div>

<style>
	.input-group-container {
		display: flex;
		align-items: stretch;
		gap: 0;
	}

	:global(.input-group-input) {
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
