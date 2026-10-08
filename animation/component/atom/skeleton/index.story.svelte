<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Skeleton from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'text',
			options: ['text', 'rectangle', 'circle']
		},
		{ name: 'lines', type: 'range', defaultValue: 3, min: 1, max: 6, step: 1 },
		{ name: 'animated', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	id="atoms-information-skeleton"
	title="Skeleton"
	component={Skeleton}
	category="Atoms"
	description="Neutral placeholder for unavailable information."
	tags={['skeleton', 'loading', 'information']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Skeleton
				variant={values.variant}
				lines={Number(values.lines) || 1}
				animated={Boolean(values.animated)}
			/>
			<Skeleton variant="circle" />
			<Skeleton variant="rectangle" height={64} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 1rem;
		max-width: 28rem;
	}
</style>
