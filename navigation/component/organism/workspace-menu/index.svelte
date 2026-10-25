<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlSummary from '$stylist/html/component/atom/summary/index.svelte';
	import HtmlDetails from '$stylist/html/component/molecule/details/index.svelte';
	import HtmlNav from '$stylist/html/component/organism/nav/index.svelte';
	import { siteMenuGroup } from '$stylist/menu/function/transform/site-menu-group';
	import type { RecipeWorkspaceMenu } from '$stylist/navigation/interface/recipe/workspace-menu';

	let {
		element = $bindable(null),
		items,
		active,
		compact = $bindable(false),
		label = 'Workspace sections',
		collapseLabel = 'Collapse panel',
		expandLabel = 'Expand panel',
		itemLabel = 'Section',
		onItemSelect,
		class: className,
		...rest
	}: RecipeWorkspaceMenu = $props();

	const groups = $derived(siteMenuGroup(items));
</script>

<HtmlNav
	bind:element
	aria-label={label}
	{...rest}
	class={['c-workspace-menu', compact && 'c-workspace-menu--compact', className]}
>
	<HtmlButton
		type="button"
		class="c-workspace-menu__toggle"
		aria-expanded={!compact}
		onclick={() => (compact = !compact)}
	>
		{compact ? expandLabel : collapseLabel}
	</HtmlButton>
	{#each groups as { group, items: entries } (group)}
		<HtmlDetails class="c-workspace-menu__group" open>
			<HtmlSummary class="c-workspace-menu__group-title">{group}</HtmlSummary>
			{#each entries as item (item.id)}
				<HtmlButton
					type="button"
					class="c-workspace-menu__item"
					aria-label={`${itemLabel}: ${item.label}`}
					aria-current={active === item.id ? 'page' : undefined}
					title={item.label}
					onclick={() => onItemSelect?.(item.id)}
				>
					{compact ? item.label.slice(0, 1) : item.label}
				</HtmlButton>
			{/each}
		</HtmlDetails>
	{/each}
</HtmlNav>

<style>
	:global {
		.c-workspace-menu {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) / 2);
			min-width: 0;
			padding: var(--space-4, 1rem);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-secondary);
			color: var(--color-text-primary);
		}
		.c-workspace-menu--compact {
			max-width: 10rem;
		}
		.c-workspace-menu__toggle,
		.c-workspace-menu__item {
			width: 100%;
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary);
			color: inherit;
			font: inherit;
			text-align: start;
			cursor: pointer;
		}
		.c-workspace-menu__item {
			margin-block: calc(var(--space-4, 1rem) * 0.35);
		}
		.c-workspace-menu__item[aria-current] {
			border-color: var(--color-primary-600, #2563eb);
			background: var(--color-primary-600, #2563eb);
			color: var(--color-on-primary, #fff);
		}
		.c-workspace-menu__toggle:focus-visible,
		.c-workspace-menu__item:focus-visible,
		.c-workspace-menu__group-title:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-workspace-menu__group-title {
			padding-block: calc(var(--space-4, 1rem) * 0.8);
			font-weight: var(--font-weight-bold, 700);
			cursor: pointer;
		}
	}
</style>
