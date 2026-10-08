import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
export interface RecipeTimeGrid extends ComputeIntersectAll<[SlotChildren]> {
	events?: SlotCalendarEvent[];
	startDate?: Date;
	endDate?: Date;
	startTime?: number;
	endTime?: number;
	timeStep?: number;
	showHeader?: boolean;
	showCurrentTimeIndicator?: boolean;
	showAllDayEvents?: boolean;
	showTimeGutter?: boolean;
	timeSlotHeight?: number;
	variant?: 'grid' | 'schedule';
	class?: string;
	slotClass?: string;
	eventClass?: string;
	headerClass?: string;
	onEventClick?: (event: SlotCalendarEvent) => void;
	onSlotClick?: (slotDate: Date) => void;
}
