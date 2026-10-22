import FormDatePicker from '$stylist/calendar/component/molecule/form-date-picker/index.svelte';
import type { RecipeFormDatePicker } from '$stylist/calendar/interface/recipe/form-date-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Labelled date picker for forms. */
export default {
	component: FormDatePicker,
	title: 'FormDatePicker',
	description: 'Interactive form date picker with customizable options',
	args: {
		value: '',
		label: 'Select Date',
		helperText: 'Choose a date for your appointment',
		minDate: '2024-01-01',
		maxDate: '2025-12-31',
		placeholder: 'Select date'
	},
	controls: {
		value: { type: 'text', description: 'Selected date value' },
		label: { type: 'text', description: 'Label for the date picker' },
		helperText: { type: 'text', description: 'Helper text for the date picker' },
		minDate: { type: 'text', description: 'Minimum selectable date' },
		maxDate: { type: 'text', description: 'Maximum selectable date' },
		placeholder: { type: 'text', description: 'Placeholder text' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeFormDatePicker>;
