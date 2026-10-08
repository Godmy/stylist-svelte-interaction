<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Transformation from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'scale', type: 'range', min: 0.5, max: 2, step: 0.1, defaultValue: 1 },
		{ name: 'rotate', type: 'range', min: 0, max: 360, step: 15, defaultValue: 0 },
		{ name: 'translateX', type: 'range', min: -100, max: 100, step: 10, defaultValue: 0 },
		{ name: 'translateY', type: 'range', min: -100, max: 100, step: 10, defaultValue: 0 },
		{
			name: 'transformOrigin',
			type: 'select',
			options: [
				'center',
				'top',
				'bottom',
				'left',
				'right',
				'top left',
				'top right',
				'bottom left',
				'bottom right'
			],
			defaultValue: 'center'
		},
		{ name: 'duration', type: 'range', min: 0, max: 2000, step: 100, defaultValue: 300 },
		{ name: 'animateOnHover', type: 'boolean', defaultValue: false },
		{ name: 'animateOnClick', type: 'boolean', defaultValue: false },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={Transformation}
	title="Transformation Component"
	description="Atom for visible CSS transforms: scale, rotate, translate, and origin."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<Transformation {...values} class="layout-transformation-story-target">
					{#snippet children()}
						<div class="_c3">
							<div class="_c4">
								<p class="_c5">Transform card</p>
								<p class="_c6">scale: {values.scale || 1} | rotate: {values.rotate || 0} deg</p>
								<p class="_c7">translate: ({values.translateX || 0}, {values.translateY || 0})</p>
							</div>
						</div>
					{/snippet}
				</Transformation>
			</div>

			<div class="_c8">
				<div class="_c9">
					<span>Origin:</span>
					{values.transformOrigin || 'center'}
				</div>
				<div class="_c9">
					<span>Duration:</span>
					{values.duration || 300}ms
				</div>
				<div class="_c9">
					<span>Easing:</span>
					{values.easing || 'ease'}
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		width: 100%;
		padding-block: 1rem;
		border-radius: 0.5rem;
	}

	._c2 {
		display: flex;
		min-height: 18rem;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background:
			linear-gradient(
				90deg,
				color-mix(in srgb, var(--color-border-primary) 70%, transparent) 1px,
				transparent 1px
			),
			linear-gradient(
				color-mix(in srgb, var(--color-border-primary) 70%, transparent) 1px,
				transparent 1px
			),
			var(--color-background-tertiary);
		background-size: 2rem 2rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c3 {
		width: 12rem;
		min-height: 8rem;
		padding: 1.5rem;
		background:
			linear-gradient(
				135deg,
				color-mix(in srgb, var(--color-primary-600) 14%, transparent),
				transparent 46%
			),
			var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}

	._c4 {
		display: grid;
		gap: 0.375rem;
		text-align: center;
	}

	._c5 {
		color: var(--color-text-primary);
		font-weight: 700;
	}

	._c6,
	._c7 {
		color: var(--color-text-secondary);
		font-size: 0.75rem;
		line-height: 1rem;
	}

	._c8 {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.5rem;
		margin-top: 1rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	._c9 {
		padding: 0.5rem;
		color: var(--color-text-primary);
		background-color: var(--color-background-secondary);
		border-radius: 0.25rem;
	}

	._c9 span {
		color: var(--color-text-secondary);
	}
</style>
