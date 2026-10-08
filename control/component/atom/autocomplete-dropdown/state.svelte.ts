import type { SlotAutocompleteDropdownOption as AutocompleteDropdownOption } from '$stylist/control/interface/slot/autocomplete-dropdown-option';
import type { RecipeAutocompleteDropdown } from '$stylist/control/interface/recipe/autocomplete-dropdown';

export function createAutocompleteDropdownState(props: RecipeAutocompleteDropdown) {
	let isOpen = $state(false);
	let localValue = $state(props.value ?? '');

	$effect(() => {
		localValue = props.value ?? '';
	});

	const selectedOption = $derived(
		props.options.find((option) => option.value === localValue) ?? null
	);

	const handleSelect = (option: AutocompleteDropdownOption) => {
		localValue = option.value;
		props.onValueInput?.(option.value);
		props.onValueChange?.(option.value);
		props.onChange?.(option.value);
		isOpen = false;
	};

	const toggle = () => {
		isOpen = !isOpen;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggle();
		}
	};

	const handleOptionKeyDown = (event: KeyboardEvent, option: AutocompleteDropdownOption) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleSelect(option);
		}
	};

	const rootClass = $derived(
		('autocomplete-dropdown' + (props.class ? ` ${props.class}` : '')).trim()
	);
	const triggerClass = $derived('autocomplete-dropdown__trigger');
	const chevronClass = $derived(
		isOpen
			? 'autocomplete-dropdown__chevron autocomplete-dropdown__chevron--open'
			: 'autocomplete-dropdown__chevron'
	);
	const listboxClass = $derived('autocomplete-dropdown__listbox');
	const optionClass = $derived('autocomplete-dropdown__option');

	return {
		get isOpen() {
			return isOpen;
		},
		get localValue() {
			return localValue;
		},
		get selectedOption() {
			return selectedOption;
		},
		get rootClass() {
			return rootClass;
		},
		get triggerClass() {
			return triggerClass;
		},
		get chevronClass() {
			return chevronClass;
		},
		get listboxClass() {
			return listboxClass;
		},
		get optionClass() {
			return optionClass;
		},
		toggle,
		handleSelect,
		handleKeyDown,
		handleOptionKeyDown
	};
}

export default createAutocompleteDropdownState;
