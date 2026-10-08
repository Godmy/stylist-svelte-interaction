<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AtomicTierCard from './index.svelte';

	const accents = ['info', 'primary', 'success', 'secondary', 'warning'] as const;

	const controls: SlotStory[] = [
		{ name: 'name', type: 'text', defaultValue: 'Atoms' },
		{ name: 'icon', type: 'text', defaultValue: 'atom' },
		{ name: 'accent', type: 'select', defaultValue: 'info', options: [...accents] },
		{
			name: 'description',
			type: 'text',
			defaultValue: 'Basic building blocks - buttons, inputs, labels, icons'
		},
		{ name: 'count', type: 'number', defaultValue: 180, min: 0, max: 2000, step: 1 },
		{ name: 'countLabel', type: 'text', defaultValue: 'components' }
	];

	const tiers = [
		{ name: 'Atoms', icon: 'atom', accent: 'info' as const, count: 180 },
		{ name: 'Molecules', icon: 'molecule', accent: 'primary' as const, count: 90 },
		{ name: 'Organisms', icon: 'organism', accent: 'success' as const, count: 50 }
	];
</script>

<Story
	{controls}
	component={AtomicTierCard}
	title="AtomicTierCard"
	category="Molecules/Animation"
	description="One Atomic Design tier: floating icon, name, description and a highlighted count. Composed from FloatingIcon + typography atoms."
>
	{#snippet children(values: any)}
		<div class="_one">
			<AtomicTierCard
				name={values.name}
				icon={values.icon || 'atom'}
				accent={values.accent}
				description={values.description}
				count={values.count}
				countLabel={values.countLabel}
			/>
		</div>
		<div class="_grid">
			{#each tiers as tier, index}
				<AtomicTierCard
					name={tier.name}
					icon={tier.icon}
					accent={tier.accent}
					count={tier.count}
					delay={`${index * 0.1}s`}
				/>
			{/each}
		</div>
	{/snippet}
</Story>

<style>
	._one {
		max-width: 22rem;
		padding-bottom: 2rem;
	}
	._grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}
</style>
