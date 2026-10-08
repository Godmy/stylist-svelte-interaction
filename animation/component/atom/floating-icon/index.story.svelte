<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import FloatingIcon from './index.svelte';

	const accents = ['primary', 'info', 'secondary', 'success', 'warning'] as const;

	const controls: SlotStory[] = [
		{ name: 'icon', type: 'text', defaultValue: 'atom' },
		{ name: 'accent', type: 'select', defaultValue: 'primary', options: [...accents] },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={FloatingIcon}
	title="FloatingIcon"
	category="Atoms/Animation"
	description="Gradient icon tile with an idle float animation. Accent tone drives the fill; honours reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_row">
			<FloatingIcon icon={values.icon || 'atom'} accent={values.accent} still={values.still} />
		</div>
		<div class="_row">
			{#each accents as accent, index}
				<FloatingIcon {accent} icon="atom" delay={`${index * 0.15}s`} />
			{/each}
		</div>
	{/snippet}
</Story>

<style>
	._row {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		padding: 1rem 0;
	}
</style>
