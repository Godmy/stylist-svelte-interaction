import type { RecipeDialog } from '$stylist/dialog/interface/recipe/dialog';

export function createDialogState(getProps: () => RecipeDialog) {
	const props = $derived(getProps());
	const dialogClasses = $derived(`nav-dialog ${props.class ?? ''}`.trim());

	return {
		get dialogClasses() {
			return dialogClasses;
		}
	};
}

export default createDialogState;
