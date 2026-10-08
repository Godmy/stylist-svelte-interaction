<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { DatePickerValue } from '$stylist/calendar/interface/slot/date-picker';
	import DateTimeRangePicker from './index.svelte';

	type DateTimeRangeValue = { start: Date | null; end: Date | null };

	const controls: SlotStory[] = [
		{
			name: 'placeholder',
			type: 'text',
			defaultValue: 'Select date and time range...'
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: false
		}
	];

	let selectedRange: DateTimeRangeValue = { start: null, end: null };

	function handleInputChange(value: DatePickerValue) {
		if (value && typeof value === 'object' && !(value instanceof Date) && 'start' in value) {
			selectedRange = value;
		}
		console.log('Date time range changed:', value);
	}
</script>

<Story
	id="organisms-date-time-range-picker"
	title="Organisms / Interaction / Input / Date Time Range Picker"
	component={DateTimeRangePicker}
	category="Organisms/Interaction/Input"
	description="A date and time range picker component."
	tags={['input', 'datetime', 'picker', 'range']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<p>
					Selected range: {selectedRange.start ? selectedRange.start.toLocaleString() : 'None'} - {selectedRange.end
						? selectedRange.end.toLocaleString()
						: 'None'}
				</p>
			</div>
			<DateTimeRangePicker
				placeholder={values.placeholder}
				disabled={values.disabled}
				onInput={handleInputChange}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 32rem;
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
	}
</style>
