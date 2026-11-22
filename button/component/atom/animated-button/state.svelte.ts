import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';

/** Reactive disabled state and link click handling for the animated button. */
export function createAnimatedButtonState(getProps: () => RecipeAnimatedButton) {
	const props = $derived(getProps());
	const blocked = $derived(Boolean(props.disabled || props.loading));

	return {
		get blocked() {
			return blocked;
		},
		handleClick(event: Parameters<NonNullable<RecipeAnimatedButton['onclick']>>[0]) {
			if (blocked) event.preventDefault();
			else props.onclick?.(event);
		}
	};
}

export default createAnimatedButtonState;
