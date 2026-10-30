import type { RecipeSearchBar } from '$stylist/search/interface/recipe/search-bar';

export function createSearchBarState(getProps: () => RecipeSearchBar) {
	const props = $derived(getProps());
	let field = $state<HTMLInputElement | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const rootClass = $derived(
		['c-search-bar', props.disabled && 'c-search-bar--disabled', props.class]
			.filter(Boolean)
			.join(' ')
	);
	const clearable = $derived(Boolean(props.value) && !props.disabled);

	// A pending debounced search must not fire after unmount.
	$effect(() => () => clearTimeout(timer));

	function search(query: string) {
		clearTimeout(timer);
		props.onSearch?.(query);
	}

	function handleValueInput(query: string) {
		props.onValueInput?.(query);
		clearTimeout(timer);
		timer = setTimeout(() => props.onSearch?.(query), props.debounceMs ?? 300);
	}

	/** Reports a clear that already emptied the query (Escape or the clear button). */
	function notifyClear() {
		props.onClear?.();
		search('');
	}

	function handleClear() {
		props.onValueInput?.('');
		notifyClear();
		field?.focus();
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.key === 'Enter') search(event.currentTarget.value);
	}

	return {
		get field() {
			return field;
		},
		set field(element: HTMLInputElement | null) {
			field = element;
		},
		get rootClass() {
			return rootClass;
		},
		get clearable() {
			return clearable;
		},
		handleValueInput,
		notifyClear,
		handleClear,
		handleKeydown,
		triggerSearch() {
			search(props.value ?? '');
		}
	};
}

export default createSearchBarState;
