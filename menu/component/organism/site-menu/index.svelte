<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlH3 from '$stylist/html/component/atom/h3/index.svelte';
	import HtmlInputSearch from '$stylist/html/component/atom/input-search/index.svelte';
	import HtmlLabel from '$stylist/html/component/atom/label/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSmall from '$stylist/html/component/atom/small/index.svelte';
	import HtmlStrong from '$stylist/html/component/atom/strong/index.svelte';
	import HtmlSummary from '$stylist/html/component/atom/summary/index.svelte';
	import HtmlDetails from '$stylist/html/component/molecule/details/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlHeader from '$stylist/html/component/organism/header/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import { siteMenuGroup } from '$stylist/menu/function/transform/site-menu-group';
	import { siteMenuSearch } from '$stylist/menu/function/transform/site-menu-search';
	import type { RecipeSiteMenu } from '$stylist/menu/interface/recipe/site-menu';

	let {
		element = $bindable(null),
		items,
		active,
		variant = 'mega',
		brand,
		toggleLabel = 'Open sections',
		searchLabel = 'Search sections',
		emptyLabel = 'No sections found',
		onItemSelect,
		class: className,
		...rest
	}: RecipeSiteMenu = $props();

	let open = $state(false);
	let search = $state('');

	const groups = $derived(siteMenuGroup(siteMenuSearch(items, search)));

	function choose(id: string) {
		open = false;
		onItemSelect?.(id);
	}

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !open) return;
		open = false;
		element?.querySelector('summary')?.focus();
	}

	function closeOnOutsideClick(event: MouseEvent) {
		if (element && !element.contains(event.target as Node)) open = false;
	}
</script>

<svelte:window onkeydown={closeOnEscape} onclick={closeOnOutsideClick} />

<HtmlHeader bind:element {...rest} class={['c-site-menu', `c-site-menu--${variant}`, className]}>
	{#if brand}
		<HtmlStrong class="c-site-menu__brand">{brand}</HtmlStrong>
	{/if}
	<HtmlDetails class="c-site-menu__details" bind:open>
		<HtmlSummary class="c-site-menu__toggle">{toggleLabel}</HtmlSummary>
		<HtmlDiv class="c-site-menu__popover">
			<HtmlLabel class="c-site-menu__search">
				{searchLabel}
				<HtmlInputSearch class="c-site-menu__input" bind:value={search} />
			</HtmlLabel>
			<HtmlDiv class="c-site-menu__groups">
				{#each groups as { group, items: entries } (group)}
					<HtmlSection class="c-site-menu__group">
						<HtmlH3 class="c-site-menu__group-title">{group}</HtmlH3>
						{#each entries as item (item.id)}
							<HtmlButton
								type="button"
								class="c-site-menu__item"
								aria-current={active === item.id ? 'page' : undefined}
								onclick={() => choose(item.id)}
							>
								<HtmlStrong>{item.label}</HtmlStrong>
								{#if variant === 'mega'}
									<HtmlSmall class="c-site-menu__description">{item.description}</HtmlSmall>
								{/if}
							</HtmlButton>
						{/each}
					</HtmlSection>
				{:else}
					<HtmlP role="status">{emptyLabel}</HtmlP>
				{/each}
			</HtmlDiv>
		</HtmlDiv>
	</HtmlDetails>
</HtmlHeader>

<style>
	:global {
		.c-site-menu {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-4, 1rem);
			min-width: 0;
			padding: var(--space-4, 1rem);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-inverse, #0f172a);
			color: var(--color-text-inverse, #fff);
		}
		.c-site-menu__details {
			min-width: 0;
		}
		.c-site-menu__toggle {
			padding: calc(var(--space-4, 1rem) * 0.6);
			border: var(--border-width-thin, 1px) solid var(--color-border-inverse, currentColor);
			border-radius: var(--radius-1-5, 0.375rem);
			cursor: pointer;
		}
		.c-site-menu__popover {
			position: absolute;
			z-index: var(--z-index-dropdown, 1000);
			top: 100%;
			right: 0;
			left: 0;
			max-height: 21.25rem;
			overflow: auto;
			padding: calc(var(--space-4, 1rem) * 1.2);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-2, 0.5rem);
			background: var(--color-background-primary);
			box-shadow: var(--elevation-level3, 0 12px 24px rgba(0, 0, 0, 0.15));
			color: var(--color-text-primary);
		}
		.c-site-menu--dropup .c-site-menu__popover {
			top: auto;
			bottom: 100%;
		}
		.c-site-menu__search {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) / 4);
			margin-block-end: var(--space-4, 1rem);
			font-weight: var(--font-weight-medium, 500);
		}
		.c-site-menu__input {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-secondary);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
			font: inherit;
		}
		.c-site-menu__groups {
			display: grid;
			gap: var(--space-4, 1rem);
		}
		.c-site-menu--mega .c-site-menu__groups {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.c-site-menu__group-title {
			margin: 0 0 calc(var(--space-4, 1rem) / 2);
			font-size: var(--font-size-3, 0.75rem);
			text-transform: uppercase;
			color: var(--color-text-secondary);
		}
		.c-site-menu__item {
			display: block;
			width: 100%;
			margin-block: calc(var(--space-4, 1rem) * 0.3);
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid transparent;
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-secondary);
			color: var(--color-text-primary);
			font: inherit;
			text-align: start;
			cursor: pointer;
		}
		.c-site-menu__item:hover {
			background: var(--color-background-container, var(--color-background-tertiary));
		}
		.c-site-menu__item[aria-current] {
			border-color: var(--color-primary-600);
		}
		.c-site-menu__toggle:focus-visible,
		.c-site-menu__item:focus-visible,
		.c-site-menu__input:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-site-menu__description {
			display: block;
			margin-block-start: calc(var(--space-4, 1rem) * 0.3);
			font-weight: var(--font-weight-normal, 400);
			color: var(--color-text-secondary);
		}
		@media (max-width: 650px) {
			.c-site-menu--mega .c-site-menu__groups {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
