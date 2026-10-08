<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import RangeSlider from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Volume',
			description: 'Label for the slider'
		},
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
			name: 'showValue',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether to show the current value'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the slider is disabled'
		},
		{
			name: 'range',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether to use range mode'
		},
		{
			name: 'description',
			type: 'text' as TokenControllerType,
			defaultValue: 'Adjust the volume level',
			description: 'Description for the slider'
		}
	];

	let sliderValue: number | [number, number] = 50;

	function handleValueChange(newValue: number | [number, number]) {
		console.log('Slider value changed:', newValue);
		sliderValue = newValue;
	}
</script>

<Story
	{controls}
	title="RangeSlider Component"
	description="A slider component for selecting values or ranges"
>
	{#snippet children(controlValues: any)}
		<RangeSlider
			id="volume-slider"
			label={controlValues.label}
			value={sliderValue}
			min={controlValues.min}
			max={controlValues.max}
			step={controlValues.step}
			showValue={controlValues.showValue}
			disabled={controlValues.disabled}
			range={controlValues.range}
			description={controlValues.description}
		/>
	{/snippet}
</Story>
