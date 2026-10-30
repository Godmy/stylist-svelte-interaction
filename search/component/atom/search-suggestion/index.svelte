<script lang="ts">
	import HtmlUl from '$stylist/html/component/molecule/ul/index.svelte';
	import HtmlLi from '$stylist/html/component/organism/li/index.svelte';
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createSearchSuggestionState from '$stylist/search/component/atom/search-suggestion/state.svelte';
	import type { RecipeSearchSuggestion } from '$stylist/search/interface/recipe/search-suggestion';

	let {
		suggestions,
		query = '',
		loading = false,
		class: className = '',
		suggestionClass = '',
		maxSuggestions,
		skin = true,
		onValueChange,
		...rest
	}: RecipeSearchSuggestion = $props();

	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createSearchSuggestionState(() => ({
		suggestions,
		query,
		class: className,
		suggestionClass,
		maxSuggestions,
		onValueChange
	}));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<div {...rest} class={state.rootClass} aria-busy={loading} data-search-skin={skin ? '' : undefined}>
	{#if loading}
		<HtmlP role="status" class="c-search-suggestion__status">
			<span class="c-search-suggestion__spinner" aria-hidden="true"></span>
			<span class="c-search-suggestion__sr">Loading…</span>
		</HtmlP>
	{:else if state.empty}
		<HtmlP role="status" class="c-search-suggestion__status">No suggestions found</HtmlP>
	{:else}
		<HtmlUl class="c-search-suggestion__list">
			{#each state.displayedSuggestions as suggestion (suggestion.id)}
				<HtmlLi class="c-search-suggestion__item">
					<HtmlButton
						type="button"
						class={state.buttonClass}
						onclick={() => state.handleSuggestionClick(suggestion)}
					>
						<span class="c-search-suggestion__row">
							{#if suggestion.icon}
								<span class="c-search-suggestion__icon" aria-hidden="true">{suggestion.icon}</span>
							{/if}
							<span>{suggestion.text}</span>
							{#if suggestion.count}
								<span class="c-search-suggestion__count">({suggestion.count})</span>
							{/if}
						</span>
						{#if suggestion.category}
							<span class="c-search-suggestion__category">{suggestion.category}</span>
						{/if}
					</HtmlButton>
				</HtmlLi>
			{/each}
		</HtmlUl>
	{/if}
</div>

<style>
	:global {
		:where(.c-search-suggestion) {
			overflow: hidden;
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary, Canvas);
			box-shadow: var(--elevation-level3, 0 4px 6px -1px rgb(0 0 0 / 0.1));
		}
		:where(.c-search-suggestion__status) {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			padding: var(--space-4, 1rem);
			font-size: var(--font-size-3-5, 0.875rem);
			color: var(--color-text-secondary, GrayText);
		}
		:where(.c-search-suggestion__spinner) {
			inline-size: 1.25rem;
			block-size: 1.25rem;
			border: var(--border-width-medium, 2px) solid transparent;
			border-block-end-color: var(--color-primary-500, Highlight);
			border-radius: 9999px;
			animation: c-search-suggestion-spin 0.75s linear infinite;
		}
		:where(.c-search-suggestion__sr) {
			position: absolute;
			inline-size: 1px;
			block-size: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
		:where(.c-search-suggestion__list) {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		:where(.c-search-suggestion__item) {
			margin: 0;
		}
		:where(.c-search-suggestion__item + .c-search-suggestion__item) {
			border-block-start: var(--border-width-thin, 1px) solid var(--color-border-primary, GrayText);
		}
		/* A row, not the skin's filled button; the skin keeps focus-visible and fonts. */
		:where(.c-search-suggestion__button) {
			display: block;
			inline-size: 100%;
			padding: var(--density-block, 0.5rem) var(--space-4, 1rem);
			border: 0;
			border-radius: 0;
			background: transparent;
			color: var(--color-text-primary, CanvasText);
			font-size: var(--font-size-3-5, 0.875rem);
			font-weight: inherit;
			text-align: start;
			cursor: pointer;
		}
		:where(.c-search-suggestion__button:hover) {
			background: var(--color-primary-50, Canvas);
			color: var(--color-primary-700, CanvasText);
		}
		:where(.c-search-suggestion__row) {
			display: flex;
			align-items: center;
		}
		:where(.c-search-suggestion__icon) {
			margin-inline-end: var(--space-2, 0.5rem);
		}
		:where(.c-search-suggestion__count) {
			margin-inline-start: auto;
			font-size: var(--font-size-3, 0.75rem);
			color: var(--color-text-secondary, GrayText);
		}
		:where(.c-search-suggestion__category) {
			display: block;
			margin-inline-start: var(--space-6, 1.5rem);
			font-size: var(--font-size-3, 0.75rem);
			color: var(--color-text-secondary, GrayText);
		}
		@keyframes c-search-suggestion-spin {
			to {
				transform: rotate(360deg);
			}
		}
		@media (prefers-reduced-motion: reduce) {
			:where(.c-search-suggestion__spinner) {
				animation-duration: 3s;
			}
		}
	}
</style>
