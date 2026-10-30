<script lang="ts">
	import HtmlUl from '$stylist/html/component/molecule/ul/index.svelte';
	import HtmlLi from '$stylist/html/component/organism/li/index.svelte';
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createSearchResultsState from '$stylist/search/component/organism/search-results/state.svelte';
	import type { RecipeSearchResults } from '$stylist/search/interface/recipe/search-results';

	let {
		results,
		query,
		loading = false,
		class: className = '',
		showMetadata = true,
		maxResults,
		skin = true,
		onResultClick,
		...rest
	}: RecipeSearchResults = $props();

	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createSearchResultsState(() => ({
		results,
		query,
		loading,
		class: className,
		maxResults
	}));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<div {...rest} class={state.rootClass} aria-busy={loading} data-search-skin={skin ? '' : undefined}>
	{#if loading}
		<HtmlP role="status" class="c-search-results__status">Loading…</HtmlP>
	{:else if state.empty}
		<HtmlP role="status" class="c-search-results__status">No results for “{query}”</HtmlP>
	{:else}
		<HtmlUl class="c-search-results__list">
			{#each state.displayedResults as result (result.id)}
				<HtmlLi class="c-search-results__entry">
					<HtmlButton
						type="button"
						class="c-search-results__item"
						onclick={() => onResultClick?.(result)}
					>
						<Icon name={state.icon(result.type)} size={20} class="c-search-results__icon" />
						<span class="c-search-results__content">
							<span class="c-search-results__title">{result.title}</span>
							{#if result.description}
								<span class="c-search-results__desc">{result.description}</span>
							{/if}
							{#if showMetadata && result.metadata}
								<span class="c-search-results__meta">{state.metadata(result)}</span>
							{/if}
						</span>
					</HtmlButton>
				</HtmlLi>
			{/each}
		</HtmlUl>
	{/if}
</div>

<style>
	:global {
		:where(.c-search-results__status) {
			margin: 0;
			padding: var(--space-8, 2rem);
			text-align: center;
			font-size: var(--font-size-3-5, 0.875rem);
			color: var(--color-text-secondary, GrayText);
		}
		:where(.c-search-results__list) {
			margin: 0;
			padding: 0;
			list-style: none;
			overflow: hidden;
			border: var(--border-width-thin, 1px) solid var(--color-border-primary, GrayText);
			border-radius: var(--radius-2, 0.5rem);
		}
		:where(.c-search-results__entry) {
			margin: 0;
		}
		:where(.c-search-results__entry + .c-search-results__entry) {
			border-block-start: var(--border-width-thin, 1px) solid var(--color-border-primary, GrayText);
		}
		/* A row, not the skin's filled button; the skin keeps focus-visible and fonts. */
		:where(.c-search-results__item) {
			display: flex;
			gap: var(--space-3, 0.75rem);
			inline-size: 100%;
			padding: var(--space-4, 1rem);
			border: 0;
			border-radius: 0;
			background: transparent;
			color: inherit;
			font-weight: inherit;
			text-align: start;
			cursor: pointer;
			transition: background-color var(--duration-150, 150ms) var(--easing-ease, ease);
		}
		:where(.c-search-results__item:hover) {
			background: var(--color-background-secondary, Canvas);
		}
		:where(.c-search-results__item:focus-visible) {
			outline-offset: calc(-1 * var(--focus-width, 2px));
		}
		:where(.c-search-results__icon) {
			flex-shrink: 0;
			color: var(--color-text-secondary, GrayText);
		}
		:where(.c-search-results__content) {
			display: grid;
			gap: var(--space-1, 0.25rem);
		}
		:where(.c-search-results__title) {
			font-weight: var(--font-weight-medium, 500);
		}
		:where(.c-search-results__desc) {
			font-size: var(--font-size-3-5, 0.875rem);
			color: var(--color-text-secondary, GrayText);
		}
		:where(.c-search-results__meta) {
			font-size: var(--font-size-3, 0.75rem);
			color: var(--color-text-secondary, GrayText);
		}
	}
</style>
