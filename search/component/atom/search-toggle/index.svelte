<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { SEARCH_ICON_NAME } from '$stylist/search/const/value/search-icon-name';
	import createSearchToggleState from '$stylist/search/component/atom/search-toggle/state.svelte';
	import type { RecipeSearchToggle } from '$stylist/search/interface/recipe/search-toggle';

	let {
		element = $bindable(null),
		open = false,
		onToggle,
		openLabel,
		closeLabel,
		class: className = '',
		onclick,
		...rest
	}: RecipeSearchToggle = $props();

	const state = createSearchToggleState(() => ({
		open,
		onToggle,
		openLabel,
		closeLabel,
		class: className,
		onclick
	}));
</script>

<HtmlButton
	{...rest}
	bind:element
	type="button"
	class={state.rootClass}
	aria-expanded={open}
	aria-label={state.label}
	onclick={state.handleClick}
>
	<Icon name={SEARCH_ICON_NAME} size={16} aria-hidden="true" />
</HtmlButton>

<style>
	:global {
		/* An icon button over the skin's filled button, as tall as a search control. */
		:where(.c-search-toggle) {
			display: inline-grid;
			place-items: center;
			box-sizing: border-box;
			inline-size: var(--search-control-size, calc(var(--search-icon-size, 1rem) + 0.75rem));
			block-size: var(--search-control-size, calc(var(--search-icon-size, 1rem) + 0.75rem));
			padding: 0;
			border: var(--border-width-thin, 1px) solid var(--color-border-primary, GrayText);
			border-radius: var(--radius-2, 0.5rem);
			background: var(--color-background-primary, Canvas);
			color: var(--color-text-secondary, GrayText);
			cursor: pointer;
		}
		:where(.c-search-toggle:hover:not(:disabled), .c-search-toggle[aria-expanded='true']) {
			border-color: var(--color-primary-500, Highlight);
			background: color-mix(
				in srgb,
				var(--color-primary-500, Highlight) 10%,
				var(--color-background-primary, Canvas)
			);
			color: var(--color-text-primary, CanvasText);
		}
		:where(.c-search-toggle svg) {
			inline-size: var(--search-icon-size, 1rem);
			block-size: var(--search-icon-size, 1rem);
		}
	}
</style>
