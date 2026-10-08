<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import RadioButtonGroup from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const options = [
		{ value: 'small', label: 'Small' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'large', label: 'Large' },
		{ value: 'xlarge', label: 'Extra Large' }
	];

	const controls = [
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Select size',
			description: 'Label for the radio button group'
		},
		{
			name: 'description',
			type: 'text' as TokenControllerType,
			defaultValue: 'Choose one of the available options',
			description: 'Description for the radio button group'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the radio button group is disabled'
		},
		{
			name: 'required',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the radio button group is required'
		}
	];

	let value = 'medium';

	function handleValueChange(newValue: string) {
		console.log('Selected value:', newValue);
		value = newValue;
	}
</script>

<Story
	{controls}
	title="RadioButtonGroup Component"
	description="A group of radio buttons for single selection"
>
	{#snippet children(controlValues: any)}
		<RadioButtonGroup
			{options}
			{value}
			disabled={controlValues.disabled}
			required={controlValues.required}
			onValueChange={handleValueChange}
		/>
	{/snippet}
</Story>
