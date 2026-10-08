import { untrack } from 'svelte';
import { PresetMultiSelect } from '$stylist/control/const/preset/multi-select';
import type { RecipeMultiSelect } from '$stylist/control/interface/recipe/multi-select';
import type { SlotMultiSelectOption as MultiSelectOption } from '$stylist/control/interface/slot/multi-select-option';

const EMPTY_MULTI_SELECT_VALUE: string[] = [];
const EMPTY_MULTI_SELECT_OPTIONS: MultiSelectOption[] = [];

export function createMultiSelectState(getProps: () => RecipeMultiSelect) {
	const props = $derived(getProps());
	const options = $derived(props.options ?? EMPTY_MULTI_SELECT_OPTIONS);
	const value = $derived(props.value ?? EMPTY_MULTI_SELECT_VALUE);
	const placeholder = $derived(props.placeholder ?? 'Select options...');
	const disabled = $derived(props.disabled ?? false);
	const searchable = $derived(props.searchable ?? true);
	const maxSelections = $derived(props.maxSelections ?? 0);
	const className = $derived(props.class ?? '');
	const dropdownClass = $derived(props.dropdownClass ?? '');
	const searchInputClass = $derived(props.searchInputClass ?? '');

	let isOpen = $state(false);
	let selectedValues = $state<string[]>(untrack(() => value));
	let searchQuery = $state('');
	const containerRef = { current: null as HTMLDivElement | null };
	const dropdownRef = { current: null as HTMLDivElement | null };

	$effect(() => {
		if (JSON.stringify(selectedValues) !== JSON.stringify(value)) {
			selectedValues = [...value];
		}
	});

	$effect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				containerRef.current &&
				dropdownRef.current &&
				!containerRef.current.contains(event.target as Node) &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				isOpen = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function getFilteredOptions(): MultiSelectOption[] {
		if (!searchQuery) return options;
		return options.filter(
			(option) =>
				option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
				!selectedValues.includes(option.value)
		);
	}

	function emitChange(nextValue: string[]): void {
		props.onChange?.(nextValue);
		props.onInput?.(nextValue);
	}

	function selectOption(optionValue: string): void {
		if (disabled || options.find((option) => option.value === optionValue)?.disabled) return;
		if (!selectedValues.includes(optionValue)) {
			if (maxSelections <= 0 || selectedValues.length < maxSelections) {
				selectedValues = [...selectedValues, optionValue];
				emitChange([...selectedValues]);
			}
		}
		if (searchable) {
			searchQuery = '';
		}
	}

	function removeOption(optionValue: string): void {
		if (disabled) return;
		selectedValues = selectedValues.filter((valueItem) => valueItem !== optionValue);
		emitChange([...selectedValues]);
	}

	function clearSelections(): void {
		if (disabled) return;
		selectedValues = [];
		emitChange([]);
	}

	function toggleDropdown(): void {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	const containerClasses = $derived(['c-multiselect', className].filter(Boolean).join(' '));
	const selectDisplayClasses = 'c-multiselect__display';
	const placeholderClasses = 'c-multiselect__placeholder';
	const selectedValueContainerClasses = 'c-multiselect__tag';
	const removeButtonClasses = 'c-multiselect__tag-remove';
	const clearButtonClasses = 'c-multiselect__clear-btn';
	const chevronClasses = 'c-multiselect__chevron';
	const dropdownClasses = $derived(
		['c-multiselect__dropdown', dropdownClass].filter(Boolean).join(' ')
	);
	const searchContainerClasses = 'c-multiselect__search';
	const searchInputClasses = $derived(
		['c-multiselect__search-input', searchInputClass].filter(Boolean).join(' ')
	);
	const noOptionsMessageClasses = 'c-multiselect__empty';
	const filteredOptions = $derived(getFilteredOptions());

	function getOptionClasses(option: MultiSelectOption): string {
		return [
			'c-multiselect__option',
			selectedValues.includes(option.value) ? 'c-multiselect__option--selected' : '',
			option.disabled ? 'c-multiselect__option--disabled' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	return {
		get options() {
			return options;
		},
		get value() {
			return value;
		},
		get placeholder() {
			return placeholder;
		},
		get disabled() {
			return disabled;
		},
		get searchable() {
			return searchable;
		},
		get maxSelections() {
			return maxSelections;
		},
		get isOpen() {
			return isOpen;
		},
		get selectedValues() {
			return selectedValues;
		},
		get searchQuery() {
			return searchQuery;
		},
		set searchQuery(v: string) {
			searchQuery = v;
		},
		get containerRef() {
			return containerRef.current;
		},
		set containerRef(v: HTMLDivElement | null) {
			containerRef.current = v;
		},
		get dropdownRef() {
			return dropdownRef.current;
		},
		set dropdownRef(v: HTMLDivElement | null) {
			dropdownRef.current = v;
		},
		get containerClasses() {
			return containerClasses;
		},
		get selectDisplayClasses() {
			return selectDisplayClasses;
		},
		get placeholderClasses() {
			return placeholderClasses;
		},
		get selectedValueContainerClasses() {
			return selectedValueContainerClasses;
		},
		get removeButtonClasses() {
			return removeButtonClasses;
		},
		get clearButtonClasses() {
			return clearButtonClasses;
		},
		get chevronClasses() {
			return chevronClasses;
		},
		get dropdownClasses() {
			return dropdownClasses;
		},
		get searchContainerClasses() {
			return searchContainerClasses;
		},
		get searchInputClasses() {
			return searchInputClasses;
		},
		get noOptionsMessageClasses() {
			return noOptionsMessageClasses;
		},
		get filteredOptions() {
			return filteredOptions;
		},
		get ChevronDown() {
			return PresetMultiSelect.ChevronDown;
		},
		get X() {
			return PresetMultiSelect.X;
		},
		get getFilteredOptions() {
			return getFilteredOptions;
		},
		get selectOption() {
			return selectOption;
		},
		get removeOption() {
			return removeOption;
		},
		get clearSelections() {
			return clearSelections;
		},
		get toggleDropdown() {
			return toggleDropdown;
		},
		get getOptionClasses() {
			return getOptionClasses;
		}
	};
}
