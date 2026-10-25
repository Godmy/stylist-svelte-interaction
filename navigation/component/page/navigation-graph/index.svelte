<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlCaption from '$stylist/html/component/organism/caption/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import HtmlSmall from '$stylist/html/component/atom/small/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlTable from '$stylist/html/component/molecule/table/index.svelte';
	import HtmlTbody from '$stylist/html/component/molecule/tbody/index.svelte';
	import HtmlTd from '$stylist/html/component/organism/td/index.svelte';
	import HtmlTh from '$stylist/html/component/organism/th/index.svelte';
	import HtmlThead from '$stylist/html/component/molecule/thead/index.svelte';
	import HtmlTr from '$stylist/html/component/molecule/tr/index.svelte';
	import { NavigationComposite } from '$stylist/navigation/class/composite/navigation';
	import { resolveNavigationGraphLayout } from '$stylist/navigation/function/resolve/navigation-graph-layout';
	import type { RecipeNavigationGraph } from '$stylist/navigation/interface/recipe/navigation-graph';

	let {
		element = $bindable(null),
		graph,
		heading,
		activeId,
		onSelect,
		drawerLabel = 'Drawer',
		table = true,
		class: className,
		...rest
	}: RecipeNavigationGraph = $props();

	const composite = $derived(NavigationComposite.fromGraph(graph));
	const layout = $derived(resolveNavigationGraphLayout(composite, { drawerLabel }));
	const labels = $derived(new Map(layout.nodes.map((node) => [node.id, node.label])));
	const activeLeaf = $derived(activeId ? composite.resolve(activeId)?.id : undefined);
	const markerId = $props.id();
</script>

<HtmlSection bind:element {...rest} class={['c-navigation-graph', className]}>
	{#if heading}
		<HtmlH2 class="c-navigation-graph__heading">{heading}</HtmlH2>
	{/if}
	<HtmlDiv class="c-navigation-graph__viewport">
		<HtmlDiv
			class="c-navigation-graph__canvas"
			style={`width: ${layout.width}px; height: ${layout.height}px;`}
		>
			<svg
				class="c-navigation-graph__edges"
				width={layout.width}
				height={layout.height}
				viewBox={`0 0 ${layout.width} ${layout.height}`}
				aria-hidden="true"
			>
				<defs>
					<marker
						id={markerId}
						viewBox="0 0 10 10"
						refX="9"
						refY="5"
						markerWidth="7"
						markerHeight="7"
						orient="auto-start-reverse"
					>
						<path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
					</marker>
				</defs>
				{#each layout.edges as edge (edge.key)}
					<path
						class="c-navigation-graph__edge"
						data-kind={edge.kind}
						d={edge.path}
						marker-end={`url(#${markerId})`}
					/>
					{#if edge.label}
						<text
							class="c-navigation-graph__edge-label"
							x={edge.labelX}
							y={edge.labelY}
							text-anchor="middle">{edge.label}</text
						>
					{/if}
				{/each}
			</svg>
			{#each layout.nodes as node (node.id)}
				{@const style = `left: ${node.x}px; top: ${node.y}px; width: ${node.width}px; height: ${node.height}px;`}
				{#if node.kind === 'drawer'}
					<HtmlDiv class="c-navigation-graph__node" data-kind="drawer" {style}>
						<HtmlSpan class="c-navigation-graph__label">{node.label}</HtmlSpan>
					</HtmlDiv>
				{:else}
					<HtmlButton
						type="button"
						class="c-navigation-graph__node"
						data-kind="fragment"
						data-start={node.start || undefined}
						data-active={node.id === activeLeaf || undefined}
						aria-current={node.id === activeLeaf ? 'page' : undefined}
						disabled={!onSelect}
						title={node.description}
						{style}
						onclick={() => onSelect?.(node.id)}
					>
						<HtmlSpan class="c-navigation-graph__label">{node.label}</HtmlSpan>
						{#if node.group || node.start}
							<HtmlSmall class="c-navigation-graph__meta">
								{[node.start ? 'start' : '', node.group ?? ''].filter(Boolean).join(' · ')}
							</HtmlSmall>
						{/if}
					</HtmlButton>
				{/if}
			{/each}
		</HtmlDiv>
	</HtmlDiv>

	{#if table}
		<HtmlTable class="c-navigation-graph__table">
			<HtmlCaption class="c-navigation-graph__caption">Transitions</HtmlCaption>
			<HtmlThead>
				<HtmlTr>
					<HtmlTh scope="col">From</HtmlTh>
					<HtmlTh scope="col">Transition</HtmlTh>
					<HtmlTh scope="col">To</HtmlTh>
					<HtmlTh scope="col">Back stack</HtmlTh>
				</HtmlTr>
			</HtmlThead>
			<HtmlTbody>
				{#each composite.topLevel() as node (node.id)}
					<HtmlTr>
						<HtmlTd>{drawerLabel}</HtmlTd>
						<HtmlTd>select</HtmlTd>
						<HtmlTd>{labels.get(node.startLeaf().id) ?? node.label}</HtmlTd>
						<HtmlTd>reset to start</HtmlTd>
					</HtmlTr>
				{/each}
				{#each composite.transitions() as { action, from, to } (action.id)}
					<HtmlTr>
						<HtmlTd>{from.label}</HtmlTd>
						<HtmlTd>{action.label ?? action.id}</HtmlTd>
						<HtmlTd>{labels.get(to.startLeaf().id) ?? to.label}</HtmlTd>
						<HtmlTd>
							{#if action.popUpTo}
								pop {action.popUpToInclusive ? 'including' : 'to'}
								{composite.find(action.popUpTo)?.label ?? action.popUpTo}
							{:else if action.singleTop}
								single top
							{:else}
								push
							{/if}
						</HtmlTd>
					</HtmlTr>
				{/each}
			</HtmlTbody>
		</HtmlTable>
	{/if}
</HtmlSection>

<style>
	:global {
		.c-navigation-graph {
			display: grid;
			gap: var(--space-4, 1rem);
			min-width: 0;
			color: var(--color-text-primary);
		}
		.c-navigation-graph__heading {
			margin: 0;
			font-size: var(--font-size-5, 1.25rem);
			font-weight: var(--font-weight-semibold, 600);
		}
		.c-navigation-graph__viewport {
			overflow: auto;
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-secondary);
		}
		.c-navigation-graph__canvas {
			position: relative;
		}
		.c-navigation-graph__edges {
			position: absolute;
			inset: 0;
			overflow: visible;
			color: var(--color-text-tertiary);
		}
		.c-navigation-graph__edge {
			fill: none;
			stroke: currentColor;
			stroke-width: 1.5;
		}
		.c-navigation-graph__edge[data-kind='drawer'] {
			stroke-dasharray: 4 4;
		}
		.c-navigation-graph__edge-label {
			fill: var(--color-text-secondary);
			font-size: 0.6875rem;
			paint-order: stroke;
			stroke: var(--color-background-secondary);
			stroke-width: 4px;
		}
		.c-navigation-graph__node {
			position: absolute;
			display: grid;
			align-content: center;
			box-sizing: border-box;
			padding: 0 calc(var(--space-4, 1rem) * 0.75);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-2, 0.5rem);
			background: var(--color-background-raised, var(--color-background-primary));
			color: inherit;
			font: inherit;
			text-align: start;
			box-shadow: var(--elevation-level1);
		}
		.c-navigation-graph__node[data-kind='drawer'] {
			border-style: dashed;
			background: transparent;
			box-shadow: none;
			color: var(--color-text-secondary);
		}
		.c-navigation-graph__node[data-start] {
			border-color: var(--color-border-accent, var(--color-primary-500));
		}
		.c-navigation-graph__node[data-active] {
			background: var(--color-primary-container, var(--color-background-tertiary));
			color: var(--color-on-primary-container, inherit);
		}
		button.c-navigation-graph__node:not(:disabled) {
			cursor: pointer;
		}
		button.c-navigation-graph__node:not(:disabled):hover {
			box-shadow: var(--elevation-level3);
		}
		button.c-navigation-graph__node:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 2px);
		}
		.c-navigation-graph__label {
			overflow: hidden;
			font-weight: var(--font-weight-medium, 500);
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.c-navigation-graph__meta {
			color: var(--color-text-secondary);
		}
		.c-navigation-graph__table {
			width: 100%;
			border-collapse: collapse;
			font-size: var(--font-relative-small, 0.875em);
		}
		.c-navigation-graph__caption {
			padding-bottom: calc(var(--space-4, 1rem) / 2);
			font-weight: var(--font-weight-semibold, 600);
			text-align: start;
		}
		.c-navigation-graph__table th,
		.c-navigation-graph__table td {
			padding: calc(var(--space-4, 1rem) / 2);
			border-bottom: var(--border-width-thin, 1px) solid var(--color-border-primary);
			text-align: start;
		}
		.c-navigation-graph__table th {
			color: var(--color-text-secondary);
			font-weight: var(--font-weight-medium, 500);
		}
	}
</style>
