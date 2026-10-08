<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ButtonComposed from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Deploy changes' },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'primary',
			options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'showDot', type: 'boolean', defaultValue: false }
	];

	let eventLog = $state('ready');
</script>

<Story
	{controls}
	component={ButtonComposed}
	title="ButtonComposed"
	category="Atoms/Interaction/Controls/Buttons"
	description="Decorated variant of Button: adds left/right icons, a badge/dot indicator, and dedicated focus/blur/double-click/context-menu handlers. Use plain Button for simple text actions; use ButtonComposed when the action needs an icon, a status badge, or those extra interaction hooks."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<ButtonComposed
				text={values.text as string}
				variant={values.variant as any}
				size={values.size as any}
				loading={Boolean(values.loading)}
				disabled={Boolean(values.disabled)}
				iconLeft="plus"
				iconRight="arrow-right"
				dot={Boolean(values.showDot)}
				onClick={() => {
					eventLog = 'click';
				}}
				onFocus={() => {
					eventLog = 'focus';
				}}
				onBlur={() => {
					eventLog = 'blur';
				}}
			/>
			<p class="_c2">Last event: {eventLog}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 1rem;
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
