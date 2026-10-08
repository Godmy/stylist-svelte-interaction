<script lang="ts">
	import createSearchSuggestionState from './state.svelte';
	import type { RecipeSearchSuggestion } from '$stylist/search/interface/recipe/search-suggestion';

	let {
		suggestions = [],
		query = '',
		loading = false,
		class: hostClass = '',
		suggestionClass = '',
		headerClass = '',
		onValueInput,
		onValueChange,
		maxSuggestions = 5,
		...restProps
	}: RecipeSearchSuggestion = $props();

	const state = createSearchSuggestionState({
		suggestions,
		query,
		loading,
		class: hostClass,
		suggestionClass,
		headerClass,
		onValueInput,
		onValueChange,
		maxSuggestions
	});
</script>

<div class={state.rootClass} {...restProps}>
	{#if loading}
		<div class="search-suggestion__loading">
			<div class="search-suggestion__spinner"></div>
		</div>
	{:else if state.displayedSuggestions.length === 0 && query}
		<div class="search-suggestion__empty">No suggestions found</div>
	{:else}
		<ul class="search-suggestion__list">
			{#each state.displayedSuggestions as suggestion}
				<li class="search-suggestion__item">
					<button
						type="button"
						class={state.buttonClass}
						onclick={() => state.handleSuggestionClick(suggestion)}
					>
						<div class="search-suggestion__row">
							{#if suggestion.icon}
								<span class="search-suggestion__icon">{suggestion.icon}</span>
							{/if}
							<span>{suggestion.text}</span>
							{#if suggestion.count}
								<span class="search-suggestion__count">({suggestion.count})</span>
							{/if}
						</div>
						{#if suggestion.category}
							<div class="search-suggestion__category">
								{suggestion.category}
							</div>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.search-suggestions {
		background-color: var(--color-background-primary);
		border-radius: 0.375rem;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06),
			0 0 0 1px rgba(0, 0, 0, 0.05);
		overflow: hidden;
		z-index: var(--z-index-docked, 10);
	}

	.search-suggestion__button {
		width: 100%;
		text-align: left;
		padding: 0.5rem 1rem;
		font-size: var(--text-size-sm, 0.875rem);
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-primary);
	}

	.search-suggestion__button:hover {
		background-color: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.search-suggestion__loading {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.search-suggestion__spinner {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 9999px;
		border: 2px solid transparent;
		border-block-end-color: var(--color-primary-500);
		animation: ss-spin 0.75s linear infinite;
	}

	@keyframes ss-spin {
		to {
			transform: rotate(360deg);
		}
	}

	.search-suggestion__empty {
		padding: 1rem;
		text-align: center;
		font-size: var(--text-size-sm, 0.875rem);
		color: var(--color-text-secondary);
	}

	.search-suggestion__list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-border-primary);
	}

	.search-suggestion__item {
		border-block-end: 1px solid var(--color-border-primary);
	}

	.search-suggestion__item:last-child {
		border-block-end: none;
	}

	.search-suggestion__row {
		display: flex;
		align-items: center;
	}

	.search-suggestion__icon {
		margin-inline-end: 0.5rem;
	}

	.search-suggestion__count {
		margin-inline-start: auto;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.search-suggestion__category {
		margin-inline-start: 1.5rem;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}
</style>
