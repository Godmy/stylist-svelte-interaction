<script lang="ts">
	import createLoginFormState from './state.svelte';

	const props = $props();
	const state = createLoginFormState(() => props);
</script>

<form class={state.rootClass} {...props}>
	<input class={state.inputClass} placeholder="Email" value={props.email} />
	<input class={state.inputClass} type="password" placeholder="Password" />
	<label class={state.checkboxLabelClass}
		><input type="checkbox" checked={props.rememberMe} /> Remember me</label
	>
	<button class={state.submitButtonClass} type="submit">Sign in</button>
</form>

<style>
	.c-login-form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		padding: 1rem;
	}
	.c-login-form__input {
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		color: var(--color-text-primary);
		background-color: var(--color-background-primary);
	}
	.c-login-form__checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
	}
	.c-login-form__submit {
		border: none;
		border-radius: 0.25rem;
		padding: 0.25rem 0.75rem;
		background-color: var(--color-primary-600);
		color: var(--color-text-inverse);
		cursor: pointer;
	}
	.c-login-form__submit:hover {
		background-color: var(--color-primary-700);
	}
</style>
