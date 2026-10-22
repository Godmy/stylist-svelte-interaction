import DateTimePicker from '$stylist/calendar/component/molecule/date-time-picker/index.svelte';
import type { RecipeDateTimePicker } from '$stylist/calendar/interface/recipe/date-time-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Date + time picker; index.story.svelte turns the ISO text value into a Date. */
export default {
	component: DateTimePicker,
	title: 'DateTimePicker',
	description: 'Inline date + time picker with dropdown calendar and keyboard-friendly selectors',
	args: { value: '2026-10-18T12:00:00', disabled: false, placeholder: 'Select date and time' },
	controls: {
		value: { type: 'text', description: 'Selected date-time as ISO string' },
		disabled: { type: 'boolean', description: 'Whether the picker is disabled' },
		placeholder: { type: 'text', description: 'Placeholder text' }
	},
	presets: { Disabled: { disabled: true } },
	layout: 'padded'
} satisfies ContractStory<RecipeDateTimePicker>;
