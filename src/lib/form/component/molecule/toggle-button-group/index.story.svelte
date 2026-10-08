<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ToggleButtonGroup from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const defaultOptions = [
		{ label: 'Small', value: 'small' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'Large', value: 'large' }
	];

	const controls = [
		{
			name: 'value',
			type: 'text' as TokenControllerType,
			defaultValue: 'medium',
			description: 'Selected value'
		},
		{
			name: 'size',
			type: 'select' as TokenControllerType,
			defaultValue: 'md',
			options: ['sm', 'md', 'lg'],
			description: 'Size of the toggle buttons'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the component is disabled'
		}
	];

	function handleValueChange(value: string | string[]) {
		console.log('Value changed to:', value);
	}
</script>

<Story
	{controls}
	title="ToggleButtonGroup Component"
	description="Group of toggle buttons for selection"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<ToggleButtonGroup
				options={defaultOptions}
				value={controlValues.value}
				size={controlValues.size}
				disabled={controlValues.disabled}
				onValueChange={handleValueChange}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
