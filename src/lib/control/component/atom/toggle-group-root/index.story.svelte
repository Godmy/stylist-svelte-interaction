<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ToggleGroupRoot from './index.svelte';
	import ToggleGroupItem from '../toggle-group-item/index.svelte';

	let valueText = $state('none');

	const controls: SlotStory[] = [
		{ name: 'type', type: 'select', defaultValue: 'single', options: ['single', 'multiple'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={ToggleGroupRoot}
	title="ToggleGroupRoot"
	description="Context provider that coordinates single or multiple toggle selection."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<ToggleGroupRoot
				type={values.type}
				disabled={values.disabled}
				onValueChange={(e) => {
					const value = e.detail.value;
					valueText = Array.isArray(value) ? value.join(', ') : value || 'none';
				}}
			>
				<ToggleGroupItem value="day">Day</ToggleGroupItem>
				<ToggleGroupItem value="week">Week</ToggleGroupItem>
				<ToggleGroupItem value="month">Month</ToggleGroupItem>
			</ToggleGroupRoot>
			<p class="_c2">Current value: {valueText}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 0.75rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
