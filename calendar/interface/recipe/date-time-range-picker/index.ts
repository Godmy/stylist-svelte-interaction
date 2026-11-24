import type { SlotDatePicker } from '$stylist/calendar/interface/slot/date-picker';
import type { SlotDateTimeRangePicker } from '$stylist/calendar/interface/slot/date-time-range-picker';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDateTimeRangePicker extends ComputeIntersectAll<
	[SlotDatePicker, SlotDateTimeRangePicker]
> {}
