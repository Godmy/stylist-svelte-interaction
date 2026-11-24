import type { SlotDatePicker } from '$stylist/calendar/interface/slot/date-picker';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDateTimeRangePicker extends ComputeIntersectAll<
	[
		SlotDatePicker,
		{
			inputClass?: string;
			calendarClass?: string;
		}
	]
> {}
