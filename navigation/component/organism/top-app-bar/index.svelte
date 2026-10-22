<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlH1 from '$stylist/html/component/atom/h1/index.svelte';
	import HtmlHeader from '$stylist/html/component/organism/header/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import BurgerMenu from '$stylist/menu/component/atom/burger-menu/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeTopAppBar } from '$stylist/navigation/interface/recipe/top-app-bar';

	let {
		element = $bindable(null),
		heading,
		subheading,
		navigation = 'menu',
		menuOpen = false,
		onNavigation,
		navigationLabel,
		elevated = false,
		leading,
		actions,
		class: className,
		...rest
	}: RecipeTopAppBar = $props();
</script>

<HtmlHeader
	bind:element
	{...rest}
	class={['c-top-app-bar', className]}
	data-elevated={elevated || undefined}
>
	{#if leading}
		<HtmlDiv class="c-top-app-bar__leading">{@render leading()}</HtmlDiv>
	{:else if navigation === 'menu'}
		<HtmlDiv class="c-top-app-bar__leading">
			<BurgerMenu
				class="c-top-app-bar__burger"
				open={menuOpen}
				aria-label={navigationLabel ?? (menuOpen ? 'Close navigation' : 'Open navigation')}
				onclick={() => onNavigation?.()}
			/>
		</HtmlDiv>
	{:else if navigation === 'up'}
		<HtmlDiv class="c-top-app-bar__leading">
			<HtmlButton
				type="button"
				class="c-top-app-bar__icon-button"
				aria-label={navigationLabel ?? 'Navigate up'}
				onclick={() => onNavigation?.()}
			>
				<Icon name="back" size={24} aria-hidden="true" />
			</HtmlButton>
		</HtmlDiv>
	{/if}
	<HtmlDiv class="c-top-app-bar__titles">
		{#if heading}
			<HtmlH1 class="c-top-app-bar__heading">{heading}</HtmlH1>
		{/if}
		{#if subheading}
			<HtmlP class="c-top-app-bar__subheading">{subheading}</HtmlP>
		{/if}
	</HtmlDiv>
	{#if actions}
		<HtmlDiv class="c-top-app-bar__actions">{@render actions()}</HtmlDiv>
	{/if}
</HtmlHeader>

<style>
	:global {
		.c-top-app-bar {
			display: flex;
			align-items: center;
			gap: calc(var(--layout-spacing-1rem, 1rem) / 2);
			min-height: 4rem;
			padding: 0 calc(var(--layout-spacing-1rem, 1rem) / 2);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
			transition: box-shadow var(--motion-duration-200, 200ms) var(--motion-easing-ease, ease);
		}
		.c-top-app-bar[data-elevated] {
			box-shadow: var(--elevation-level2);
		}
		.c-top-app-bar__leading,
		.c-top-app-bar__actions {
			display: flex;
			align-items: center;
			flex-shrink: 0;
		}
		.c-top-app-bar__leading {
			min-width: 3rem;
			justify-content: center;
		}
		.c-top-app-bar__actions {
			gap: calc(var(--layout-spacing-1rem, 1rem) / 4);
		}
		/* 48px hit area around the 24px burger; beats its scoped `padding: 0`. */
		.c-top-app-bar .c-top-app-bar__leading > .c-top-app-bar__burger {
			box-sizing: content-box;
			padding: 0.9375rem 0.75rem;
			border-radius: var(--layout-border-radius-full, 9999px);
		}
		.c-top-app-bar__icon-button,
		.c-top-app-bar__actions > button {
			display: inline-grid;
			place-items: center;
			box-sizing: content-box;
			min-width: 1.5rem;
			min-height: 1.5rem;
			padding: 0.75rem;
			border: 0;
			border-radius: var(--layout-border-radius-full, 9999px);
			background: transparent;
			color: inherit;
			cursor: pointer;
		}
		.c-top-app-bar .c-top-app-bar__leading > .c-top-app-bar__burger:hover,
		.c-top-app-bar__icon-button:hover,
		.c-top-app-bar__actions > button:hover {
			background: var(--color-background-container, var(--color-background-secondary));
		}
		.c-top-app-bar__burger:focus-visible,
		.c-top-app-bar__icon-button:focus-visible,
		.c-top-app-bar__actions > button:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: calc(var(--focus-width, 2px) * -1);
		}
		.c-top-app-bar__titles {
			flex: 1;
			min-width: 0;
			padding-inline: calc(var(--layout-spacing-1rem, 1rem) / 2);
		}
		.c-top-app-bar__heading,
		.c-top-app-bar__subheading {
			margin: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.c-top-app-bar__heading {
			font-size: var(--typography-font-size-5, 1.25rem);
			font-weight: var(--typography-font-weight-normal, 400);
			line-height: var(--typography-line-height-tight, 1.25);
		}
		.c-top-app-bar__subheading {
			color: var(--color-text-secondary);
			font-size: var(--font-relative-small, 0.875em);
		}
		@media (prefers-reduced-motion: reduce) {
			.c-top-app-bar {
				transition: none;
			}
		}
	}
</style>
