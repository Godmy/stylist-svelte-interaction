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
	/** BCP 47 locale of titles, weekdays and times; default 'en-US'. */
	locale?: string;
	/** First column of the month and week grids: 0 = Sunday (default), 1 = Monday. */
	weekStartsOn?: 0 | 1;
	/** Interface texts in the page language; English by default. */
	labels?: {
		today?: string;
		day?: string;
		week?: string;
		month?: string;
		allDay?: string;
		start?: string;
		end?: string;
		location?: string;
		open?: string;
		edit?: string;
		delete?: string;
	};
	children?: Snippet;
	onEventClick?: (event: SlotCalendarEvent) => void;
	onEventCreate?: (date: Date) => void;
	onEventEdit?: (event: SlotCalendarEvent) => void;
	onEventDelete?: (event: SlotCalendarEvent) => void;
	onDayClick?: (day: SlotCalendarDay) => void;
	onViewModeChange?: (mode: TokenTimeMeasure) => void;
}
