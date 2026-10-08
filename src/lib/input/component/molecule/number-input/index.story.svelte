<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import NumberInput from './index.svelte';

	let value = $state(10);

	const controls: SlotStory[] = [
		{ name: 'min', type: 'number', defaultValue: 0, min: -100, max: 100, step: 1 },
		{ name: 'max', type: 'number', defaultValue: 100, min: 1, max: 500, step: 1 },
		{ name: 'step', type: 'number', defaultValue: 1, min: 1, max: 50, step: 1 },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'readonly', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={NumberInput}
	title="NumberInput"
	description="Numeric input with increment/decrement controls."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1 max-w-xs">
			<NumberInput
				{value}
				min={values.min}
				max={values.max}
				step={values.step}
				disabled={values.disabled}
				readonly={values.readonly}
				onValueChange={(next: number) => (value = next)}
			/>
			<p class="_c2">Current value: {value}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 0.5rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
