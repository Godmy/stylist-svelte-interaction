<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import { onMount } from 'svelte';
	import HtmlInput from '$stylist/html/component/atom/input/index.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import InputLabel from '$stylist/input/component/atom/input-label/index.svelte';
	import type { RecipeInputPassword as IInputPasswordProps } from '$stylist/input/interface/recipe/input-password';
	import createInputPasswordState from '$stylist/input/component/molecule/input-password/state.svelte';

	const Eye = 'eye';
	const EyeOff = 'eye-off';

	let {
		value = $bindable(''),
		showPassword = $bindable(false),
		element: inputElement = $bindable<HTMLInputElement | null>(null),
		...props
	}: IInputPasswordProps = $props();
	const generatedId = $props.id();
	const controlId = $derived(props.id ?? generatedId);
	const nativeProps = $derived(resolveInputAttributes(props));
	const state = createInputPasswordState(() => ({ ...props, value, showPassword, id: controlId }));
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

	<div class="input-password__wrapper">
		<HtmlInput
			{...nativeProps}
			id={controlId}
			type={state.currentType}
			name={props.name}
			bind:value
			placeholder={props.placeholder ?? 'Password'}
			required={props.required ?? false}
			readonly={props.readonly ?? false}
			disabled={props.disabled ?? false}
			bind:element={inputElement}
			autocomplete={props.autocomplete ?? 'current-password'}
			pattern={props.pattern}
			minlength={props.minlength ?? 8}
			maxlength={props.maxlength}
			class={state.inputClasses}
			data-variant={state.inputVariant}
			data-size={state.inputSize}
			data-disabled={(props.disabled ?? false) || undefined}
			data-error={state.hasError || undefined}
			aria-describedby={[
				props['aria-describedby'],
				showErrorText ? state.errorId : state.showHelper ? `${controlId}-helper` : undefined
			]
				.filter(Boolean)
				.join(' ') || undefined}
			aria-invalid={state.hasError ? 'true' : props['aria-invalid']}
			aria-required={props.required ? 'true' : 'false'}
		/>

		{#if (props.allowTogglePassword ?? true) && !props.disabled}
			<button
				type="button"
				class={state.passwordToggleClasses}
				onclick={() => (showPassword = !showPassword)}
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				aria-pressed={showPassword}
			>
				{#if showPassword}
					<BaseIcon name={EyeOff} size={20} class="_c1" />
				{:else}
					<BaseIcon name={Eye} size={20} class="_c1" />
				{/if}
			</button>
		{/if}
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

	{#if props.showPasswordStrength && state.passwordStrength}
		<div class="input-password__strength">
			<div class="input-password__strength-row">
				<div class="input-password__strength-track">
					<div
						class={`input-password__strength-fill ${state.passwordStrength.color}`}
						style={`width: ${state.passwordStrength.percentage}%`}
					></div>
				</div>
				<span class="input-password__strength-label">{state.passwordStrength.label}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.input-password__wrapper {
		position: relative;
		display: flex;
		align-items: stretch;
	}
	.input-password__wrapper :global(.input-field__control) {
		padding-inline-end: 2.5rem;
	}

	.input-password-toggle {
		color: inherit;
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		border-start-end-radius: inherit;
		border-end-end-radius: inherit;
		background: none;
		border: none;
		cursor: pointer;
	}

	.input-password__strength {
		margin-block-start: 0.5rem;
	}

	.input-password__strength-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.input-password__strength-track {
		flex: 1;
		height: 0.5rem;
		overflow: hidden;
		border-radius: 9999px;
		background-color: var(--color-background-tertiary);
	}

	.input-password__strength-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.3s ease;
	}

	.input-password__strength-fill.ps-danger {
		background-color: var(--color-danger-500);
	}
	.input-password__strength-fill.ps-orange {
		background-color: var(--color-warning-600, #f97316);
	}
	.input-password__strength-fill.ps-yellow {
		background-color: var(--color-warning-400, #eab308);
	}
	.input-password__strength-fill.ps-lime {
		background-color: var(--color-success-400, #84cc16);
	}
	.input-password__strength-fill.ps-success {
		background-color: var(--color-success-500);
	}

	.input-password__strength-label {
		font-size: var(--font-size-3, 0.75rem);
		color: var(--color-text-secondary);
		white-space: nowrap;
	}

	._c1 {
		height: 1.25rem;
		width: 1.25rem;
	}
</style>
