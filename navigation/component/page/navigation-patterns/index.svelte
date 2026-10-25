<script lang="ts">
	import Breadcrumbs from '$stylist/dialog/component/molecule/breadcrumbs/index.svelte';
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlH3 from '$stylist/html/component/atom/h3/index.svelte';
	import HtmlInputSearch from '$stylist/html/component/atom/input-search/index.svelte';
	import HtmlLabel from '$stylist/html/component/atom/label/index.svelte';
	import HtmlOption from '$stylist/html/component/atom/option/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSmall from '$stylist/html/component/atom/small/index.svelte';
	import HtmlSelect from '$stylist/html/component/molecule/select/index.svelte';
	import HtmlArticle from '$stylist/html/component/organism/article/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import SiteMenu from '$stylist/menu/component/organism/site-menu/index.svelte';
	import { siteMenuSearch } from '$stylist/menu/function/transform/site-menu-search';
	import SectionBar from '$stylist/navigation/component/molecule/section-bar/index.svelte';
	import WorkspaceMenu from '$stylist/navigation/component/organism/workspace-menu/index.svelte';
	import type { RecipeNavigationPatterns } from '$stylist/navigation/interface/recipe/navigation-patterns';
	import Pagination from '$stylist/pager/component/organism/pagination/index.svelte';

	let {
		element = $bindable(null),
		title = 'Навигация и меню',
		items,
		brand = 'ATELIER / studio',
		pageSize = 3,
		class: className,
		...rest
	}: RecipeNavigationPatterns = $props();

	const layouts = [
		{ value: 'header', label: 'Шапка' },
		{ value: 'sidebar', label: 'Боковая панель' },
		{ value: 'strip', label: 'Полоса разделов' },
		{ value: 'bottom', label: 'Нижняя панель' },
		{ value: 'cover', label: 'Шапка на обложке' }
	] as const;

	let layout = $state<(typeof layouts)[number]['value']>('header');
	let variant = $state<'mega' | 'dropdown' | 'dropup'>('mega');
	let active = $state('');
	let page = $state(1);
	let search = $state('');

	const selected = $derived(items.find((item) => item.id === active) ?? items[0]);
	const matching = $derived(siteMenuSearch(items, search));
	const size = $derived(Math.max(1, Math.floor(pageSize)));
	const pageCount = $derived(Math.max(1, Math.ceil(matching.length / size)));
	const current = $derived(Math.min(page, pageCount));
	const results = $derived(matching.slice((current - 1) * size, current * size));
	const crumbs = $derived(
		selected
			? [
					{ id: items[0].id, label: items[0].group },
					{ id: `group:${selected.group}`, label: selected.group },
					{ id: selected.id, label: selected.label }
				]
			: []
	);

	function select(id: string) {
		if (items.some((item) => item.id === id)) active = id;
	}
</script>

<HtmlSection bind:element {...rest} class={['c-navigation-patterns', className]} aria-label={title}>
	<HtmlDiv class="c-navigation-patterns__controls">
		<HtmlLabel class="c-navigation-patterns__field">
			Расположение
			<HtmlSelect class="c-navigation-patterns__input" bind:value={layout}>
				{#each layouts as option (option.value)}
					<HtmlOption value={option.value}>{option.label}</HtmlOption>
				{/each}
			</HtmlSelect>
		</HtmlLabel>
		<HtmlLabel class="c-navigation-patterns__field">
			Тип выпадающего меню
			<HtmlSelect class="c-navigation-patterns__input" bind:value={variant}>
				<HtmlOption value="mega">Mega-menu</HtmlOption>
				<HtmlOption value="dropdown">Dropdown</HtmlOption>
				<HtmlOption value="dropup">Dropup</HtmlOption>
			</HtmlSelect>
		</HtmlLabel>
	</HtmlDiv>

	<HtmlDiv
		class={[
			'c-navigation-patterns__preview',
			layout === 'sidebar' && 'c-navigation-patterns__preview--sidebar',
			layout === 'cover' && 'c-navigation-patterns__preview--cover'
		]}
	>
		{#if layout === 'sidebar'}
			<WorkspaceMenu
				{items}
				active={selected?.id}
				label="Разделы рабочего пространства"
				collapseLabel="Свернуть панель"
				expandLabel="Развернуть панель"
				itemLabel="Раздел"
				onItemSelect={select}
			/>
		{:else if layout === 'header' || layout === 'cover'}
			<HtmlDiv class={[variant === 'dropup' && 'c-navigation-patterns__dropup-space']}>
				<SiteMenu
					{items}
					active={selected?.id}
					{variant}
					{brand}
					toggleLabel="Открыть разделы"
					searchLabel="Поиск раздела"
					emptyLabel="Разделы не найдены"
					onItemSelect={select}
				/>
			</HtmlDiv>
		{:else if layout === 'strip'}
			<SectionBar
				{items}
				active={selected?.id}
				aria-label="Полоса разделов"
				onItemSelect={select}
			/>
		{/if}

		{#if selected}
			<HtmlSection class="c-navigation-patterns__panel">
				<Breadcrumbs {crumbs} activeId={selected.id} onNavigate={select} />
				<HtmlH2 class="c-navigation-patterns__title">{selected.label}</HtmlH2>
				<HtmlP>{selected.description}</HtmlP>
				<HtmlLabel class="c-navigation-patterns__field">
					Найти материал
					<HtmlInputSearch
						class="c-navigation-patterns__input"
						bind:value={search}
						oninput={() => (page = 1)}
					/>
				</HtmlLabel>
				<HtmlDiv class="c-navigation-patterns__cards">
					{#each results as item (item.id)}
						<HtmlArticle class="c-navigation-patterns__card">
							<HtmlSmall>{item.group}</HtmlSmall>
							<HtmlH3 class="c-navigation-patterns__card-title">{item.label}</HtmlH3>
							<HtmlP>{item.description}</HtmlP>
							<HtmlButton
								type="button"
								class="c-navigation-patterns__open"
								onclick={() => select(item.id)}
							>
								Открыть: {item.label}
							</HtmlButton>
						</HtmlArticle>
					{:else}
						<HtmlP role="status">Материалы не найдены</HtmlP>
					{/each}
				</HtmlDiv>
				<Pagination
					currentPage={current}
					totalPages={pageCount}
					onPageChange={(next) => (page = next)}
				/>
			</HtmlSection>
		{/if}

		{#if layout === 'bottom'}
			<SectionBar
				items={items.slice(0, 4)}
				active={selected?.id}
				placement="bottom"
				aria-label="Нижняя навигация"
				onItemSelect={select}
			/>
		{/if}
	</HtmlDiv>
</HtmlSection>

<style>
	:global {
		.c-navigation-patterns {
			display: flex;
			flex-direction: column;
			gap: var(--space-4, 1rem);
			min-width: 0;
			color: var(--color-text-primary);
		}
		.c-navigation-patterns__controls {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-4, 1rem);
		}
		.c-navigation-patterns__field {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) / 4);
			font-weight: var(--font-weight-medium, 500);
		}
		.c-navigation-patterns__input {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-secondary);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
			font: inherit;
		}
		.c-navigation-patterns__input:focus-visible,
		.c-navigation-patterns__open:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-navigation-patterns__preview {
			display: grid;
			gap: var(--space-4, 1rem);
			min-width: 0;
			padding: calc(var(--space-4, 1rem) * 1.2);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-secondary);
		}
		.c-navigation-patterns__preview--sidebar {
			grid-template-columns: 13.75rem minmax(0, 1fr);
		}
		.c-navigation-patterns__preview--cover {
			padding-top: calc(var(--space-4, 1rem) * 2.5);
			background: linear-gradient(
				130deg,
				var(--color-primary-800, #1e3a8a),
				var(--color-primary-400, #60a5fa)
			);
		}
		.c-navigation-patterns__dropup-space {
			padding-top: 21.25rem;
		}
		.c-navigation-patterns__panel {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) * 0.75);
			min-width: 0;
			padding: var(--space-4, 1rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-primary);
		}
		.c-navigation-patterns__title {
			margin: 0;
			font-size: var(--font-size-6, 1.5rem);
		}
		.c-navigation-patterns__cards {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: var(--space-4, 1rem);
		}
		.c-navigation-patterns__card {
			min-width: 0;
			padding: var(--space-4, 1rem);
			border-radius: var(--radius-2, 0.5rem);
			background: var(--color-background-secondary);
		}
		.c-navigation-patterns__card-title {
			margin: calc(var(--space-4, 1rem) / 4) 0;
		}
		.c-navigation-patterns__open {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary);
			color: inherit;
			font: inherit;
			cursor: pointer;
		}
		@media (max-width: 760px) {
			.c-navigation-patterns__preview {
				padding: calc(var(--space-4, 1rem) * 0.6);
			}
			.c-navigation-patterns__preview--sidebar,
			.c-navigation-patterns__cards {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
