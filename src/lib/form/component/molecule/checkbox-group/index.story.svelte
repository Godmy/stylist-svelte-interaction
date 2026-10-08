<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CheckboxGroup from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const options = [
		{ id: 'option1', label: 'Option 1', value: 'option1', description: 'First option description' },
		{
			id: 'option2',
			label: 'Option 2',
			value: 'option2',
			description: 'Second option description'
		},
		{ id: 'option3', label: 'Option 3', value: 'option3', description: 'Third option description' },
		{ id: 'option4', label: 'Option 4', value: 'option4', description: 'Fourth option description' }
	];

	const controls = [
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Select your preferences',
			description: 'Label for the checkbox group'
		},
		{
			name: 'description',
			type: 'text' as TokenControllerType,
			defaultValue: 'Choose one or more options',
			description: 'Description for the checkbox group'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the checkbox group is disabled'
		},
		{
			name: 'required',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the checkbox group is required'
		}
	];

	function handleValueChange(newValues: string[]) {
		console.log('Selected values:', newValues);
	}
</script>

<Story
	{controls}
	title="CheckboxGroup Component"
	description="A group of checkboxes for multiple selection"
>
	{#snippet children(controlValues: any)}
		<CheckboxGroup
			{options}
			value={[]}
			label={controlValues.label}
			description={controlValues.description}
			disabled={controlValues.disabled}
			required={controlValues.required}
			onValueChange={handleValueChange}
		/>
	{/snippet}
</Story>
