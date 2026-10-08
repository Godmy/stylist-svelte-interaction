import type { AutoCompleteOption } from '$stylist/search/type/object/auto-complete-option';
import type { SlotAutoComplete as RecipeAutoComplete } from '$stylist/search/interface/slot/auto-complete';

export const createAutoCompleteState = (getProps: () => RecipeAutoComplete) => {
	const props = $derived(getProps());
	let filteredOptions = $state<AutoCompleteOption[]>([]);
	let isOpen = $state(false);
	let highlightedIndex = $state(-1);
	let inputValue = $state(props.value ?? '');

	$effect(() => {
		if (inputValue) {
			filteredOptions = (props.options ?? []).filter(
				(option) =>
					option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
					option.value.toLowerCase().includes(inputValue.toLowerCase())
			);
		} else {
			filteredOptions = props.showAllSuggestions ? (props.options ?? []) : [];
		}
	});

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		props.onInput?.(inputValue);
		isOpen = true;
		highlightedIndex = -1;
	}

	function handleSelect(option: AutoCompleteOption) {
		inputValue = option.label;
		props.onSelect?.(option);
		isOpen = false;
		highlightedIndex = -1;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && highlightedIndex >= 0) {
			event.preventDefault();
			handleSelect(filteredOptions[highlightedIndex]);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlightedIndex = Math.max(highlightedIndex - 1, -1);
		} else if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function open() {
		isOpen = true;
	}

	function close() {
		setTimeout(() => {
			isOpen = false;
		}, 120);
	}

	return {
		get options() {
			return filteredOptions;
		},
		get isOpen() {
			return isOpen;
		},
		get highlightedIndex() {
			return highlightedIndex;
		},
		get inputValue() {
			return inputValue;
		},
		get placeholder() {
			return props.placeholder ?? 'Search...';
		},
		get className() {
			return props.class ?? '';
		},
		get inputClass() {
			return props.inputClass ?? '';
		},
		get listClass() {
			return props.listClass ?? '';
		},
		get itemClass() {
			return props.itemClass ?? '';
		},
		handleInput,
		handleSelect,
		handleKeyDown,
		open,
		close
	};
};
