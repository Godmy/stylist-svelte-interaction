<script lang="ts">
	// The content scrolls inside the activity, not the window: a new fragment starts at
	// the top instead of inheriting the previous one's scroll position.
	// Template snippets below are cast to `Snippet`: as props they fail svelte-check
	// with a duplicated SnippetReturn type.
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlMain from '$stylist/html/component/organism/main/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import NavigationDrawer from '$stylist/navigation/component/organism/navigation-drawer/index.svelte';
	import TopAppBar from '$stylist/navigation/component/organism/top-app-bar/index.svelte';
	import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';
	import createActivityComponentState from '$stylist/navigation/component/page/activity/state.svelte';

	let props: RecipeActivity = $props();

	const state = createActivityComponentState(() => props);
</script>

{#snippet actions()}
	{@render props.actions?.(state.navigator)}
{/snippet}

{#snippet leading()}
	{@render props.appBarLeading?.(state.activity.handleNavigation, state.activity.drawerOpen)}
{/snippet}

{#snippet drawerHeader()}
	{#if props.drawerHeader}
		{@render props.drawerHeader()}
	{:else}
		<HtmlP class="c-activity__app-name">{props.heading}</HtmlP>
	{/if}
{/snippet}

{#snippet drawerFooter()}
	{@render props.drawerFooter?.(state.navigator, state.activity.closeDrawer)}
{/snippet}

<HtmlDiv
	{...state.activity.restProps}
	class={['c-activity', props.class]}
	data-drawer={state.activity.hasDrawer
		? state.activity.permanent
			? 'permanent'
			: 'modal'
		: 'none'}
>
	{#if state.activity.hasDrawer}
		<NavigationDrawer
			class="c-activity__drawer"
			sections={state.activity.sections}
			mode={state.activity.permanent ? 'permanent' : 'modal'}
			open={state.activity.drawerOpen}
			isActive={(id) =>
				props.activeDestination ? id === props.activeDestination : state.navigator.isActive(id)}
			onSelect={state.activity.select}
			onClose={state.activity.closeDrawer}
			accordion={props.drawerAccordion}
			expandAll={props.drawerExpandAll}
			openSection={state.activity.activeSection}
			header={(props.drawerHeader || props.heading ? drawerHeader : undefined) as
				Snippet | undefined}
			footer={(props.drawerFooter ? drawerFooter : undefined) as Snippet | undefined}
		/>
	{/if}
	<HtmlDiv class="c-activity__body" inert={state.activity.modalOpen}>
		<TopAppBar
			class="c-activity__bar"
			titleContent={props.appBarTitle}
			leading={(props.appBarLeading ? leading : undefined) as Snippet | undefined}
			heading={state.navigator.composite.find(props.activeDestination ?? '')?.destination.label ??
				state.navigator.destination.label}
			navigation={state.activity.navigationMode}
			menuOpen={state.activity.drawerOpen}
			elevated={state.scrolled}
			onNavigation={state.activity.handleNavigation}
			actions={(props.actions ? actions : undefined) as Snippet | undefined}
		/>
		<HtmlMain
			bind:element={state.content}
			class="c-activity__content"
			onscroll={(event) => (state.scrolled = event.currentTarget.scrollTop > 0)}
		>
			{#key state.navigator.entry.key}
				<!-- Native element: transitions do not apply to components. -->
				<div class="c-activity__fragment" in:fly={state.activity.transition}>
					{@render props.fragment(state.navigator)}
				</div>
			{/key}
		</HtmlMain>
		{#if state.activity.showFab}
			<HtmlDiv class="c-activity__fab">{@render props.fab?.(state.navigator)}</HtmlDiv>
		{/if}
	</HtmlDiv>
</HtmlDiv>

<style>
	:global {
		.c-activity {
			position: relative;
			display: flex;
			height: 100dvh;
			overflow: hidden;
			background: var(--color-background-primary);
			color: var(--color-text-primary);
		}
		.c-activity__drawer[data-mode='permanent'] {
			flex-shrink: 0;
		}
		.c-activity__body {
			position: relative;
			display: flex;
			flex: 1;
			flex-direction: column;
			min-width: 0;
		}
		.c-activity__bar {
			position: relative;
			z-index: var(--z-index-sticky, 1100);
			flex-shrink: 0;
		}
		.c-activity__content {
			flex: 1;
			min-height: 0;
			overflow-y: auto;
			overscroll-behavior: contain;
		}
		.c-activity__fragment {
			display: flex;
			flex-direction: column;
			min-height: 100%;
		}
		.c-activity__fragment > .c-fragment[data-layout='fill'] {
			flex: 1;
			height: auto;
		}
		.c-activity__fab {
			position: absolute;
			inset-inline-end: var(--space-4, 1rem);
			inset-block-end: var(--space-4, 1rem);
			z-index: var(--z-index-sticky, 1100);
		}
		.c-activity__app-name {
			margin: 0;
			font-size: var(--font-size-5, 1.25rem);
			font-weight: var(--font-weight-semibold, 600);
		}
	}
</style>
