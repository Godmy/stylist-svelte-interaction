<script lang="ts">
	import MegaMenuTrigger from '$stylist/menu/component/atom/mega-menu-trigger/index.svelte';
	import MegaMenuPanel from '$stylist/menu/component/molecule/mega-menu-panel/index.svelte';
	import { createMegaMenuState } from '$stylist/menu/function/state/mega-menu/index.svelte';
	import type { RecipeMegaMenu } from '$stylist/menu/interface/recipe/mega-menu';

	let props: RecipeMegaMenu = $props();
	const state = createMegaMenuState(() => props);
	const uid = $props.id();

	const restProps = $derived.by(() => {
		const {
			sections: _sections,
			ariaLabel: _ariaLabel,
			openOnHover: _openOnHover,
			closeDelayMs: _closeDelayMs,
			switchDelayMs: _switchDelayMs,
			compact: _compact,
			defaultOpenId: _defaultOpenId,
			class: _class,
			leading: _leading,
			trailing: _trailing,
			onOpenChange: _onOpenChange,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
</script>

<nav
	{...restProps}
	bind:this={state.root}
	class={state.classes}
	aria-label={props.ariaLabel ?? 'Главное меню'}
	data-open={state.openId ? '' : undefined}
	onkeydown={state.handleKeydown}
	onfocusout={state.handleFocusOut}
>
	<div class="c-mega-menu__bar">
		{#if props.leading}
			<div class="c-mega-menu__leading">{@render props.leading()}</div>
		{/if}

		<ul class="c-mega-menu__list">
			{#each props.sections as section (section.id)}
				{@const panelId = `${uid}-panel-${section.id}`}
				<li
					class="c-mega-menu__item"
					onpointerenter={(event) => state.handlePointerEnter(event, section.id)}
					onpointerleave={state.handlePointerLeave}
				>
					{#if state.hasPanel(section.id)}
						<MegaMenuTrigger
							label={section.label}
							open={state.isOpen(section.id)}
							active={section.active}
							controls={panelId}
							data-mega-trigger={section.id}
							onclick={() => state.toggle(section.id)}
							onkeydown={(event) => state.handleTriggerKeydown(event, section.id)}
						/>
						{#if state.isOpen(section.id)}
							<div class="c-mega-menu__dropdown" data-mega-panel={section.id}>
								<MegaMenuPanel
									id={panelId}
									{section}
									compact={props.compact}
									onNavigate={state.handleNavigate}
								/>
							</div>
						{/if}
					{:else}
						<a
							class="c-mega-menu__link"
							href={section.href ?? '#'}
							data-mega-trigger={section.id}
							data-active={section.active || undefined}
							aria-current={section.active ? 'page' : undefined}
							onclick={state.handleNavigate}
							onkeydown={(event) => state.handleTriggerKeydown(event, section.id)}
						>
							{section.label}
						</a>
					{/if}
				</li>
			{/each}
		</ul>

		{#if props.trailing}
			<div class="c-mega-menu__trailing">{@render props.trailing()}</div>
		{/if}
	</div>
</nav>

<style>
	.c-mega-menu {
		position: relative;
		z-index: 30;
		width: 100%;
	}

	.c-mega-menu__bar {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-border-primary, #e2e8f0);
		background: var(--color-background-primary, #fff);
	}

	.c-mega-menu__leading,
	.c-mega-menu__trailing {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.c-mega-menu__trailing {
		margin-left: auto;
	}

	.c-mega-menu__list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.125rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* Static items let the absolute dropdown span the whole nav width. */
	.c-mega-menu__item {
		position: static;
	}

	.c-mega-menu__link {
		display: inline-flex;
		align-items: center;
		padding: 0.625rem 0.875rem;
		border-radius: 0.5rem;
		color: var(--color-text-primary, #0f172a);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		transition: background-color var(--duration-150, 150ms) ease;
	}

	.c-mega-menu__link:hover {
		background: var(--color-background-secondary, #f1f5f9);
	}

	.c-mega-menu__link:focus-visible {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 2px;
	}

	.c-mega-menu__link[data-active] {
		color: var(--color-primary-600, #2563eb);
	}

	.c-mega-menu__dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		/* Padding instead of margin keeps the hover area continuous with the bar. */
		padding: 0.5rem 1rem 0;
		animation: c-mega-menu-in var(--duration-200, 200ms) ease-out;
	}

	@keyframes c-mega-menu-in {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.c-mega-menu__bar {
			flex-wrap: wrap;
		}

		.c-mega-menu__list {
			flex-direction: column;
			align-items: stretch;
			order: 3;
			width: 100%;
		}

		.c-mega-menu__item :global(.c-mega-trigger),
		.c-mega-menu__link {
			width: 100%;
			justify-content: space-between;
		}

		.c-mega-menu__dropdown {
			position: static;
			padding: 0.25rem 0 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-mega-menu__dropdown {
			animation: none;
		}

		.c-mega-menu__link {
			transition: none;
		}
	}
</style>
