<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import SliderWithInput from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'min',
			type: 'number' as TokenControllerType,
			defaultValue: 0,
			description: 'Minimum value'
		},
		{
			name: 'max',
			type: 'number' as TokenControllerType,
			defaultValue: 100,
			description: 'Maximum value'
		},
		{
			name: 'step',
			type: 'number' as TokenControllerType,
			defaultValue: 1,
			description: 'Step increment'
		},
		{
			name: 'value',
			type: 'number' as TokenControllerType,
			defaultValue: 50,
			description: 'Current value'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the component is disabled'
		}
	];

	let currentValue = $state(50);
</script>

<Story
	{controls}
	title="SliderWithInput Component"
	description="Slider with input component for value selection"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<p class="_c2">Current value: {currentValue}</p>
			<SliderWithInput
				min={controlValues.min}
				max={controlValues.max}
				step={controlValues.step}
				value={currentValue}
				disabled={controlValues.disabled}
				onValueInput={(value) => {
					currentValue = value;
				}}
				onValueChange={(value) => {
					currentValue = value;
				}}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin: 0 0 0.75rem;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}
</style>
