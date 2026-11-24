import type { SlotDatePicker } from '$stylist/calendar/interface/slot/date-picker';
import type { SlotFormDatePicker } from '$stylist/calendar/interface/slot/form-date-picker';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeFormDatePicker extends ComputeIntersectAll<
	[SlotDatePicker, SlotFormDatePicker]
> {}
