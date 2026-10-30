<script lang="ts">
	import HtmlInputSearch from '$stylist/html/component/atom/input-search/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_ICON_NAME } from '$stylist/search/const/value/search-icon-name';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createSearchFieldState from '$stylist/search/component/atom/search-field/state.svelte';
	import type { RecipeSearchField } from '$stylist/search/interface/recipe/search-field';

	let {
		value = $bindable(''),
		element = $bindable(null),
		class: className = '',
		inputClass = '',
		icon = true,
		skin = true,
		onValueInput,
		onClear,
		onEscape,
		oninput,
		onkeydown,
		...rest
	}: RecipeSearchField = $props();

	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createSearchFieldState(() => ({
		...rest,
		class: className,
		inputClass,
		icon,
		onClear,
		onEscape,
		oninput,
		onkeydown,
		onValueInput: (next) => {
			value = next;
			onValueInput?.(next);
		}
	}));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<span class={state.rootClass} data-search-skin={skin ? '' : undefined}>
	{#if icon}
		<Icon name={SEARCH_ICON_NAME} size={16} class="c-search-field__icon" aria-hidden="true" />
	{/if}
	<HtmlInputSearch
		{...rest}
		bind:element
		bind:value
		class={state.inputClass}
		aria-label={state.ariaLabel}
		oninput={state.handleInput}
		onkeydown={state.handleKeydown}
	/>
</span>

<style>
	:global {
		/* The native look comes from the html skin; these rules only place the icon. */
		:where(.c-search-field) {
			position: relative;
			display: inline-flex;
			align-items: center;
			min-inline-size: 0;
		}
		:where(.c-search-field__icon) {
			position: absolute;
			inset-inline-start: var(--density-inline, 0.75rem);
			display: inline-flex;
			color: var(--color-text-tertiary, GrayText);
			pointer-events: none;
		}
		:where(.c-search-field__icon svg) {
			inline-size: var(--search-icon-size, 1rem);
			block-size: var(--search-icon-size, 1rem);
		}
		:where(.c-search-field__input) {
			box-sizing: border-box;
			inline-size: 100%;
			min-inline-size: 0;
		}
		:where(.c-search-field--icon .c-search-field__input) {
			padding-inline-start: calc(
				var(--density-inline, 0.75rem) + var(--search-icon-size, 1rem) + var(--space-2, 0.5rem)
			);
		}
	}
</style>
