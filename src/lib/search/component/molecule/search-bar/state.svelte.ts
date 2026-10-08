import { ControlManager } from '$stylist/control/class/manager/control';
import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
type SearchBarStateProps = { [key: string]: any };

export const createSearchBarState = (getProps: () => SearchBarStateProps) => {
	const props = $derived(getProps());
	// SlotState
	let searchTerm = $state(props.value ?? '');

	// Update local state when value prop changes
	$effect(() => {
		if (props.value !== undefined && searchTerm !== props.value) {
			searchTerm = props.value;
		}
	});

	// Debounced search
	const debouncedSearch = ControlManager.debounce((query: string) => {
		props.onSearch?.(query);
	}, props.debounceMs ?? 300);

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchTerm = target.value;

		props.onValueInput?.(searchTerm);
		props.onValueChange?.(searchTerm);

		debouncedSearch(searchTerm);
	}

	function handleClear() {
		searchTerm = '';

		props.onValueInput?.('');
		props.onValueChange?.('');

		props.onClear?.();
		props.onSearch?.('');
	}

	function triggerSearch() {
		props.onSearch?.(searchTerm);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			triggerSearch();
		}
		if (event.key === 'Escape' && searchTerm) {
			handleClear();
		}
	}

	// Computed classes
	const containerClasses = $derived.by(() =>
		ClassNamesManager.merge(
			'c-search-bar',
			props.disabled ? 'c-search-bar--disabled' : '',
			props.class
		)
	);

	const iconContainerClasses = $derived.by(() => 'c-search-bar__icon-wrap');

	const inputClasses = $derived.by(() =>
		ClassNamesManager.merge(
			'c-search-bar__input',
			props.disabled ? 'c-search-bar__input--disabled' : ''
		)
	);

	const controlsContainerClasses = $derived.by(() => 'c-search-bar__controls');

	const clearButtonClasses = $derived.by(() => 'c-search-bar__clear');

	const searchButtonClasses = $derived.by(() => 'c-search-bar__submit');

	const iconClasses = $derived.by(() => 'c-search-bar__icon');

	const smallIconClasses = $derived.by(() => 'c-search-bar__icon c-search-bar__icon--sm');

	return {
		// SlotState getters
		get searchTerm() {
			return searchTerm;
		},
		get hasValue() {
			return searchTerm && searchTerm.length > 0;
		},

		// Actions
		setSearchTerm(value: string) {
			searchTerm = value;
		},

		// Handlers
		handleInput,
		handleClear,
		triggerSearch,
		handleKeydown,

		// Classes
		get containerClasses() {
			return containerClasses;
		},
		get iconContainerClasses() {
			return iconContainerClasses;
		},
		get inputClasses() {
			return inputClasses;
		},
		get controlsContainerClasses() {
			return controlsContainerClasses;
		},
		get clearButtonClasses() {
			return clearButtonClasses;
		},
		get searchButtonClasses() {
			return searchButtonClasses;
		},
		get iconClasses() {
			return iconClasses;
		},
		get smallIconClasses() {
			return smallIconClasses;
		}
	};
};

export default createSearchBarState;
