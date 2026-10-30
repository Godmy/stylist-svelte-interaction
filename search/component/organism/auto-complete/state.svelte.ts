import { ObjectManagerSearchBar } from '$stylist/search/class/manager/search-bar';
import type { AutoCompleteOption } from '$stylist/search/type/object/auto-complete-option';
import type { RecipeAutoComplete } from '$stylist/search/interface/recipe/auto-complete';

type InputFocusEvent = FocusEvent & { currentTarget: EventTarget & HTMLInputElement };

export function createAutoCompleteState(getProps: () => RecipeAutoComplete) {
	const props = $derived(getProps());
	let isOpen = $state(false);
	let highlightedIndex = $state(-1);

	const options = $derived.by(() => {
		const query = ObjectManagerSearchBar.normalizeQuery(props.value ?? '');
		const all = props.options ?? [];
		if (!query) return props.showAllSuggestions ? all : [];
		return all.filter(
			(option) =>
				option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query)
		);
	});
	const expanded = $derived(isOpen && options.length > 0);
	const rootClass = $derived(['c-auto-complete', props.class].filter(Boolean).join(' '));
	const listClass = $derived(['c-auto-complete__list', props.listClass].filter(Boolean).join(' '));
	const itemClass = $derived(['c-auto-complete__item', props.itemClass].filter(Boolean).join(' '));

	function handleValueInput(query: string) {
		props.onValueInput?.(query);
		isOpen = true;
		highlightedIndex = -1;
	}

	function handleSelect(option: AutoCompleteOption) {
		props.onValueInput?.(option.label);
		props.onSelect?.(option);
		isOpen = false;
		highlightedIndex = -1;
	}

	/** Combobox keys; Escape closes an open list before the field may clear the query. */
	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		props.onkeydown?.(event);
		if (event.defaultPrevented) return;
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			isOpen = true;
			const step = event.key === 'ArrowDown' ? 1 : -1;
			highlightedIndex = Math.max(-1, Math.min(highlightedIndex + step, options.length - 1));
		} else if (event.key === 'Enter' && expanded && highlightedIndex >= 0) {
			event.preventDefault();
			handleSelect(options[highlightedIndex]);
		} else if (event.key === 'Escape' && expanded) {
			event.preventDefault();
			isOpen = false;
			highlightedIndex = -1;
		}
	}

	return {
		get options() {
			return options;
		},
		get expanded() {
			return expanded;
		},
		get highlightedIndex() {
			return highlightedIndex;
		},
		get rootClass() {
			return rootClass;
		},
		get listClass() {
			return listClass;
		},
		get itemClass() {
			return itemClass;
		},
		handleValueInput,
		handleSelect,
		handleKeydown,
		handleFocus(event: InputFocusEvent) {
			props.onfocus?.(event);
			isOpen = true;
		},
		handleBlur(event: InputFocusEvent) {
			props.onblur?.(event);
			isOpen = false;
		},
		/** Picking with the pointer must not blur the field, which would close the list first. */
		keepFocus(event: MouseEvent) {
			event.preventDefault();
		}
	};
}

export default createAutoCompleteState;
