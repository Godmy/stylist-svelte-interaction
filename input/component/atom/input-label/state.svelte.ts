import type { RecipeInputLabel } from '$stylist/input/interface/recipe/input-label';

export const createInputLabelState = (getProps: () => RecipeInputLabel) => {
	const props = $derived(getProps());
	return {
		get labelClasses() {
			return 'input-field-label';
		},
		get requiredIndicatorClasses() {
			return 'input-field-required';
		}
	};
};

export default createInputLabelState;
