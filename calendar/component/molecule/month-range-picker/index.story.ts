import MonthRangePicker from '$stylist/calendar/component/molecule/month-range-picker/index.svelte';
import type { RecipeMonthRangePicker } from '$stylist/calendar/interface/recipe/month-range-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Month period of a bookings table: ‹ › step whole months, the summary opens a typed range. */
export default {
	component: MonthRangePicker,
	title: 'MonthRangePicker',
	description: 'Period selector by whole months with an arbitrary range',
	args: { from: '2026-10-01', to: '2026-10-31', locale: 'ru-RU', label: 'Период' },
	controls: {
		from: { type: 'text', description: 'First day, YYYY-MM-DD' },
		to: { type: 'text', description: 'Last day, YYYY-MM-DD' },
		locale: { type: 'text', description: 'Locale of the summary' }
	},
	presets: {
		Range: { from: '2026-10-10', to: '2026-11-05' },
		English: { locale: 'en-US', label: 'Period' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeMonthRangePicker>;
