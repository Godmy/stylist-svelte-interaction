import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeAddressForm } from '$stylist/form/interface/recipe/address-form';
export function createAddressFormState(getProps: () => RecipeAddressForm): {
	rootClass: string;
	inputClass: string;
	gridClass: string;
	gridItemClass: string;
} {
	const props = $derived(getProps());
	const rootClass = $derived(ClassNamesManager.merge('c-address-form', props.class ?? ''));
	const inputClass = $derived('c-address-form__input');
	const gridClass = $derived('c-address-form__grid');
	const gridItemClass = $derived('c-address-form__input');

	return {
		get rootClass() {
			return rootClass;
		},
		get inputClass() {
			return inputClass;
		},
		get gridClass() {
			return gridClass;
		},
		get gridItemClass() {
			return gridItemClass;
		}
	};
}

export default createAddressFormState;
