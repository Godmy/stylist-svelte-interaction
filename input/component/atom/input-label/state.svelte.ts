import type { RecipeInputLabel } from '$stylist/input/interface/recipe/input-label';

export const createInputLabelState = (_getProps: () => RecipeInputLabel) => {
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
