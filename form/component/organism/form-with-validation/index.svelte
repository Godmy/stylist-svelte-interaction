<script lang="ts">
	import createFormWithValidationState from './state.svelte';

	const props = $props();
	const state = createFormWithValidationState(() => props);
</script>

<form class={state.rootClass} {...props}>
	<input class={state.inputClass} placeholder="Email" value={props.email} />
	<div class={state.emailValidClass}>{state.emailValidText}</div>
	<input class={state.inputClass} type="password" placeholder="Password" value={props.password} />
	<div class={state.passwordValidClass}>{state.passwordValidText}</div>
</form>

<style>
	.c-form-with-validation {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		padding: 1rem;
	}
	.c-form-with-validation__input {
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		color: var(--color-text-primary);
		background-color: var(--color-background-primary);
	}
	.c-form-with-validation__hint {
		font-size: 0.75rem;
	}
	.c-form-with-validation__hint--valid {
		color: var(--color-success-600, #16a34a);
	}
	.c-form-with-validation__hint--invalid {
		color: var(--color-danger-600);
	}
</style>
