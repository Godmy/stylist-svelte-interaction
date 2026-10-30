<script lang="ts">
	import HtmlSearch from '$stylist/html/component/organism/search/index.svelte';
	import HtmlForm from '$stylist/html/component/organism/form/index.svelte';
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createSearchFormState from '$stylist/search/component/organism/search-form/state.svelte';
	import type { RecipeSearchForm } from '$stylist/search/interface/recipe/search-form';

	let {
		query = $bindable(''),
		element = $bindable(null),
		placeholder = 'Search…',
		name = 'q',
		submitLabel = 'Search',
		method = 'get',
		class: className = '',
		skin = true,
		onSearch,
		onsubmit,
		...rest
	}: RecipeSearchForm = $props();

	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createSearchFormState(() => ({ query, class: className, onSearch, onsubmit }));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<HtmlSearch class={state.rootClass} data-search-skin={skin ? '' : undefined}>
	<HtmlForm
		{...rest}
		bind:element
		{method}
		class="c-search-form__form"
		onsubmit={state.handleSubmit}
	>
		<SearchField
			bind:value={query}
			{name}
			{placeholder}
			skin={false}
			class="c-search-form__field"
		/>
		<HtmlButton type="submit" class="c-search-form__submit">{submitLabel}</HtmlButton>
	</HtmlForm>
</HtmlSearch>

<style>
	:global {
		:where(.c-search-form__form) {
			display: flex;
			align-items: center;
			gap: var(--space-2, 0.5rem);
			/* The skin spaces forms as blocks of text; a search row sits flush. */
			margin: 0;
		}
		:where(.c-search-form__field) {
			flex: 1;
		}
	}
</style>
