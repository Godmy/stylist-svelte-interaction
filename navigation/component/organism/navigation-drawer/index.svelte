<script lang="ts">
	import HtmlAside from '$stylist/html/component/organism/aside/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlLi from '$stylist/html/component/organism/li/index.svelte';
	import HtmlNav from '$stylist/html/component/organism/nav/index.svelte';
	import HtmlUl from '$stylist/html/component/molecule/ul/index.svelte';
	import NavigationItem from '$stylist/navigation/component/molecule/navigation-item/index.svelte';
	import type { RecipeNavigationDrawer } from '$stylist/navigation/interface/recipe/navigation-drawer';

	let {
		element = $bindable(null),
		sections,
		mode = 'modal',
		open = $bindable(false),
		isActive,
		onSelect,
		onClose,
		label = 'Navigation',
		header,
		footer,
		class: className,
		...rest
	}: RecipeNavigationDrawer = $props();

	const visible = $derived(mode === 'permanent' || open);

	function close() {
		if (onClose) onClose();
		else open = false;
	}

	// Modal drawer takes focus to its active (or first) item and returns it on close.
	$effect(() => {
		if (mode !== 'modal' || !open || !element) return;
		const previous = document.activeElement as HTMLElement | null;
		const target =
			element.querySelector<HTMLElement>('[aria-current="page"]') ??
			element.querySelector<HTMLElement>('button:not(:disabled)');
		target?.focus();
		return () => previous?.focus?.();
	});
</script>

<svelte:window
	onkeydown={(event) => mode === 'modal' && open && event.key === 'Escape' && close()}
/>

{#if mode === 'modal' && open}
	<HtmlDiv class="c-navigation-drawer__scrim" aria-hidden="true" onclick={close} />
{/if}

<HtmlAside
	bind:element
	{...rest}
	class={['c-navigation-drawer', className]}
	data-mode={mode}
	data-open={visible || undefined}
	inert={!visible}
	role={mode === 'modal' ? 'dialog' : undefined}
	aria-modal={mode === 'modal' ? 'true' : undefined}
	aria-label={mode === 'modal' ? label : undefined}
>
	{#if header}
		<HtmlDiv class="c-navigation-drawer__header">{@render header()}</HtmlDiv>
	{/if}
	<HtmlNav class="c-navigation-drawer__nav" aria-label={label}>
		{#each sections as section, index (section.label ?? index)}
			{#if section.label}
				<HtmlH2 class="c-navigation-drawer__section">{section.label}</HtmlH2>
			{/if}
			<HtmlUl class="c-navigation-drawer__list">
				{#each section.destinations as destination (destination.id)}
					<HtmlLi>
						<NavigationItem
							{destination}
							active={isActive?.(destination.id) ?? false}
							onSelect={(id) => onSelect?.(id)}
						/>
					</HtmlLi>
				{/each}
			</HtmlUl>
		{/each}
	</HtmlNav>
	{#if footer}
		<HtmlDiv class="c-navigation-drawer__footer">{@render footer()}</HtmlDiv>
	{/if}
</HtmlAside>

<style>
	:global {
		.c-navigation-drawer {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			width: min(22.5rem, calc(100vw - 3.5rem));
			height: 100%;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			overflow-y: auto;
			background: var(--color-background-raised, var(--color-background-primary));
			color: var(--color-text-primary);
		}
		.c-navigation-drawer[data-mode='modal'] {
			position: fixed;
			inset-block: 0;
			inset-inline-start: 0;
			z-index: var(--layout-z-index-modal, 1400);
			border-start-end-radius: var(--layout-border-radius-xxl, 1rem);
			border-end-end-radius: var(--layout-border-radius-xxl, 1rem);
			box-shadow: var(--elevation-modal);
			transform: translateX(-105%);
			visibility: hidden;
			transition:
				transform var(--motion-duration-300, 300ms) var(--motion-easing-emphasized, ease),
				visibility 0s linear var(--motion-duration-300, 300ms);
		}
		.c-navigation-drawer[data-mode='modal'][data-open] {
			transform: none;
			visibility: visible;
			transition: transform var(--motion-duration-300, 300ms) var(--motion-easing-emphasized, ease);
		}
		.c-navigation-drawer[data-mode='permanent'] {
			width: 18rem;
			border-inline-end: var(--border-width-thin, 1px) solid var(--color-border-primary);
		}
		.c-navigation-drawer__scrim {
			position: fixed;
			inset: 0;
			z-index: var(--layout-z-index-overlay, 1300);
			background: var(--color-scrim, var(--color-backdrop));
		}
		.c-navigation-drawer__header {
			padding: var(--layout-spacing-1rem, 1rem);
		}
		.c-navigation-drawer__nav {
			flex: 1;
		}
		.c-navigation-drawer__section {
			margin: var(--layout-spacing-1rem, 1rem) 0 0;
			padding: calc(var(--layout-spacing-1rem, 1rem) / 2) var(--layout-spacing-1rem, 1rem);
			border-top: var(--border-width-thin, 1px) solid var(--color-border-primary);
			color: var(--color-text-secondary);
			font-size: var(--font-relative-small, 0.875em);
			font-weight: var(--typography-font-weight-medium, 500);
		}
		.c-navigation-drawer__list {
			display: grid;
			gap: 2px;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		.c-navigation-drawer__footer {
			margin-top: auto;
			padding: var(--layout-spacing-1rem, 1rem);
		}
		@media (prefers-reduced-motion: reduce) {
			.c-navigation-drawer[data-mode='modal'],
			.c-navigation-drawer[data-mode='modal'][data-open] {
				transition: none;
			}
		}
	}
</style>
