<script lang="ts">
	import HtmlSearch from '$stylist/html/component/organism/search/index.svelte';
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createSearchBarState from '$stylist/search/component/molecule/search-bar/state.svelte';
	import type { RecipeSearchBar } from '$stylist/search/interface/recipe/search-bar';

	let {
		value = $bindable(''),
		element = $bindable(null),
		placeholder = 'Search…',
		disabled = false,
		debounceMs,
		submitLabel = 'Search',
		clearLabel = 'Clear search',
		class: className = '',
		skin = true,
		onValueInput,
		onSearch,
		onClear,
		...rest
	}: RecipeSearchBar = $props();

	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createSearchBarState(() => ({
		value,
		disabled,
		debounceMs,
		class: className,
		onSearch,
		onClear,
		onValueInput: (next) => {
			value = next;
			onValueInput?.(next);
		}
	}));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<HtmlSearch {...rest} bind:element class={state.rootClass} data-search-skin={skin ? '' : undefined}>
	<SearchField
		bind:value
		bind:element={state.field}
		{placeholder}
		{disabled}
		skin={false}
		class="c-search-bar__field"
		onValueInput={state.handleValueInput}
		onClear={state.notifyClear}
		onkeydown={state.handleKeydown}
	/>
	{#if state.clearable}
		<HtmlButton
			type="button"
			class="c-search-bar__clear"
			aria-label={clearLabel}
			onclick={state.handleClear}
		>
			<Icon name="x" size={16} aria-hidden="true" />
		</HtmlButton>
	{/if}
	<HtmlButton type="button" class="c-search-bar__submit" {disabled} onclick={state.triggerSearch}>
		{submitLabel}
	</HtmlButton>
</HtmlSearch>

<style>
	:global {
		:where(.c-search-bar) {
			display: flex;
			align-items: center;
			gap: var(--space-2, 0.5rem);
		}
		:where(.c-search-bar__field) {
			flex: 1;
		}
		/* A quiet icon button: the skin's filled look stays with the submit button. */
		:where(.c-search-bar__clear) {
			display: inline-grid;
			place-items: center;
			padding: var(--space-1, 0.25rem);
			border: var(--border-width-thin, 1px) solid transparent;
			border-radius: var(--radius-1-5, 0.375rem);
			background: transparent;
			color: var(--color-text-secondary, GrayText);
			cursor: pointer;
		}
		:where(.c-search-bar__clear:hover) {
			background: var(--color-background-secondary, Canvas);
			color: var(--color-text-primary, CanvasText);
		}
		:where(.c-search-bar__clear svg) {
			inline-size: var(--search-icon-size, 1rem);
			block-size: var(--search-icon-size, 1rem);
		}
	}
</style>
