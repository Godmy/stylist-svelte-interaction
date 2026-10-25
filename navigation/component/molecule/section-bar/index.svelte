<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlNav from '$stylist/html/component/organism/nav/index.svelte';
	import type { RecipeSectionBar } from '$stylist/navigation/interface/recipe/section-bar';

	let {
		element = $bindable(null),
		items,
		active,
		placement = 'strip',
		onItemSelect,
		class: className,
		...rest
	}: RecipeSectionBar = $props();
</script>

<HtmlNav bind:element {...rest} class={['c-section-bar', `c-section-bar--${placement}`, className]}>
	{#each items as item (item.id)}
		<HtmlButton
			type="button"
			class="c-section-bar__item"
			aria-current={active === item.id ? 'page' : undefined}
			onclick={() => onItemSelect?.(item.id)}
		>
			{item.label}
		</HtmlButton>
	{/each}
</HtmlNav>

<style>
	:global {
		.c-section-bar {
			display: flex;
			gap: calc(var(--space-4, 1rem) / 2);
			max-width: 100%;
			padding: calc(var(--space-4, 1rem) * 0.7);
			border-radius: var(--radius-2, 0.5rem);
			background: var(--color-background-inverse, #0f172a);
			color: var(--color-text-inverse, #fff);
		}
		.c-section-bar--strip {
			overflow-x: auto;
		}
		.c-section-bar--bottom {
			position: sticky;
			bottom: var(--space-4, 1rem);
			flex-wrap: wrap;
			justify-content: center;
		}
		.c-section-bar__item {
			flex-shrink: 0;
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid transparent;
			border-radius: var(--radius-1-5, 0.375rem);
			background: transparent;
			color: inherit;
			font: inherit;
			cursor: pointer;
		}
		.c-section-bar__item[aria-current] {
			border-color: currentColor;
			font-weight: var(--font-weight-bold, 700);
		}
		.c-section-bar__item:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
	}
</style>
