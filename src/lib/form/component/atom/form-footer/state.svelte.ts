import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { SlotFormFooter as RecipeFormFooter } from '$stylist/form/interface/slot/form-footer';

export function createFormFooterState(props: RecipeFormFooter) {
	const rootClass = $derived(ClassNamesManager.merge('c-form-footer', props.class ?? ''));
	const secondaryButtonClass = $derived(
		ClassNamesManager.merge(
			'c-form-footer__secondary-btn',
			(props.secondaryButtonDisabled ?? false) && 'c-form-footer__btn--disabled',
			props.secondaryButtonClass ?? ''
		)
	);
	const primaryButtonClass = $derived(
		ClassNamesManager.merge(
			'c-form-footer__primary-btn',
			(props.primaryButtonDisabled ?? false) && 'c-form-footer__btn--disabled',
			props.primaryButtonClass ?? ''
		)
	);

	return {
		get rootClass() {
			return rootClass;
		},
		get secondaryButtonClass() {
			return secondaryButtonClass;
		},
		get primaryButtonClass() {
			return primaryButtonClass;
		}
	};
}
