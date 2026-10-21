import DatePairPicker from './index.svelte';
import type { RecipeDatePairPicker } from '$stylist/calendar/interface/recipe/date-pair-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Start/end dates in one line; index.story.svelte keeps the picked dates in local state. */
export default {
	component: DatePairPicker,
	title: 'DatePairPicker',
	description:
		'Two dates in one line, styled alike: the start is picked in a calendar dropdown; the end is shown next to it and is disabled by default (the host computes it, e.g. start + tour length).',
	args: {
		value: '2026-10-25',
		endValue: '2026-11-01',
		startLabel: 'Выезд',
		endLabel: 'Возвращение',
		startTime: '04:00',
		endTime: '22:00',
		endPlaceholder: '8-й день',
		endEditable: false
	},
	controls: {
		value: { type: 'text', description: 'Start date, ISO yyyy-mm-dd' },
		endValue: { type: 'text', description: 'End date, ISO yyyy-mm-dd' },
		startLabel: { type: 'text' },
		endLabel: { type: 'text' },
		startTime: { type: 'text' },
		endTime: { type: 'text' },
		endPlaceholder: { type: 'text' },
		endEditable: { type: 'boolean' }
	},
	presets: {
		Empty: { value: '', endValue: '' },
		EditableEnd: { endEditable: true },
		AvailableDates: { availableDates: ['2026-10-25', '2026-11-08', '2026-11-22'] }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeDatePairPicker>;
