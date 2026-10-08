import type { TokenTimeMeasure } from '$stylist/calendar/type/alias/time-measure';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';
import type { Snippet } from 'svelte';

export interface RecipeEventCalendar {
	events?: SlotCalendarEvent[];
	initialDate?: Date;
	viewMode?: TokenTimeMeasure;
	selectedDate?: Date;
	dayClass?: string;
	eventClass?: string;
	headerClass?: string;
	class?: string;
	showAllDayEvents?: boolean;
	showEventDuration?: boolean;
	children?: Snippet;
	onEventClick?: (event: SlotCalendarEvent) => void;
	onEventCreate?: (date: Date) => void;
	onEventEdit?: (event: SlotCalendarEvent) => void;
	onEventDelete?: (event: SlotCalendarEvent) => void;
	onDayClick?: (day: SlotCalendarDay) => void;
	onViewModeChange?: (mode: TokenTimeMeasure) => void;
}
