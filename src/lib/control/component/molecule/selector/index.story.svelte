<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Select from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const exampleOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	const controls = [
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Select an option',
			description: 'Label for the select component'
		},
		{
			name: 'required',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the select is required'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the select is disabled'
		},
		{
			name: 'withError',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether to show error state'
		},
		{
			name: 'withPlaceholder',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether to show placeholder'
		}
	];

	const id = `select-${Math.random().toString(36).substr(2, 9)}`;
	let selected = $state('option1');
</script>

<Story
	{controls}
	title="Select Component"
	description="Select component for choosing one option from a list"
>
	{#snippet children(controlValues: any)}
		<Select
			{id}
			label={controlValues.label}
			options={exampleOptions}
			value={selected}
			onSelect={(value: string | string[]) => {
				selected = Array.isArray(value) ? value[0] : value;
			}}
			required={controlValues.required}
			disabled={controlValues.disabled}
			placeholder={controlValues.withPlaceholder ? 'Choose an option...' : undefined}
			errors={controlValues.withError ? ['This field is required'] : []}
		/>
	{/snippet}
</Story>
