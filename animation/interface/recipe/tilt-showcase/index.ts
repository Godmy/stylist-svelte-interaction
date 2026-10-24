import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorTilt } from '$stylist/animation/interface/behavior/tilt';
import type { SlotTiltShowcase } from '$stylist/animation/interface/slot/tilt-showcase';

/** Art card on a TiltCard with a live rotation readout; the effect is configured by props. */
export interface RecipeTiltShowcase
	extends Omit<RecipeHtmlSection, 'children' | 'title'>, BehaviorTilt, SlotTiltShowcase {}
