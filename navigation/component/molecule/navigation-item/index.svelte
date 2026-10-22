<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeNavigationItem } from '$stylist/navigation/interface/recipe/navigation-item';

	let {
		destination,
		active = false,
		onSelect,
		class: className,
		...rest
	}: RecipeNavigationItem = $props();
</script>

<HtmlButton
	type="button"
	{...rest}
	class={['c-navigation-item', className]}
	data-active={active || undefined}
	aria-current={active ? 'page' : undefined}
	disabled={destination.disabled}
	onclick={() => onSelect?.(destination.id)}
>
	{#if destination.icon}
		<Icon name={destination.icon} size={24} class="c-navigation-item__icon" aria-hidden="true" />
	{/if}
	<HtmlSpan class="c-navigation-item__label">{destination.label}</HtmlSpan>
	{#if destination.badge !== undefined}
		<HtmlSpan class="c-navigation-item__badge">{destination.badge}</HtmlSpan>
	{/if}
</HtmlButton>

<style>
	:global {
		.c-navigation-item {
			display: flex;
			align-items: center;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			width: 100%;
			min-height: 3.5rem;
			padding: 0 var(--layout-spacing-1rem, 1rem);
			border: 0;
			border-radius: var(--layout-border-radius-full, 9999px);
			background: transparent;
			color: var(--color-text-secondary);
			font: inherit;
			font-weight: var(--typography-font-weight-medium, 500);
			text-align: start;
			cursor: pointer;
			transition: background-color var(--motion-duration-150, 150ms) var(--motion-easing-ease, ease);
		}
		.c-navigation-item:hover:not(:disabled) {
			background: var(--color-background-container, var(--color-background-secondary));
		}
		.c-navigation-item:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: calc(var(--focus-width, 2px) * -1);
		}
		.c-navigation-item[data-active] {
			background: var(--color-primary-container, var(--color-background-secondary));
			color: var(--color-on-primary-container, var(--color-text-primary));
		}
		.c-navigation-item:disabled {
			opacity: var(--opacity-60, 0.6);
			cursor: not-allowed;
		}
		.c-navigation-item__label {
			flex: 1;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.c-navigation-item__badge {
			font-size: var(--font-relative-small, 0.875em);
			font-variant-numeric: tabular-nums;
		}
	}
</style>
