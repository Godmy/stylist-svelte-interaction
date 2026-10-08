<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { DatePickerValue } from '$stylist/calendar/interface/slot/date-picker';
	import DateRangePicker from './index.svelte';

	type DateRangeValue = { start: Date | null; end: Date | null };

	const controls: SlotStory[] = [
		{
			name: 'placeholder',
			type: 'text',
			defaultValue: 'Select date range...'
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: false
		}
	];

	let selectedRange: DateRangeValue = { start: null, end: null };

	function handleInputChange(value: DatePickerValue) {
		if (value && typeof value === 'object' && !(value instanceof Date) && 'start' in value) {
			selectedRange = value;
		}
		console.log('Date range changed:', value);
	}
</script>

<Story
	id="organisms-date-range-picker"
	title="Organisms / Interaction / Input / Date Range Picker"
	component={DateRangePicker}
	category="Organisms/Interaction/Input"
	description="A date range picker component."
	tags={['input', 'date', 'picker', 'range']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<p>
					Selected range: {selectedRange.start ? selectedRange.start.toLocaleDateString() : 'None'} -
					{selectedRange.end ? selectedRange.end.toLocaleDateString() : 'None'}
				</p>
			</div>
			<DateRangePicker
				placeholder={values.placeholder}
				disabled={values.disabled}
				onInput={handleInputChange}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 28rem;
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
	}
</style>
