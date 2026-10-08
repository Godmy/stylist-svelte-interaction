import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';

export interface RecipeCalendarDay extends SlotCalendarDay {
	onSelect?: (date: Date) => void;
	onHover?: (date: Date) => void;
	/** Акцентный цвет для today/selected/range (любое CSS-значение). По умолчанию — `--color-primary-500` темы. */
	accentColor?: string;
	class?: string;
}
