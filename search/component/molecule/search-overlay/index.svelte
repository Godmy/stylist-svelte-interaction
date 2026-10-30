<script lang="ts">
	import HtmlSearch from '$stylist/html/component/organism/search/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
	import SearchToggle from '$stylist/search/component/atom/search-toggle/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createSearchOverlayState from '$stylist/search/component/molecule/search-overlay/state.svelte';
	import type { RecipeSearchOverlay } from '$stylist/search/interface/recipe/search-overlay';

	let {
		open = $bindable(false),
		query = $bindable(''),
		element = $bindable(null),
		placeholder = 'Search…',
		class: className = '',
		skin = true,
		results,
		children,
		onOpenChange,
		...rest
	}: RecipeSearchOverlay = $props();

	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createSearchOverlayState(() => ({
		open,
		query,
		class: className,
		onOpenChange: (next) => {
			open = next;
			if (!next) query = '';
			onOpenChange?.(next);
		}
	}));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<HtmlSearch {...rest} bind:element class={state.rootClass} data-search-skin={skin ? '' : undefined}>
	{#if open}
		<div class="c-search-overlay__shell">
			<SearchField
				bind:value={query}
				bind:element={state.field}
				{placeholder}
				icon={false}
				skin={false}
				autocomplete="off"
				spellcheck={false}
				class="c-search-overlay__field"
				onEscape={state.close}
			/>
			{#if results && state.term}
				<div class="c-search-overlay__popup">{@render results(state.term)}</div>
			{/if}
		</div>
	{/if}
	<SearchToggle {open} onToggle={state.toggle} />
	{@render children?.()}
</HtmlSearch>

<style>
	:global {
		/* The field opens to the inline start of the toggle, over neighbouring content. */
		:where(.c-search-overlay) {
			position: relative;
			display: inline-flex;
			align-items: center;
			justify-content: flex-end;
			gap: var(--space-1, 0.25rem);
		}
		:where(.c-search-overlay__shell) {
			position: absolute;
			inset-block-start: 0;
			inset-inline-end: calc(100% + var(--space-1, 0.25rem));
			display: flex;
			inline-size: var(--search-overlay-width, 32rem);
		}
		:where(.c-search-overlay__field) {
			flex: 1;
		}
		:where(.c-search-overlay__field .c-search-field__input) {
			block-size: var(--search-control-size, calc(var(--search-icon-size, 1rem) + 0.75rem));
			padding-block: 0;
		}
		:where(.c-search-overlay__popup) {
			position: absolute;
			inset-block-start: calc(100% + var(--space-1, 0.25rem));
			inset-inline-start: 0;
			z-index: var(--z-index-dropdown, 1000);
			box-sizing: border-box;
			inline-size: 100%;
			max-block-size: min(22rem, 60vh);
			overflow: auto;
			padding: var(--space-1, 0.25rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary, GrayText);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-primary, Canvas);
			box-shadow: var(--elevation-level4, 0 10px 15px -3px rgb(0 0 0 / 0.1));
		}
	}
</style>
