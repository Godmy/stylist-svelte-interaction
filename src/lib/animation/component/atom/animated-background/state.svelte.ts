import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeAnimatedBackground } from '$stylist/animation/interface/recipe/animated-background';

export function createAnimatedBackgroundState(getProps: () => RecipeAnimatedBackground) {
	const props = $derived(getProps());
	const particleIndices = Array.from({ length: 12 }, (_, index) => index + 1);
	const children = $derived(props.children);
	const inlineStyle = $derived(typeof props.style === 'string' ? props.style : undefined);
	const containerClasses = $derived(
		ClassNamesManager.merge(
			'c-animated-background',
			'ambient-bg',
			typeof props.class === 'string' ? props.class : undefined
		)
	);

	return {
		get children() {
			return children;
		},
		get containerClasses() {
			return containerClasses;
		},
		get inlineStyle() {
			return inlineStyle;
		},
		get particleIndices() {
			return particleIndices;
		}
	};
}

export default createAnimatedBackgroundState;
