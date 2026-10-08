<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ScrollPhaseDebug from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'progress', type: 'range', defaultValue: 0.42, min: 0, max: 1, step: 0.01 },
		{ name: 'phase', type: 'select', options: ['intro', 'focus', 'morph', 'logo', 'complete'], defaultValue: 'morph' },
		{ name: 'webgl', type: 'boolean', defaultValue: true },
		{ name: 'reducedMotion', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="animation-atoms-scroll-phase-debug"
	title="ScrollPhaseDebug"
	category="Animation/Atoms"
	component={ScrollPhaseDebug}
	description="Fixed debug overlay for scroll-driven animation phases."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_stage">
			<ScrollPhaseDebug
				progress={Number(values.progress)}
				phase={values.phase}
				webgl={Boolean(values.webgl)}
				reducedMotion={Boolean(values.reducedMotion)}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._stage {
		position: relative;
		min-height: 14rem;
		overflow: hidden;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: #f7f3ec;
	}

	._stage :global(.c-scroll-phase-debug) {
		position: absolute;
	}
</style>
