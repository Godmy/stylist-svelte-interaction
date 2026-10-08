<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BreadcrumbLink from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Products' },
		{ name: 'href', type: 'text', defaultValue: '/products' },
		{ name: 'current', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={BreadcrumbLink}
	title="BreadcrumbLink"
	description="Single link or current text node in breadcrumb chains."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<BreadcrumbLink href={values.href} current={values.current}>{values.label}</BreadcrumbLink>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
