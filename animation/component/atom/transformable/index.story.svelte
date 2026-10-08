<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Transformable from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'scale', type: 'range', defaultValue: 1.08, min: 0.7, max: 1.4, step: 0.01 },
		{ name: 'rotate', type: 'range', defaultValue: 6, min: -20, max: 20, step: 1 },
		{ name: 'translateY', type: 'range', defaultValue: -6, min: -24, max: 24, step: 1 },
		{ name: 'animateOnHover', type: 'boolean', defaultValue: true },
		{ name: 'animateOnClick', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={Transformable}
	title="Transformable"
	description="Applies transform contracts and optional hover or press motion."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Transformable
				scale={Number(values.scale)}
				rotate={Number(values.rotate)}
				translateY={Number(values.translateY)}
				translateX={0}
				skewX={0}
				skewY={0}
				transformOrigin="center center"
				animateOnHover={Boolean(values.animateOnHover)}
				animateOnClick={Boolean(values.animateOnClick)}
				class="transformable-story-target"
			>
				{#snippet children()}
					<div class="_c2">
						<div class="_c3">
							<strong class="_c4">Hover the card</strong>
							<p class="_c5">Use the controls to change the motion contract.</p>
						</div>
					</div>
				{/snippet}
			</Transformable>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		min-height: 18rem;
		place-items: center;
		padding: 2rem;
		background:
			linear-gradient(
				90deg,
				color-mix(in srgb, var(--color-border-primary) 68%, transparent) 1px,
				transparent 1px
			),
			linear-gradient(
				color-mix(in srgb, var(--color-border-primary) 68%, transparent) 1px,
				transparent 1px
			),
			var(--color-background-secondary);
		background-size:
			2rem 2rem,
			2rem 2rem,
			auto;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c2 {
		width: min(100%, 18rem);
		max-width: 18rem;
		padding: 1.5rem;
		background:
			linear-gradient(
				135deg,
				color-mix(in srgb, var(--color-primary-600) 12%, transparent),
				transparent 48%
			),
			var(--color-background-primary);
		border: 1px solid color-mix(in srgb, var(--color-primary-600) 26%, var(--color-border-primary));
		border-radius: 0.5rem;
		box-shadow: 0 1rem 2rem color-mix(in srgb, var(--color-text-primary) 12%, transparent);
	}

	._c3 {
		display: grid;
		gap: 0.5rem;
		text-align: center;
	}

	._c4 {
		color: var(--color-text-primary);
	}

	._c5 {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
