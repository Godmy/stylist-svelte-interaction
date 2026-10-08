import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeTimeSlot
	extends ComputeIntersectAll<[Omit<HTMLAttributes<HTMLDivElement>, 'class'>]> {
	start: Date;
	end: Date;
	timeLabel?: string;
	available?: boolean;
	selected?: boolean;
	active?: boolean;
	events?: SlotCalendarEvent[];
	class?: string;
	onChange?: (slot: {
		start: Date;
		end: Date;
		timeLabel?: string;
		available?: boolean;
		selected?: boolean;
		active?: boolean;
		events?: SlotCalendarEvent[];
	}) => void;
	onClick?: (slot: {
		start: Date;
		end: Date;
		timeLabel?: string;
		available?: boolean;
		selected?: boolean;
		active?: boolean;
		events?: SlotCalendarEvent[];
	}) => void;
	onKeyDown?: (event: KeyboardEvent) => void;
}
