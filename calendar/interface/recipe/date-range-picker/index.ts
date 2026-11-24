import type { SlotDatePicker } from '$stylist/calendar/interface/slot/date-picker';
import type { SlotDateRangePicker } from '$stylist/calendar/interface/slot/date-range-picker';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDateRangePicker extends ComputeIntersectAll<
	[SlotDatePicker, SlotDateRangePicker]
> {}
