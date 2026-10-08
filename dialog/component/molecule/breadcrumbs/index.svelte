<script lang="ts">
	import BreadcrumbDropdown from '$stylist/dialog/component/atom/breadcrumb-dropdown/index.svelte';
	import BreadcrumbLink from '$stylist/dialog/component/atom/breadcrumb-link/index.svelte';
	import BreadcrumbSeparator from '$stylist/dialog/component/atom/breadcrumb-separator/index.svelte';
	import type { RecipeBreadcrumbs } from '$stylist/dialog/interface/recipe/breadcrumbs';
	import createBreadcrumbsState from './state.svelte';

	let props: RecipeBreadcrumbs = $props();
	const state = createBreadcrumbsState(() => props);
</script>

<nav aria-label="Breadcrumb" class={props.class ?? ''} {...state.restProps}>
	<ol class={state.listClass}>
		{#each state.visibleCrumbs as crumb, i (crumb.id)}
			<li class={state.itemClass} onmouseleave={state.clearHoveredId}>
				{#if i > 0}
					<BreadcrumbSeparator class={state.separatorClass} />
				{/if}
				<div class={state.linkClusterClass}>
					<BreadcrumbLink
						href={crumb.href}
						current={i === state.totalCrumbs - 1}
						class={i === state.totalCrumbs - 1 ? state.currentItemClass : state.activeLinkClass}
						onclick={(event: MouseEvent) => state.handleNavigate(crumb.id, event)}
						onmouseenter={() => state.setHoveredId(crumb.id)}
						onfocus={() => state.setHoveredId(crumb.id)}
						onblur={state.clearHoveredId}
					>
						{crumb.label}
					</BreadcrumbLink>
					<BreadcrumbDropdown
						open={state.hoveredId === crumb.id}
						items={state.getDropdownItems(crumb.id)}
						onSelect={state.handleDropdownSelect}
					/>
				</div>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.c-breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		row-gap: 0.5rem;
		border-radius: 1.25rem;
		border: 1px solid var(--color-border-secondary);
		background-color: var(--color-background-primary);
		padding: 0.75rem 1rem;
		list-style: none;
		margin: 0;
	}
	.c-breadcrumbs__item {
		display: flex;
		align-items: center;
	}
	.c-breadcrumbs__link-cluster {
		position: relative;
		display: flex;
		align-items: center;
	}
	.c-breadcrumbs__separator {
		margin: 0 0.5rem;
	}
	.c-breadcrumbs__link {
		color: var(--color-text-secondary);
		text-decoration: none;
	}
	.c-breadcrumbs__link:hover {
		color: var(--color-primary-600);
		text-decoration: underline;
	}
	.c-breadcrumbs__current {
		color: var(--color-text-primary);
		font-weight: 600;
	}
</style>
