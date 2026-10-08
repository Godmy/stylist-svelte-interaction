import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
export interface SlotCalendarDay {
	date: Date;
	isCurrentMonth: boolean;
	isToday: boolean;
	isSelected?: boolean;
	hasEvent?: boolean;
	events: SlotCalendarEvent[];
	/** Заблокирован для выбора (прошедшая дата, вне min/max, кастомное правило). */
	isDisabled?: boolean;
	/** Начало выбранного периода (calendar-range). */
	isRangeStart?: boolean;
	/** Конец выбранного периода (calendar-range). */
	isRangeEnd?: boolean;
	/** День внутри выбранного периода, не считая границ (calendar-range). */
	isInRange?: boolean;
}
