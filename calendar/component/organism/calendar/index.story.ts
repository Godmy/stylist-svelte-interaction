import Calendar from '$stylist/calendar/component/organism/calendar/index.svelte';
import type { RecipeCalendar } from '$stylist/calendar/interface/recipe/calendar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Single-date calendar; index.story.svelte turns the text knobs into Dates. */
export default {
	component: Calendar,
	title: 'Calendar',
	description:
		'Полноценный однодневный выбор даты: навигация по месяцам, неделя с понедельника (ru-RU). `disablePast` включает minDate=сегодня — прошлые даты перечёркнуты и недоступны, а кнопка «предыдущий месяц» гаснет, как только уходить назад больше некуда. accentColor — цвет заливки today/selected.',
	args: { date: '2026-10-18', disablePast: true, accentColor: '#3454d1' },
	controls: {
		// date and disablePast are story knobs: the render turns them into value / minDate Dates.
		date: { type: 'text', description: 'Selected date (YYYY-MM-DD)' },
		disablePast: { type: 'boolean', description: 'minDate = today' },
		accentColor: { type: 'color' }
	},
	presets: { AnyDate: { disablePast: false }, Empty: { date: '' } },
	layout: 'centered'
} satisfies ContractStory<RecipeCalendar & { date?: string; disablePast?: boolean }>;
