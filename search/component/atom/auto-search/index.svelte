<script lang="ts">
	import createAutoSearchState from './state.svelte';
	import type { RecipeAutoSearch } from '$stylist/search/interface/recipe/auto-search';

	let {
		value = '',
		placeholder = 'Search...',
		onValueInput,
		onValueChange,
		/** @deprecated use onValueInput/onValueChange */
		onInput = (value: string) => {},
		class: className = ''
	}: RecipeAutoSearch = $props();

	const state = createAutoSearchState({
		value,
		placeholder,
		onValueInput,
		onValueChange,
		onInput,
		class: className
	});
</script>

<div class={state.rootClass}>
	<input
		type="text"
		class={state.inputClass}
		{placeholder}
		value={state.localValue}
		oninput={state.handleInput}
	/>
	<div class={state.iconWrapperClass}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	</div>
</div>

<style>
	.auto-search {
		position: relative;
	}

	.auto-search__input {
		width: 100%;
		padding: 0.5rem 1rem 0.5rem 2.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background-color: var(--color-background-primary);
		color: var(--color-text-primary);
	}

	.auto-search__input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	.auto-search__icon-wrapper {
		position: absolute;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-tertiary);
		pointer-events: none;
		display: flex;
		align-items: center;
	}

	.auto-search__icon-wrapper svg {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
