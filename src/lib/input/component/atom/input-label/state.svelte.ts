import type { SlotInputLabel } from '$stylist/input/interface/slot/input-label';

export const createInputLabelState = (getProps: () => SlotInputLabel) => {
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
