import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';
import type { RecipeRadioGroup } from '$stylist/input/interface/recipe/radio-group';
export function createRadioGroupState(getProps: () => RecipeRadioGroup): {
	internalValue: string;
	layoutClass: string;
	rootClass: string;
	labelClass: string;
	requiredMarkClass: string;
	descriptionClass: string;
	optionsContainerClass: string;
	optionLabelClass: string;
	optionTextClass: string;
	optionDescriptionClass: string;
	inputClass: string;
	indicatorClass: string;
	errorClass: string;
} {
	const props = $derived(getProps());
	let internalValue = $state(props.value ?? '');

	$effect(() => {
		if (props.value !== undefined) internalValue = props.value;
	});

	const orientation = $derived(props.orientation ?? TOKEN_ORIENTATION[1]);
	const layoutClass = $derived(`c-radio-group__options--${orientation}`);

	const rootClass = $derived('c-radio-group');
	const labelClass = $derived('c-radio-group__label');
	const requiredMarkClass = $derived('c-radio-group__required-mark');
	const descriptionClass = $derived('c-radio-group__description');
	const optionsContainerClass = $derived(
		ClassNamesManager.merge('c-radio-group__options', `c-radio-group__options--${orientation}`)
	);
	const optionLabelClass = $derived(
		ClassNamesManager.merge(
			'c-radio-group__option',
			props.disabled && 'c-radio-group__option--disabled'
		)
	);
	const optionTextClass = $derived('c-radio-group__option-label');
	const optionDescriptionClass = $derived('c-radio-group__option-desc');
	const inputClass = $derived('c-radio-group__input');
	const indicatorClass = $derived('c-radio-group__indicator');
	const errorClass = $derived('c-radio-group__error');

	return {
		get internalValue() {
			return internalValue;
		},
		set internalValue(v: string) {
			internalValue = v;
		},
		get layoutClass() {
			return layoutClass;
		},
		get rootClass() {
			return rootClass;
		},
		get labelClass() {
			return labelClass;
		},
		get requiredMarkClass() {
			return requiredMarkClass;
		},
		get descriptionClass() {
			return descriptionClass;
		},
		get optionsContainerClass() {
			return optionsContainerClass;
		},
		get optionLabelClass() {
			return optionLabelClass;
		},
		get optionTextClass() {
			return optionTextClass;
		},
		get optionDescriptionClass() {
			return optionDescriptionClass;
		},
		get inputClass() {
			return inputClass;
		},
		get indicatorClass() {
			return indicatorClass;
		},
		get errorClass() {
			return errorClass;
		}
	};
}

export default createRadioGroupState;
