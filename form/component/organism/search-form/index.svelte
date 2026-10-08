<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createSearchFormState from './state.svelte';
	import { SEARCH_ICON_NAME } from '$stylist/form/const/value/search-icon-name';

	const props = $props();
	const state = createSearchFormState(() => props);
</script>

<form class={state.rootClass} {...props}>
	<BaseIcon name={SEARCH_ICON_NAME} class={state.iconClass} />
	<input class={state.inputClass} placeholder={props.placeholder} value={props.query} />
	<button class={state.submitButtonClass} type="submit">Search</button>
</form>

<style>
	.c-search-form {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		padding: 0.75rem;
	}
	:global(.c-search-form__icon) {
		width: 1rem;
		height: 1rem;
		color: var(--color-text-secondary);
	}
	.c-search-form__input {
		flex: 1;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		color: var(--color-text-primary);
		background-color: var(--color-background-primary);
	}
	.c-search-form__submit {
		border: none;
		border-radius: 0.25rem;
		padding: 0.25rem 0.75rem;
		background-color: var(--color-primary-600);
		color: var(--color-text-inverse);
		cursor: pointer;
	}
	.c-search-form__submit:hover {
		background-color: var(--color-primary-700);
	}
</style>
