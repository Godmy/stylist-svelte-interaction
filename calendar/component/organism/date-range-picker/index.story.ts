import DateRangePicker from '$stylist/calendar/component/organism/date-range-picker/index.svelte';
import type { RecipeDateRangePicker } from '$stylist/calendar/interface/recipe/date-range-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Start/end date picker. */
export default {
	component: DateRangePicker,
	title: 'DateRangePicker',
	description: 'A date range picker component.',
	args: { placeholder: 'Select date range...', disabled: false },
	controls: {
		placeholder: { type: 'text' },
		disabled: { type: 'boolean' }
	},
	presets: { Disabled: { disabled: true } },
	layout: 'padded'
} satisfies ContractStory<RecipeDateRangePicker>;
