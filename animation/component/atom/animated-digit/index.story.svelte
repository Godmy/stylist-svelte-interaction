<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AnimatedDigit from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'from', type: 'number', defaultValue: 1250 },
		{ name: 'to', type: 'number', defaultValue: 9875 },
		{ name: 'fontSize', type: 'range', defaultValue: 56, min: 16, max: 112, step: 2 },
		{ name: 'color', type: 'color', defaultValue: '#2563eb' },
		{ name: 'prefix', type: 'text', defaultValue: '$' },
		{ name: 'suffix', type: 'text', defaultValue: '' }
	];
</script>

<Story
	{controls}
	component={AnimatedDigit}
	title="AnimatedDigit"
	description="Animates a numeric value and renders the formatted result."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<p class="_c2">Revenue target</p>
			<AnimatedDigit
				from={Number(values.from)}
				to={Number(values.to)}
				format={(value) => `${values.prefix}${Math.round(value).toLocaleString()}${values.suffix}`}
				class="_c3"
				style={`font-size:${Number(values.fontSize) || 56}px; line-height:1; color:${values.color || '#2563eb'};`}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 1rem;
		padding: 1.5rem;
		background-color: var(--color-background-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c2 {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	._c3 {
		font-weight: 700;
	}
</style>
