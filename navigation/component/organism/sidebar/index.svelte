<script lang="ts">
	import type { RecipeSidebar } from '$stylist/navigation/interface/recipe/sidebar';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createSidebarState } from './state.svelte';

	let props: RecipeSidebar = $props();
	const state = createSidebarState(() => props);
</script>

<div class={state.hostClass} {...state.restProps}>
	<!-- Mobile menu button -->
	{#if state.collapsible && state.isMobile}
		<button
			type="button"
			class={state.mobileButtonClass}
			onclick={state.toggleSidebar}
			aria-label={state.isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
		>
			{#if state.isSidebarOpen}
				<Icon name="x" size="lg" />
			{:else}
				<Icon name="menu" size="lg" />
			{/if}
		</button>
	{/if}

	<!-- Sidebar overlay for mobile -->
	{#if state.isMobile && state.isSidebarOpen}
		<div
			class={state.overlayClass}
			onclick={state.toggleSidebar}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					state.toggleSidebar();
				}
			}}
			role="button"
			tabindex="0"
			aria-label="Close sidebar"
		></div>
	{/if}

	<!-- Sidebar -->
	<aside class={state.sidebarClass} style={state.sidebarStyle} aria-label="Sidebar navigation">
		<div class={state.sidebarContainerClass}>
			<!-- Header with logo and title -->
			<div class={state.headerClass}>
				{#if props.logo}
					<div class={state.logoWrapperClass}>
						{@render props.logo()}
					</div>
				{/if}
				{#if state.title && state.isSidebarOpen}
					<h1 class={state.titleClassComputed}>{state.title}</h1>
				{/if}
			</div>

			<!-- Navigation items -->
			<nav class={state.navClassComputed}>
				<ul class={state.navListClass}>
					{#each state.items as item (item.id)}
						<li>
							<a
								href={item.href || '#'}
								class={state.getNavItemClass(item)}
								onclick={(e) => {
									e.preventDefault();
									state.handleClick(item);
								}}
								aria-current={item.active ? 'page' : undefined}
								aria-disabled={item.disabled}
							>
								{#if item.icon && state.isSidebarOpen}
									<span class={state.navItemIconWrapperClass}>
										<item.icon style="width:1.25rem;height:1.25rem" />
									</span>
								{/if}
								{#if state.isSidebarOpen}
									<span class={state.navItemLabelClass}>{item.label}</span>
									{#if item.badge}
										<span class={state.navItemBadgeClass}>
											{item.badge}
										</span>
									{/if}
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Footer -->
			{#if props.footer}
				<div class={state.footerClassComputed}>
					{@render props.footer()}
				</div>
			{/if}
		</div>
	</aside>

	<!-- Content area (placeholder) -->
	<div class={state.contentAreaClass}>
		<!-- Actual content would go here -->
	</div>
</div>

<style>
	.sidebar__host {
		display: flex;
	}

	.sidebar__mobile-button {
		position: absolute;
		top: var(--spacing-4);
		left: var(--spacing-4);
		padding: var(--spacing-2);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
	}
	@media (min-width: 1024px) {
		.sidebar__mobile-button {
			display: none;
		}
	}

	.sidebar__overlay {
		position: fixed;
		inset: 0;
		background-color: var(--color-overlay-backdrop);
	}
	@media (min-width: 1024px) {
		.sidebar__overlay {
			display: none;
		}
	}

	.sidebar__sidebar {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		background-color: var(--color-background-primary);
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateX(-100%);
		margin-left: 0;
	}
	@media (min-width: 1024px) {
		.sidebar__sidebar {
			position: sticky;
		}
	}

	.sidebar__sidebar-container {
		display: flex;
		height: 100%;
		flex-direction: column;
		border-right-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
	}

	.sidebar__header {
		display: flex;
		align-items: center;
		border-bottom-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		padding: var(--spacing-4);
	}

	.sidebar__logo-wrapper {
		margin-right: var(--spacing-3);
	}

	.sidebar__title {
		color: var(--color-text-primary);
	}

	.sidebar__nav {
		flex: 1 1 0%;
		overflow-y: auto;
		padding-top: var(--spacing-4);
		padding-bottom: var(--spacing-4);
	}

	.sidebar__nav-list {
		padding-left: var(--spacing-2);
		padding-right: var(--spacing-2);
	}
	.sidebar__nav-list > * + * {
		margin-top: var(--spacing-1);
	}

	.sidebar__nav-item {
		display: flex;
		align-items: center;
		border-radius: var(--radius-lg);
		padding: var(--spacing-3);
		transition-property: color, background-color, border-color;
		transition-duration: 150ms;
		border-color: var(--color-border-primary);
		color: var(--color-text-primary);
		text-decoration: none;
		cursor: pointer;
	}
	.sidebar__nav-item:hover {
		background-color: var(--color-background-hover);
	}
	.sidebar__nav-item--active {
		background-color: var(--color-primary-50);
	}
	.sidebar__nav-item--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.sidebar__nav-item-icon-wrapper {
		margin-right: var(--spacing-3);
	}

	.sidebar__nav-item-label {
		flex: 1 1 0%;
		text-align: left;
	}

	.sidebar__nav-item-badge {
		border-radius: 9999px;
		background-color: var(--color-background-tertiary);
		padding-left: var(--spacing-2);
		padding-right: var(--spacing-2);
		padding-top: calc(var(--spacing-1, 0.25rem) / 2);
		padding-bottom: calc(var(--spacing-1, 0.25rem) / 2);
		color: var(--color-text-primary);
	}

	.sidebar__footer {
		margin-top: auto;
		border-top-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		padding: var(--spacing-4);
	}

	.sidebar__content-area {
		flex: 1 1 0%;
		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
	}
	@media (min-width: 1024px) {
		.sidebar__content-area {
			margin-left: 0;
		}
	}
</style>
