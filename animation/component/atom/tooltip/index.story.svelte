<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Tooltip from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'content', type: 'text', defaultValue: 'Helpful contextual info' },
		{
			name: 'placement',
			type: 'select',
			defaultValue: 'top',
			options: ['top', 'bottom', 'left', 'right']
		},
		{
			name: 'trigger',
			type: 'select',
			defaultValue: 'hover',
			options: ['hover', 'click', 'focus']
		},
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'arrow',
			options: ['line', 'arrow', 'invisible']
		},
		{ name: 'delay', type: 'number', defaultValue: 0, min: 0, max: 1200, step: 50 },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={Tooltip}
	title="Tooltip"
	description="Context helper with trigger, placement, and variant controls."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Tooltip
				content={values.content}
				placement={values.placement}
				trigger={values.trigger}
				variant={values.variant}
				delay={values.delay}
				disabled={values.disabled}
			>
				{#snippet children()}
					<button class="_c2">Target element</button>
				{/snippet}
			</Tooltip>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		min-height: 10rem;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background:
			linear-gradient(
				90deg,
				color-mix(in srgb, var(--color-border-primary) 62%, transparent) 1px,
				transparent 1px
			),
			linear-gradient(
				color-mix(in srgb, var(--color-border-primary) 62%, transparent) 1px,
				transparent 1px
			),
			var(--color-background-secondary);
		background-size: 2rem 2rem;
		border: 1px dashed var(--color-border-primary);
		border-radius: 0.5rem;
	}
	._c2 {
		padding: 0.625rem 1rem;
		color: var(--color-text-primary);
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--color-background-primary) 96%, white 4%),
			color-mix(in srgb, var(--color-background-secondary) 82%, transparent)
		);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		box-shadow: 0 0.75rem 1.75rem color-mix(in srgb, var(--color-text-primary) 10%, transparent);
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
	}
</style>
