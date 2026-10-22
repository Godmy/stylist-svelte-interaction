<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlMain from '$stylist/html/component/organism/main/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import NavigationDrawer from '$stylist/navigation/component/organism/navigation-drawer/index.svelte';
	import TopAppBar from '$stylist/navigation/component/organism/top-app-bar/index.svelte';
	import { createActivityState } from '$stylist/navigation/function/state/activity/index.svelte';
	import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';

	let props: RecipeActivity = $props();
	const activity = createActivityState(() => props);
	const navigator = $derived(activity.navigator);
	let scrolled = $state(false);
	// Template snippets below are cast to `Snippet`: as props they fail svelte-check
	// with a duplicated SnippetReturn type.
</script>

{#snippet actions()}
	{@render props.actions?.(navigator)}
{/snippet}

{#snippet drawerHeader()}
	{#if props.drawerHeader}
		{@render props.drawerHeader()}
	{:else}
		<HtmlP class="c-activity__app-name">{props.heading}</HtmlP>
	{/if}
{/snippet}

<HtmlDiv
	{...activity.restProps}
	class={['c-activity', props.class]}
	data-drawer={activity.permanent ? 'permanent' : 'modal'}
>
	<NavigationDrawer
		class="c-activity__drawer"
		sections={activity.sections}
		mode={activity.permanent ? 'permanent' : 'modal'}
		open={activity.drawerOpen}
		isActive={(id) => navigator.isActive(id)}
		onSelect={activity.select}
		onClose={activity.closeDrawer}
		header={(props.drawerHeader || props.heading ? drawerHeader : undefined) as Snippet | undefined}
		footer={props.drawerFooter}
	/>
	<HtmlDiv class="c-activity__body" inert={activity.modalOpen}>
		<TopAppBar
			class="c-activity__bar"
			heading={navigator.destination.label}
			navigation={activity.navigationMode}
			menuOpen={activity.drawerOpen}
			elevated={scrolled}
			onNavigation={activity.handleNavigation}
			actions={(props.actions ? actions : undefined) as Snippet | undefined}
		/>
		<HtmlMain
			class="c-activity__content"
			onscroll={(event) => (scrolled = event.currentTarget.scrollTop > 0)}
		>
			{#key navigator.entry.key}
				<!-- Native element: transitions do not apply to components. -->
				<div class="c-activity__fragment" in:fly={activity.transition}>
					{@render props.fragment(navigator)}
				</div>
			{/key}
		</HtmlMain>
		{#if activity.showFab}
			<HtmlDiv class="c-activity__fab">{@render props.fab?.(navigator)}</HtmlDiv>
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
			z-index: var(--layout-z-index-sticky, 1100);
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
			inset-inline-end: var(--layout-spacing-1rem, 1rem);
			inset-block-end: var(--layout-spacing-1rem, 1rem);
			z-index: var(--layout-z-index-sticky, 1100);
		}
		.c-activity__app-name {
			margin: 0;
			font-size: var(--typography-font-size-5, 1.25rem);
			font-weight: var(--typography-font-weight-semibold, 600);
		}
	}
</style>
