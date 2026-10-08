<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AnimatedBackground from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'shapeSeconds', type: 'range', defaultValue: 16, min: 4, max: 32, step: 1 },
		{ name: 'orbSeconds', type: 'range', defaultValue: 14, min: 4, max: 30, step: 1 },
		{ name: 'particleSeconds', type: 'range', defaultValue: 22, min: 6, max: 44, step: 1 },
		{ name: 'shapeOpacity', type: 'range', defaultValue: 45, min: 0, max: 100, step: 5 },
		{ name: 'orbOpacity', type: 'range', defaultValue: 50, min: 0, max: 100, step: 5 },
		{ name: 'particleOpacity', type: 'range', defaultValue: 32, min: 0, max: 100, step: 4 },
		{ name: 'class', type: 'text', defaultValue: '' }
	];
</script>

<Story
	{controls}
	component={AnimatedBackground}
	title="AnimatedBackground"
	description="Ambient animated background with tunable shape, orb, and particle motion."
>
	{#snippet children(values: any)}
		<AnimatedBackground
			class={values.class || undefined}
			style={`--animated-background-shape-duration:${Number(values.shapeSeconds) || 16}s; --animated-background-orb-duration:${Number(values.orbSeconds) || 14}s; --animated-background-particle-duration:${Number(values.particleSeconds) || 22}s; --animated-background-shape-opacity:${(Number(values.shapeOpacity) || 0) / 100}; --animated-background-orb-opacity:${(Number(values.orbOpacity) || 0) / 100}; --animated-background-particle-opacity:${(Number(values.particleOpacity) || 0) / 100};`}
		>
			<div class="_c1">
				<div class="_c2">
					<p class="_c3">Animated Background</p>
					<p class="_c4">Ambient motion tuned by duration and opacity controls.</p>
				</div>
			</div>
		</AnimatedBackground>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		min-height: 18rem;
		place-items: center;
		padding: 2rem;
	}

	._c2 {
		display: grid;
		max-width: 28rem;
		gap: 0.75rem;
		padding: 1.25rem 1.5rem;
		text-align: center;
		background: color-mix(in srgb, var(--color-background-primary) 78%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-border-primary) 70%, transparent);
		border-radius: 0.5rem;
		box-shadow: 0 1rem 2.5rem color-mix(in srgb, var(--color-text-primary) 12%, transparent);
		backdrop-filter: blur(16px);
	}

	._c3 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 2rem;
	}

	._c4 {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
