<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeBreadcrumbLink } from '$stylist/dialog/interface/recipe/breadcrumb-link';
	import createBreadcrumbLinkState from './state.svelte';

	type BreadcrumbLinkProps = RecipeBreadcrumbLink &
		HTMLAttributes<HTMLAnchorElement> & {
			current?: boolean;
			href?: string;
			children?: Snippet;
			class?: string;
		};

	let linkProps: BreadcrumbLinkProps = $props();
	const state = createBreadcrumbLinkState(linkProps);
</script>

{#if linkProps.current}
	<span class={state.linkClass} aria-current="page">
		{#if linkProps.children}
			{@render linkProps.children()}
		{/if}
	</span>
{:else}
	<a
		href={linkProps.href}
		class={state.linkClass}
		onclick={linkProps.onclick}
		onmouseenter={linkProps.onmouseenter}
		onfocus={linkProps.onfocus}
		onblur={linkProps.onblur}
	>
		{#if linkProps.children}
			{@render linkProps.children()}
		{/if}
	</a>
{/if}

<style>
	.c-breadcrumb-link {
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition:
			color var(--duration-150, 150ms) var(--easing-smooth, ease-in-out),
			background-color var(--duration-150, 150ms) var(--easing-smooth, ease-in-out);
	}
	.c-breadcrumb-link:hover {
		background-color: var(--color-background-secondary);
		color: var(--color-primary-600);
	}
	.c-breadcrumb-link--current {
		background-color: var(--color-background-secondary);
		color: var(--color-text-primary);
	}
</style>
