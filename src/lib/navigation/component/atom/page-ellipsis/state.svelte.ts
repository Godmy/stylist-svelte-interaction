import type { HTMLAttributes } from 'svelte/elements';
import type { RecipePageEllipsis } from '$stylist/navigation/interface/recipe/page-ellipsis';

export function createPageEllipsisState(
	getProps: () => RecipePageEllipsis & HTMLAttributes<HTMLDivElement>
) {
	const props = $derived(getProps());
	const containerClasses = $derived(`page-ellipsis ${props.class ?? ''}`.trim());

	return {
		get containerClasses() {
			return containerClasses;
		}
	};
}

export default createPageEllipsisState;
