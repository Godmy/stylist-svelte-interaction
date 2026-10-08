<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RecipeComponentInfoCard from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'componentName', type: 'text', defaultValue: 'Button' },
		{ name: 'propsCount', type: 'number', defaultValue: 6 },
		{ name: 'isOpen', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	component={RecipeComponentInfoCard}
	title="Component Info Card"
	description="Dialog-domain component details modal with metadata, install command, usage examples, and action links."
	{controls}
>
	{#snippet children(values: any)}
		<RecipeComponentInfoCard
			componentName={values.componentName}
			propsCount={values.propsCount}
			isOpen={values.isOpen}
			category="Dialog"
			subcategory="Metadata"
			description="A detailed component summary modal for documentation and catalog workflows."
			examples={[
				'Open from a component catalog card',
				'Display install and usage metadata',
				'Link users to package and documentation pages'
			]}
			npmPackage="@stylist-svelte/dialog"
			version="2.4.0"
			author="Stylist Svelte"
			lastUpdated="2026-06-28"
		/>
	{/snippet}
</Story>
