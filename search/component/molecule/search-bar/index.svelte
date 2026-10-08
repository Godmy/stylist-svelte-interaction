<script lang="ts">
	/**
	 * SearchBar component following SOLID principles
	 *
	 * Single Responsibility: Provides a search input with clear and search buttons
	 * Open/Closed: Extensible through props without modifying the component
	 * Liskov Substitution: Can be used as a search input anywhere
	 * Interface Segregation: Provides clear interface through well-defined props
	 * Dependency Inversion: Depends on abstractions (types and style manager) not concretions
	 */
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createSearchBarState from './state.svelte';
	import type { RecipeSearchBar } from '$stylist/search/interface/recipe/search-bar';
	import type { HTMLAttributes } from 'svelte/elements';

	const Search = 'search';
	const X = 'x';

	let props: RecipeSearchBar & HTMLAttributes<HTMLDivElement> = $props();
	const state = createSearchBarState(() => props);
</script>

<div class={state.containerClasses}>
	<div class={state.iconContainerClasses}>
		<BaseIcon name={Search} class={state.iconClasses} aria-hidden="true" />
	</div>

	<input
		id="search-bar-input"
		type="text"
		class={state.inputClasses}
		bind:value={state.searchTerm}
		placeholder={props.placeholder ?? 'Search nodes...'}
		disabled={props.disabled ?? false}
		oninput={state.handleInput}
		onkeydown={state.handleKeydown}
		aria-label="Search input"
	/>

	<div class={state.controlsContainerClasses}>
		{#if state.hasValue && !(props.disabled ?? false)}
			<Button
				size="sm"
				variant="ghost"
				class={state.clearButtonClasses}
				onclick={state.handleClear}
				aria-label="Clear search"
				disabled={props.disabled ?? false}
			>
				<BaseIcon name={X} class={state.smallIconClasses} aria-hidden="true" />
			</Button>
		{/if}
		<Button
			size="sm"
			variant="secondary"
			class={state.searchButtonClasses}
			onclick={state.triggerSearch}
			disabled={props.disabled ?? false}
		>
			Search
		</Button>
	</div>
</div>

<style>
	.c-search-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}
	.c-search-bar:focus-within {
		border-color: transparent;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}
	.c-search-bar--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.c-search-bar__icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-secondary);
	}
	.c-search-bar__input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--color-text-primary);
		font: inherit;
	}
	.c-search-bar__input::placeholder {
		color: var(--color-text-tertiary);
	}
	.c-search-bar__input:focus {
		outline: none;
	}
	.c-search-bar__input--disabled {
		cursor: not-allowed;
	}
	.c-search-bar__controls {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.c-search-bar__clear {
		border-radius: 0.375rem;
	}
	.c-search-bar__submit {
		margin-left: 0.25rem;
	}
	:global(.c-search-bar__icon) {
		width: 1.25rem;
		height: 1.25rem;
	}
	:global(.c-search-bar__icon--sm) {
		width: 1rem;
		height: 1rem;
	}
</style>
