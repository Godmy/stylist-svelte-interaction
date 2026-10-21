import DatePicker from './index.svelte';
import type { RecipeDatePicker } from '$stylist/calendar/interface/recipe/date-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Date input with dropdown; index.story.svelte keeps the selected Date and the min/max range. */
export default {
	component: DatePicker,
	title: 'DatePicker',
	description: 'Interactive date picker with customizable options',
	args: { placeholder: 'Select a date', disabled: false },
	controls: {
		placeholder: { type: 'text', description: 'Placeholder text for the date picker' },
		disabled: { type: 'boolean', description: 'Whether the date picker is disabled' }
	},
	presets: { Disabled: { disabled: true } },
	layout: 'padded'
} satisfies ContractStory<RecipeDatePicker>;
