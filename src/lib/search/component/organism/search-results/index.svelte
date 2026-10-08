<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createSearchResultsState from './state.svelte';
	import type { RecipeSearchResults } from '$stylist/search/interface/recipe/search-results';

	let props: RecipeSearchResults = $props();
	const state = createSearchResultsState(() => props);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			results: _results,
			query: _query,
			loading: _loading,
			onResultClick: _onResultClick,
			showMetadata: _showMetadata,
			maxResults: _maxResults,
			...rest
		} = props;
		return rest;
	});
</script>

<div class={state.rootClass} {...restProps}>
	{#if state.loading}
		<div class="c-search-results__loading">Loading...</div>
	{:else if state.displayedResults.length === 0 && state.query}
		<div class="c-search-results__empty">
			No results for "{state.query}"
		</div>
	{:else}
		<div class="c-search-results__list">
			{#each state.displayedResults as result}
				<button
					type="button"
					class="c-search-results__item"
					onclick={() => state.onResultClick?.(result)}
				>
					<div class="c-search-results__item-inner">
						<BaseIcon
							name={state.icon(result.type)}
							size={20}
							class="c-search-results__icon"
						/>
						<div class="c-search-results__content">
							<div class="c-search-results__title">{result.title}</div>
							{#if result.description}
								<div class="c-search-results__desc">{result.description}</div>
							{/if}
							{#if state.showMetadata && result.metadata}
								<div class="c-search-results__meta">
									{result.metadata.date}
									{result.metadata.author}
									{result.metadata.location}
								</div>
							{/if}
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.c-search-results__loading,
	.c-search-results__empty {
		padding: 2rem;
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	.c-search-results__list {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}
	.c-search-results__item {
		display: block;
		width: 100%;
		padding: 1rem;
		text-align: left;
		border: none;
		border-bottom: 1px solid var(--color-border-primary);
		background: transparent;
		cursor: pointer;
		color: inherit;
		transition: background-color var(--duration-120, 120ms);
	}
	.c-search-results__item:last-child {
		border-bottom: none;
	}
	.c-search-results__item:hover {
		background: var(--color-background-secondary);
	}
	.c-search-results__item:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: -2px;
	}
	.c-search-results__item-inner {
		display: flex;
		gap: 0.75rem;
	}
	.c-search-results__icon {
		color: var(--color-text-secondary);
		flex-shrink: 0;
	}
	.c-search-results__title {
		font-weight: 500;
	}
	.c-search-results__desc {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
	}
	.c-search-results__meta {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
	}
</style>
