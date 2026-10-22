import DateTimeRangePicker from '$stylist/calendar/component/organism/date-time-range-picker/index.svelte';
import type { RecipeDateTimeRangePicker } from '$stylist/calendar/interface/recipe/date-time-range-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Start/end date and time picker. */
export default {
	component: DateTimeRangePicker,
	title: 'DateTimeRangePicker',
	description: 'A date and time range picker component.',
	args: { placeholder: 'Select date and time range...', disabled: false },
	controls: {
		placeholder: { type: 'text' },
		disabled: { type: 'boolean' }
	},
	presets: { Disabled: { disabled: true } },
	layout: 'padded'
} satisfies ContractStory<RecipeDateTimeRangePicker>;
