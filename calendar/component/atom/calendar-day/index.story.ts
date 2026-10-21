import CalendarDay from './index.svelte';
import type { RecipeCalendarDay } from '$stylist/calendar/interface/recipe/calendar-day';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** One day cell; index.story.svelte supplies the Date it shows. */
export default {
	component: CalendarDay,
	title: 'CalendarDay',
	description:
		'Одна ячейка дня — общий атом для CalendarGrid/Calendar/CalendarRange. today — залитый круг, disabled — перечёркнутая дата (не просто затемнение), selected/range — заливка акцентным цветом. accentColor меняет цвет заливки (по умолчанию — токен темы --color-primary-500).',
	args: {
		isCurrentMonth: true,
		isToday: false,
		isSelected: false,
		isDisabled: false,
		isRangeStart: false,
		isRangeEnd: false,
		isInRange: false,
		accentColor: '#3454d1'
	},
	controls: {
		isCurrentMonth: { type: 'boolean' },
		isToday: { type: 'boolean' },
		isSelected: { type: 'boolean' },
		isDisabled: { type: 'boolean' },
		isRangeStart: { type: 'boolean' },
		isRangeEnd: { type: 'boolean' },
		isInRange: { type: 'boolean' },
		accentColor: { type: 'color' }
	},
	presets: {
		Today: { isToday: true },
		Selected: { isSelected: true },
		Disabled: { isDisabled: true }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeCalendarDay>;
