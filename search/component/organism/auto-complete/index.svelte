<script lang="ts">
	import HtmlUl from '$stylist/html/component/molecule/ul/index.svelte';
	import HtmlLi from '$stylist/html/component/organism/li/index.svelte';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';
	import { SEARCH_SKIN_SCOPE } from '$stylist/search/const/value/search-skin-scope';
	import createAutoCompleteState from '$stylist/search/component/organism/auto-complete/state.svelte';
	import type { RecipeAutoComplete } from '$stylist/search/interface/recipe/auto-complete';

	let {
		value = $bindable(''),
		element = $bindable(null),
		options = [],
		placeholder = 'Search…',
		showAllSuggestions = false,
		class: className = '',
		inputClass = '',
		listClass = '',
		itemClass = '',
		skin = true,
		onValueInput,
		onSelect,
		onkeydown,
		onfocus,
		onblur,
		...rest
	}: RecipeAutoComplete = $props();

	const listId = $props.id();
	const stylesheet = serializeHtmlStylesheet({ scope: SEARCH_SKIN_SCOPE });
	const state = createAutoCompleteState(() => ({
		value,
		options,
		showAllSuggestions,
		class: className,
		listClass,
		itemClass,
		onSelect,
		onkeydown,
		onfocus,
		onblur,
		onValueInput: (next) => {
			value = next;
			onValueInput?.(next);
		}
	}));
</script>

<svelte:head
	>{#if skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

<div class={state.rootClass} data-search-skin={skin ? '' : undefined}>
	<SearchField
		{...rest}
		bind:value
		bind:element
		{placeholder}
		{inputClass}
		skin={false}
		class="c-auto-complete__field"
		role="combobox"
		autocomplete="off"
		aria-autocomplete="list"
		aria-expanded={state.expanded}
		aria-controls={listId}
		aria-activedescendant={state.highlightedIndex >= 0
			? `${listId}-${state.highlightedIndex}`
			: undefined}
		onValueInput={state.handleValueInput}
		onkeydown={state.handleKeydown}
		onfocus={state.handleFocus}
		onblur={state.handleBlur}
	/>

	<HtmlUl id={listId} role="listbox" class={state.listClass} hidden={!state.expanded}>
		{#each state.options as option, index (option.id)}
			<HtmlLi
				id="{listId}-{index}"
				role="option"
				aria-selected={index === state.highlightedIndex}
				class={state.itemClass}
				onmousedown={state.keepFocus}
				onclick={() => state.handleSelect(option)}
			>
				<span>{option.label}</span>
				{#if option.meta}
					<span class="c-auto-complete__meta">{option.meta}</span>
				{/if}
			</HtmlLi>
		{/each}
	</HtmlUl>
</div>

<style>
	:global {
		:where(.c-auto-complete) {
			position: relative;
		}
		:where(.c-auto-complete__field) {
			display: flex;
		}
		:where(.c-auto-complete__list) {
			position: absolute;
			inset-inline: 0;
			inset-block-start: calc(100% + var(--space-1, 0.25rem));
			z-index: var(--z-index-dropdown, 1000);
			max-block-size: 15rem;
			margin: 0;
			padding: var(--space-1, 0.25rem) 0;
			overflow: auto;
			list-style: none;
			border: var(--border-width-thin, 1px) solid var(--color-border-primary, GrayText);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary, Canvas);
			box-shadow: var(--elevation-level3, 0 4px 6px -1px rgb(0 0 0 / 0.1));
		}
		:where(.c-auto-complete__list[hidden]) {
			display: none;
		}
		:where(.c-auto-complete__item) {
			margin: 0;
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			cursor: pointer;
		}
		:where(.c-auto-complete__item:hover, .c-auto-complete__item[aria-selected='true']) {
			background: var(--color-primary-100, Highlight);
		}
		:where(.c-auto-complete__meta) {
			margin-inline-start: var(--space-2, 0.5rem);
			font-size: var(--font-size-3, 0.75rem);
			color: var(--color-text-secondary, GrayText);
		}
	}
</style>
