import CalendarGrid from './index.svelte';
import type { RecipeCalendarGrid } from '$stylist/calendar/interface/recipe/calendar-grid';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Month grid; index.story.svelte builds the days with generateCalendarDays. */
export default {
	component: CalendarGrid,
	title: 'CalendarGrid',
	description:
		'Сетка недель + шапка дней недели, рендерит CalendarDay по массиву SlotCalendarDay (готовит его generateCalendarDays). weekStartsOn=1 — неделя с понедельника (по умолчанию, под ru-RU), 0 — с воскресенья. accentColor задаёт цвет заливки today/selected/range.',
	args: { weekStartsOn: 1, accentColor: '#3454d1' },
	controls: {
		// weekStartsOn is a story knob passed to generateCalendarDays (1 = Monday, 0 = Sunday).
		weekStartsOn: { type: 'select', options: [1, 0] },
		accentColor: { type: 'color' }
	},
	presets: { SundayFirst: { weekStartsOn: 0 } },
	layout: 'centered'
} satisfies ContractStory<RecipeCalendarGrid & { weekStartsOn?: 0 | 1 }>;
