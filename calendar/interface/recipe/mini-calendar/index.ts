import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
export interface RecipeMiniCalendar extends ComputeIntersectAll<[]> {
	selectedDate?: Date;
	events?: SlotCalendarEvent[];
	initialDate?: Date;
	compact?: boolean;
	showToday?: boolean;
	showWeekNumbers?: boolean;
	class?: string;
	dayClass?: string;
	eventClass?: string;
	headerClass?: string;
	onDateSelect?: (date: Date) => void;
	onEventClick?: (event: SlotCalendarEvent) => void;
}
