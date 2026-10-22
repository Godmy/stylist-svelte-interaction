<script lang="ts">
	import Breadcrumbs from '$stylist/dialog/component/atom/breadcrumbs/index.svelte';
	import BreadcrumbLink from '$stylist/dialog/component/atom/breadcrumb-link/index.svelte';
	import BreadcrumbSeparator from '$stylist/dialog/component/atom/breadcrumb-separator/index.svelte';
	import type { RecipeBreadcrumbsContainer } from '$stylist/dialog/interface/recipe/breadcrumbs-container';

	// Render of index.story.ts: the container is only meaningful filled with BreadcrumbLink and BreadcrumbSeparator children.
	let args: RecipeBreadcrumbsContainer = $props();
</script>

<div class="_c1">
	<Breadcrumbs {...args}>
		<div class="_c2">
			<BreadcrumbLink href="/domain">domain</BreadcrumbLink>
			<BreadcrumbSeparator />
			<BreadcrumbLink href="/domain/interaction">interaction</BreadcrumbLink>
			<BreadcrumbSeparator />
			<span class="_c3">clickable</span>
		</div>
	</Breadcrumbs>
</div>

<style>
	._c1 {
		border-radius: 1.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: #e2e8f0;
		background-color: #ffffff;
		padding: 1.5rem;
	}
	._c2 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: #64748b;
	}
	._c3 {
		font-weight: 500;
		color: #0f172a;
	}
</style>
