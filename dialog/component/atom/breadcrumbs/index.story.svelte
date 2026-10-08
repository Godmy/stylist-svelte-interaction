<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Breadcrumbs from './index.svelte';
	import BreadcrumbLink from '../breadcrumb-link/index.svelte';
	import BreadcrumbSeparator from '../breadcrumb-separator/index.svelte';
</script>

<Story
	component={Breadcrumbs}
	title="Breadcrumbs Atom"
	description="Low-level breadcrumb navigation container for custom breadcrumb compositions."
>
	{#snippet children()}
		<div class="_c1">
			<Breadcrumbs class="_c2">
				{#snippet children()}
					<BreadcrumbLink href="/domain">domain</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href="/domain/interaction">interaction</BreadcrumbLink>
					<BreadcrumbSeparator />
					<span class="_c3">clickable</span>
				{/snippet}
			</Breadcrumbs>
		</div>
	{/snippet}
</Story>

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
