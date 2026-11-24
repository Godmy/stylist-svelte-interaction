import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorTilt } from '$stylist/animation/interface/behavior/tilt';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Art card on a TiltCard with a live rotation readout; the effect is configured by props. */
export interface RecipeTiltShowcase extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children' | 'title'>,
		BehaviorTilt,
		{
			title?: string;
			eyebrow?: string;
			heading?: string;
			text?: string;
		}
	]
> {}
