<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Loading from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'loading', type: 'boolean', defaultValue: true },
		{ name: 'label', type: 'text', defaultValue: 'Preparing your workspace' },
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] }
	];
</script>

<Story
	id="molecules-information-loading"
	title="Loading"
	component={Loading}
	category="Molecules"
	description="Polished loading state with spinner, label, and progress shimmer."
	tags={['loading', 'spinner', 'information']}
	{controls}
>
	{#snippet children(values: any)}
		<Loading
			loading={Boolean(values.loading)}
			label={String(values.label || 'Preparing your workspace')}
			size={values.size}
		/>
	{/snippet}
</Story>
