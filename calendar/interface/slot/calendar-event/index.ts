import type { TokenPriority } from '$stylist/calendar/type/alias/priority';
export interface SlotCalendarEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	color?: string;
	allDay?: boolean;
	location?: string;
	description?: string;
	/** Detail page of the event: the event dialog shows it as a link. */
	href?: string;
	priority?: TokenPriority;
}
