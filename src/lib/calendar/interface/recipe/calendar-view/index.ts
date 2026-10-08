import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import type { TokenTimeMeasure } from '$stylist/calendar/type/alias/time-measure';
export interface RecipeCalendarView extends ComputeIntersectAll<[SlotChildren]> {
	events?: SlotCalendarEvent[];
	initialDate?: Date;
	viewMode?: TokenTimeMeasure;
	showWeekNumbers?: boolean;
	weekendDays?: number[];
	class?: string;
	dayClass?: string;
	eventClass?: string;
	headerClass?: string;
	onEventClick?: (event: SlotCalendarEvent) => void;
	onDayClick?: (date: Date) => void;
	onEventCreate?: (date: Date) => void;
}
