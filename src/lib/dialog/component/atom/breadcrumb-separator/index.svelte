<script lang="ts">
	import type { RecipeBreadcrumbSeparator } from '$stylist/dialog/interface/recipe/breadcrumb-separator';
	import createBreadcrumbSeparatorState from './state.svelte';

	let props: RecipeBreadcrumbSeparator = $props();
	const state = createBreadcrumbSeparatorState(() => props);
</script>

<span class={state.separatorClasses} aria-hidden="true" {...props}>
	{#if props.children}
		{@render props.children()}
	{:else}
		&rarr;
	{/if}
</span>

<style>
	.c-breadcrumb-separator {
		display: inline-flex;
		align-items: center;
		color: var(--color-text-tertiary);
	}
</style>
