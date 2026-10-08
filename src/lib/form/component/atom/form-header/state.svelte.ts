import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { SlotFormHeader as RecipeFormHeader } from '$stylist/form/interface/slot/form-header';

export function createFormHeaderState(props: RecipeFormHeader) {
	const rootClass = $derived(ClassNamesManager.merge('c-form-header', props.class ?? ''));
	const backButtonClass = $derived(
		ClassNamesManager.merge('c-form-header__back-btn', props.backButtonClass ?? '')
	);
	const titleClass = $derived(
		ClassNamesManager.merge('c-form-header__title', props.titleClass ?? '')
	);
	const subtitleClass = $derived(
		ClassNamesManager.merge('c-form-header__subtitle', props.subtitleClass ?? '')
	);
	const descriptionClass = $derived(
		ClassNamesManager.merge('c-form-header__description', props.descriptionClass ?? '')
	);
	const actionsClass = $derived(
		ClassNamesManager.merge('c-form-header__actions', props.actionsClass ?? '')
	);

	return {
		get rootClass() {
			return rootClass;
		},
		get backButtonClass() {
			return backButtonClass;
		},
		get titleClass() {
			return titleClass;
		},
		get subtitleClass() {
			return subtitleClass;
		},
		get descriptionClass() {
			return descriptionClass;
		},
		get actionsClass() {
			return actionsClass;
		}
	};
}
