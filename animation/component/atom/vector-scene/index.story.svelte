<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import VectorScene from './index.svelte';

	const layers = [
		{
			id: 'wave-back',
			d: 'M0 62 Q 25 48 50 62 T 100 62 V100 H0 Z',
			fill: 'color-mix(in srgb, var(--color-info-500) 55%, transparent)'
		},
		{
			id: 'wave-front',
			d: 'M0 74 Q 25 64 50 74 T 100 74 V100 H0 Z',
			fill: 'color-mix(in srgb, var(--color-info-500) 85%, transparent)'
		}
	];

	const controls: SlotStory[] = [
		{ name: 'progress', type: 'range', defaultValue: 0.5, min: 0, max: 1, step: 0.01 },
		{ name: 'animateOnHover', type: 'boolean', defaultValue: true },
		{ name: 'animateOnClick', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	{controls}
	component={VectorScene}
	title="VectorScene"
	description="Three independent modes for the same layered SVG scene. Drag Progress for the middle panel; hover/press the right panel. Respects prefers-reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_grid">
			<div class="_panel">
				<p class="_label">mode=&quot;ambient&quot;<br /><span>бесконечный медленный дрейф, ничего не нажимать</span></p>
				<div class="_frame">
					<VectorScene mode="ambient" viewBox="0 0 100 100" {layers} class="_scene" />
				</div>
			</div>

			<div class="_panel">
				<p class="_label">
					mode=&quot;progress&quot;<br />
					<span>ведётся пропом progress = {Number(values.progress).toFixed(2)} — потяните ползунок «progress» слева</span>
				</p>
				<div class="_frame">
					<VectorScene
						mode="progress"
						progress={Number(values.progress)}
						viewBox="0 0 100 100"
						{layers}
						class="_scene"
					/>
				</div>
			</div>

			<div class="_panel">
				<p class="_label">mode=&quot;interaction&quot;<br /><span>наведите курсор или нажмите на сцену</span></p>
				<div class="_frame">
					<VectorScene
						mode="interaction"
						animateOnHover={Boolean(values.animateOnHover)}
						animateOnClick={Boolean(values.animateOnClick)}
						viewBox="0 0 100 100"
						{layers}
						class="_scene"
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(12rem, 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 860px) {
		._grid {
			grid-template-columns: 1fr;
		}
	}

	._panel {
		display: grid;
		gap: 0.75rem;
	}

	._label {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	._label span {
		font-weight: 400;
		color: var(--color-text-secondary);
	}

	._frame {
		display: grid;
		place-items: center;
		min-height: 12rem;
		padding: 1.5rem;
		background: var(--color-background-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._frame :global(.c-vector-scene) {
		width: 100%;
		height: 8rem;
	}
</style>
