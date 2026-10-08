import type { RecipeModal } from '$stylist/dialog/interface/recipe/modal';

export function createModalState(getProps: () => RecipeModal) {
	const props = $derived(getProps());
	const dialogClasses = $derived(`nav-dialog ${props.class ?? ''}`.trim());

	return {
		get dialogClasses() {
			return dialogClasses;
		}
	};
}

export default createModalState;
