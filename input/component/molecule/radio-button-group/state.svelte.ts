import type { RecipeRadioButtonGroup } from '$stylist/input/interface/recipe/radio-button-group';

const EXCLUDED_CONTAINER_PROP_NAMES = [
	'options',
	'value',
	'name',
	'disabled',
	'required',
	'orientation',
	'class',
	'optionClass',
	'labelClass',
	'radioClass',
	'onValueInput',
	'onValueChange',
	'accept',
	'alt',
	'autocomplete',
	'autofocus',
	'capture',
	'checked',
	'crossOrigin',
	'files',
	'form',
	'formAction',
	'formEncType',
	'formMethod',
	'formNoValidate',
	'formTarget',
	'height',
	'inputMode',
	'list',
	'max',
	'maxLength',
	'min',
	'minLength',
	'multiple',
	'pattern',
	'placeholder',
	'readOnly',
	'selectionDirection',
	'selectionEnd',
	'selectionStart',
	'size',
	'src',
	'step',
	'type',
	'useMap',
	'width',
	'wrap'
];

export const createRadioButtonGroupState = (getProps: () => RecipeRadioButtonGroup) => {
	const props = $derived(getProps());
	const containerClass = $derived(['c-radio-group', props.class].filter(Boolean).join(' '));
	const options = $derived(props.options ?? []);
	const name = $derived(props.name ?? '');
	const disabled = $derived(props.disabled ?? false);
	const required = $derived(props.required ?? false);
	let selectedValue = $state(props.value ?? '');

	$effect(() => {
		selectedValue = props.value ?? '';
	});

	const getOptionClass = (_isDisabled: boolean) => {
		return 'c-radio-group__option';
	};

	const radioInputClass = 'c-radio-group__input';

	const optionLabelClass = 'c-radio-group__label';

	const htmlProps = $derived.by(() => {
		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(props)) {
			if (!EXCLUDED_CONTAINER_PROP_NAMES.includes(key)) {
				result[key] = value;
			}
		}

		return result;
	});

	return {
		get htmlProps() {
			return htmlProps;
		},
		get containerClass() {
			return containerClass;
		},
		get value() {
			return selectedValue;
		},
		get options() {
			return options;
		},
		get name() {
			return name;
		},
		get disabled() {
			return disabled;
		},
		get required() {
			return required;
		},
		getOptionClass,
		get radioInputClass() {
			return radioInputClass;
		},
		get optionLabelClass() {
			return optionLabelClass;
		},
		handleInput(optionValue: string) {
			selectedValue = optionValue;
			props.onValueInput?.(optionValue);
		},
		handleChange(optionValue: string) {
			selectedValue = optionValue;
			props.onValueChange?.(optionValue);
		}
	};
};

export default createRadioButtonGroupState;
