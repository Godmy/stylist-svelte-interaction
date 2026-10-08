import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
export interface RecipeOverlay extends ComputeIntersectAll<[BehaviorClickable, BehaviorSizable]> {}
