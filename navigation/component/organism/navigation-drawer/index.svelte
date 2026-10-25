<script lang="ts">
	import Accordion from '$stylist/dialog/component/molecule/accordion/index.svelte';
	import AccordionLayout from '$stylist/dialog/component/atom/accordion-layout/index.svelte';
	import HtmlAside from '$stylist/html/component/organism/aside/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlLi from '$stylist/html/component/organism/li/index.svelte';
	import HtmlNav from '$stylist/html/component/organism/nav/index.svelte';
	import HtmlUl from '$stylist/html/component/molecule/ul/index.svelte';
	import NavigationItem from '$stylist/navigation/component/molecule/navigation-item/index.svelte';
	import { isIconName } from '$stylist/svg/function/check/icon-name';
	import type { RecipeNavigationDrawer } from '$stylist/navigation/interface/recipe/navigation-drawer';
	import type { ContractNavigationDrawerSection } from '$stylist/navigation/interface/contract/navigation-drawer-section';

	let {
		element = $bindable(null),
		sections,
		mode = 'modal',
		open = $bindable(false),
		isActive,
		onSelect,
		onClose,
		accordion = false,
		expandAll = false,
		openSection,
		label = 'Navigation',
		header,
		footer,
		class: className,
		...rest
	}: RecipeNavigationDrawer = $props();

	const visible = $derived(mode === 'permanent' || open);
	const sectionKey = (section: (typeof sections)[number], index: number) =>
		section.label ?? `section-${index}`;
	function sectionActive(section: ContractNavigationDrawerSection): boolean {
		return (
			section.destinations.some((destination) => isActive?.(destination.id)) ||
			(section.sections?.some(sectionActive) ?? false)
		);
	}
	// The open accordion section follows `openSection`, else the active destination.
	const activeSection = $derived.by(() => {
		if (openSection) return openSection;
		const index = sections.findIndex(sectionActive);
		return index === -1 ? undefined : sectionKey(sections[index], index);
	});

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

{#snippet list(section: (typeof sections)[number])}
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
	{#if section.sections?.length}
		<Accordion
			class="c-navigation-drawer__nested"
			defaultValue={section.sections.find(sectionActive)?.label}
		>
			{#each section.sections as child, index (sectionKey(child, index))}
				<AccordionLayout
					class="c-navigation-drawer__subsection"
					value={sectionKey(child, index)}
					title={child.label ?? ''}
					icon={isIconName(child.icon) ? child.icon : undefined}
					iconSvg={child.iconSvg}
					alwaysOpen={expandAll}
				>
					{@render list(child)}
				</AccordionLayout>
			{/each}
		</Accordion>
	{/if}
{/snippet}

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
		{#if accordion}
			<Accordion class="c-navigation-drawer__accordion" defaultValue={activeSection}>
				{#each sections as section, index (sectionKey(section, index))}
					{#if section.label}
						<AccordionLayout
							class="c-navigation-drawer__accordion-section"
							value={sectionKey(section, index)}
							title={section.label}
							icon={isIconName(section.icon) ? section.icon : undefined}
							iconSvg={section.iconSvg}
							alwaysOpen={expandAll}
						>
							{@render list(section)}
						</AccordionLayout>
					{:else}
						{@render list(section)}
					{/if}
				{/each}
			</Accordion>
		{:else}
			{#each sections as section, index (sectionKey(section, index))}
				{#if section.label}
					<HtmlH2 class="c-navigation-drawer__section">{section.label}</HtmlH2>
				{/if}
				{@render list(section)}
			{/each}
		{/if}
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
			padding: calc(var(--space-4, 1rem) * 0.75);
			overflow-y: auto;
			background: var(--color-background-raised, var(--color-background-primary));
			color: var(--color-text-primary);
		}
		.c-navigation-drawer[data-mode='modal'] {
			position: fixed;
			inset-block: 0;
			inset-inline-start: 0;
			z-index: var(--z-index-modal, 1400);
			border-start-end-radius: var(--radius-4, 1rem);
			border-end-end-radius: var(--radius-4, 1rem);
			box-shadow: var(--elevation-modal);
			transform: translateX(-105%);
			visibility: hidden;
			transition:
				transform var(--duration-300, 300ms) var(--easing-emphasized, ease),
				visibility 0s linear var(--duration-300, 300ms);
		}
		.c-navigation-drawer[data-mode='modal'][data-open] {
			transform: none;
			visibility: visible;
			transition: transform var(--duration-300, 300ms) var(--easing-emphasized, ease);
		}
		.c-navigation-drawer[data-mode='permanent'] {
			width: 18rem;
			border-inline-end: var(--border-width-thin, 1px) solid var(--color-border-primary);
		}
		.c-navigation-drawer__scrim {
			position: fixed;
			inset: 0;
			z-index: var(--z-index-overlay, 1300);
			background: var(--color-scrim, var(--color-backdrop));
		}
		.c-navigation-drawer__header {
			padding: var(--space-4, 1rem);
		}
		.c-navigation-drawer__nav {
			flex: 1;
		}
		.c-navigation-drawer__section {
			margin: var(--space-4, 1rem) 0 0;
			padding: calc(var(--space-4, 1rem) / 2) var(--space-4, 1rem);
			border-top: var(--border-width-thin, 1px) solid var(--color-border-primary);
			color: var(--color-text-secondary);
			font-size: var(--font-relative-small, 0.875em);
			font-weight: var(--font-weight-medium, 500);
		}
		/* Drawer-scoped accordion, edge to edge of the drawer: no frame of its own, square
		   full-width section headers; the items keep the drawer's inset (beats the
		   accordion's scoped rules). */
		.c-navigation-drawer .c-navigation-drawer__nav .c-navigation-drawer__accordion {
			margin-inline: calc(var(--space-4, 1rem) * -0.75);
			border: 0;
			border-radius: 0;
		}
		.c-navigation-drawer .c-navigation-drawer__accordion-section {
			border-bottom: 0;
		}
		.c-navigation-drawer .c-navigation-drawer__accordion-section .c-accordion-layout__header {
			padding: calc(var(--space-4, 1rem) * 0.75) calc(var(--space-4, 1rem) * 1.75);
			border-radius: 0;
			background: transparent;
			font-weight: var(--font-weight-semibold, 600);
		}
		/* Equal space above the first item and below the last one, so an open section's
		   items sit as far from their own header as from the next one. */
		.c-navigation-drawer .c-navigation-drawer__accordion-section .c-accordion-layout__content {
			padding: calc(var(--space-4, 1rem) / 2) calc(var(--space-4, 1rem) * 0.75);
			border-top: 0;
			background: transparent;
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
			padding: var(--space-4, 1rem);
		}
		.c-navigation-drawer__nested {
			border: 0;
			border-radius: 0;
		}
		.c-navigation-drawer__nested .c-accordion-layout__header {
			font-size: 0.875rem;
		}
		/* A nested section lies inside the parent's content inset, so its header gives that
		   inset back on both sides: its icon and chevron lie exactly under the parent's. */
		.c-navigation-drawer .c-navigation-drawer__nested .c-accordion-layout__header {
			padding-inline: calc(var(--space-4, 1rem) * (1.75 - 0.75));
		}
		/* One grid at every nesting level: icons in one column (a slot of
		   --c-navigation-drawer-icon-size), text from one line, chevrons and badges on one
		   right edge. A nested section adds no inset of its own, and an item without an icon
		   starts its text where the others do once the drawer shows any icon. */
		.c-navigation-drawer .c-navigation-drawer__nested .c-accordion-layout__content {
			padding-inline: 0;
		}
		.c-navigation-drawer .c-accordion-layout__icon,
		.c-navigation-drawer .c-navigation-item__icon {
			width: var(--c-navigation-drawer-icon-size, 1.5rem);
		}
		.c-navigation-drawer:has(.c-navigation-item__icon, .c-accordion-layout__icon)
			.c-navigation-item:not(:has(.c-navigation-item__icon)) {
			padding-inline-start: calc(
				var(--space-4, 1rem) * 1.75 + var(--c-navigation-drawer-icon-size, 1.5rem)
			);
		}
		@media (prefers-reduced-motion: reduce) {
			.c-navigation-drawer[data-mode='modal'],
			.c-navigation-drawer[data-mode='modal'][data-open] {
				transition: none;
			}
		}
	}
</style>
