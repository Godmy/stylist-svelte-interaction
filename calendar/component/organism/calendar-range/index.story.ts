import CalendarRange from './index.svelte';
import type { RecipeCalendarRange } from '$stylist/calendar/interface/recipe/calendar-range';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Period picker; index.story.svelte keeps the selected Date range. */
export default {
	component: CalendarRange,
	title: 'CalendarRange',
	description:
		'Выбор периода: первый клик — начало, второй — конец (клик раньше начала перезапускает выбор с новой даты). Наведение курсора между кликами показывает предпросмотр периода. `disablePast` включает minDate=сегодня, accentColor — цвет заливки today/периода.',
	args: { disablePast: true, accentColor: '#3454d1' },
	controls: {
		// disablePast is a story knob: the render sets minDate to today.
		disablePast: { type: 'boolean', description: 'minDate = today' },
		accentColor: { type: 'color' }
	},
	presets: { AnyDate: { disablePast: false } },
	layout: 'centered'
} satisfies ContractStory<RecipeCalendarRange & { disablePast?: boolean }>;
