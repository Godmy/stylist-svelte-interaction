import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorVectorScene } from '$stylist/animation/interface/behavior/vector-scene';
import type { SVGAttributes } from 'svelte/elements';
export interface RecipeVectorScene extends ComputeIntersectAll<
	[SlotClass, BehaviorVectorScene, Omit<SVGAttributes<SVGSVGElement>, 'class'>]
> {
	viewBox?: string;
	layers: {
		id: string;
		d: string;
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
		transformOrigin?: string;
	}[];
}
