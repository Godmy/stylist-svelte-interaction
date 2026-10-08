<script lang="ts">
	import type { RecipeAppHeader } from '$stylist/menu/interface/recipe/app-header';

	let props: RecipeAppHeader = $props();
</script>

<header class="c-app-header {props.class ?? ''}">
	<div class="c-app-header__inner">
		<div class="c-app-header__left">
			{#if props.brandHref}
				<a href={props.brandHref} class="c-app-header__brand">{props.brand}</a>
			{:else}
				<h1 class="c-app-header__brand c-app-header__brand--text">{props.brand}</h1>
			{/if}

			{#if props.navLinks?.length}
				<nav class="c-app-header__nav">
					{#each props.navLinks as link (link.href)}
						<a
							href={link.href}
							class="c-app-header__nav-link {link.active ? 'c-app-header__nav-link--active' : ''}"
							aria-current={link.active ? 'page' : undefined}
						>
							{link.label}
						</a>
					{/each}
				</nav>
			{/if}
		</div>

		{#if props.trailing}
			<div class="c-app-header__right">
				{@render props.trailing()}
			</div>
		{/if}
	</div>
</header>

<style>
	.c-app-header {
		background: var(--color-background-primary, #fff);
		border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.06);
	}
	.c-app-header__inner {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 4rem;
	}
	.c-app-header__left {
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}
	.c-app-header__brand {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary-600, #4f46e5);
		text-decoration: none;
		margin: 0;
	}
	.c-app-header__brand--text {
		cursor: default;
	}
	.c-app-header__nav {
		display: flex;
		gap: 2rem;
	}
	.c-app-header__nav-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary, #6b7280);
		text-decoration: none;
		padding: 0.25rem 0;
		border-bottom: 2px solid transparent;
		transition: color 0.15s;
	}
	.c-app-header__nav-link:hover {
		color: var(--color-primary-600, #4f46e5);
	}
	.c-app-header__nav-link--active {
		color: var(--color-text-primary, #111827);
		border-bottom-color: var(--color-primary-500, #6366f1);
	}
	.c-app-header__right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
