import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { BehaviorTilt } from '$stylist/animation/interface/behavior/tilt';
import type { SlotTiltCard } from '$stylist/animation/interface/slot/tilt-card';

/** Perspective card: a stable wrapper measures the pointer while the inner surface tilts. */
export interface RecipeTiltCard extends RecipeHtmlDiv, BehaviorTilt, SlotTiltCard {}
