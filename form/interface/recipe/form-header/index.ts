import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotFormHeader } from '$stylist/form/interface/slot/form-header';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeFormHeader extends ComputeIntersectAll<[SlotFormHeader, SlotText]> {}
