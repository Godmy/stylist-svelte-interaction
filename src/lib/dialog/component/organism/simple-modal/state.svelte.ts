import type { RecipeSimpleModal as SimpleModalProps } from '$stylist/dialog/interface/recipe/simple-modal';

export function createSimpleModalState(getProps: () => SimpleModalProps) {
	const props = $derived(getProps());
	const dialogClasses = $derived(`sm-dialog ${props.class ?? ''}`.trim());

	return {
		get dialogClasses() {
			return dialogClasses;
		}
	};
}

export default createSimpleModalState;
