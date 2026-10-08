<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import BreadcrumbSeparator from './index.svelte';
</script>

<Story
	component={BreadcrumbSeparator}
	title="BreadcrumbSeparator"
	description="Separator element used between breadcrumb items."
>
	{#snippet children()}
		<div class="_c1">
			<span>Home</span>
			<BreadcrumbSeparator />
			<span>Catalog</span>
			<BreadcrumbSeparator />
			<span class="_c2">Item</span>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c2 {
		color: var(--color-text-secondary);
	}
</style>
