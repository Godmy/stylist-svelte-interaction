import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';

export interface RecipeCalendarGrid {
	days: SlotCalendarDay[];
	weekdayLabels?: string[];
	onDaySelect?: (date: Date) => void;
	onDayHover?: (date: Date) => void;
	accentColor?: string;
	class?: string;
}
