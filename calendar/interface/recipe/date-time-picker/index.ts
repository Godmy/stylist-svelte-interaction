import type { SlotDatePicker } from '$stylist/calendar/interface/slot/date-picker';
import type { SlotDateTimePicker } from '$stylist/calendar/interface/slot/date-time-picker';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDateTimePicker extends ComputeIntersectAll<
	[SlotDatePicker, SlotDateTimePicker]
> {}
