<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FormDatePicker from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';
	import type { DatePickerValue } from '$stylist/calendar/interface/slot/date-picker';

	const controls = [
		{
			name: 'value',
			type: 'text' as TokenControllerType,
			defaultValue: '',
			description: 'Selected date value'
		},
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Select Date',
			description: 'Label for the date picker'
		},
		{
			name: 'helperText',
			type: 'text' as TokenControllerType,
			defaultValue: 'Choose a date for your appointment',
			description: 'Helper text for the date picker'
		},
		{
			name: 'minDate',
			type: 'text' as TokenControllerType,
			defaultValue: '2024-01-01',
			description: 'Minimum selectable date'
		},
		{
			name: 'maxDate',
			type: 'text' as TokenControllerType,
			defaultValue: '2025-12-31',
			description: 'Maximum selectable date'
		},
		{
			name: 'placeholder',
			type: 'text' as TokenControllerType,
			defaultValue: 'Select date',
			description: 'Placeholder text'
		}
	];

	function handleChange(newValue: DatePickerValue) {
		console.log('Date changed:', newValue);
	}
</script>

<Story
	{controls}
	title="FormDatePicker Component"
	description="Interactive form date picker with customizable options"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<div class="max-w-xs">
				<FormDatePicker
					value={controlValues.value}
					label={controlValues.label}
					helperText={controlValues.helperText}
					minDate={controlValues.minDate}
					maxDate={controlValues.maxDate}
					placeholder={controlValues.placeholder}
					onValueInput={(newValue: DatePickerValue) => console.log('Date input:', newValue)}
					onValueChange={handleChange}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
