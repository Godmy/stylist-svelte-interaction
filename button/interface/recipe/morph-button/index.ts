import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
export interface RecipeMorphButton extends ComputeIntersectAll<
	[Omit<RecipeAnimatedButton, 'effect' | 'loading' | 'href' | 'target' | 'rel'>]
> {
	/** The host sets success only after the action has actually succeeded. */
	state?: 'idle' | 'loading' | 'success' | 'error';
	loadingLabel?: string;
	successLabel?: string;
	errorLabel?: string;
}
