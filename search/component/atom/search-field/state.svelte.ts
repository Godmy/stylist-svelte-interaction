import type { RecipeSearchField } from '$stylist/search/interface/recipe/search-field';

export function createSearchFieldState(getProps: () => RecipeSearchField) {
	const props = $derived(getProps());
	const rootClass = $derived(
		['c-search-field', props.icon !== false && 'c-search-field--icon', props.class]
			.filter(Boolean)
			.join(' ')
	);
	const inputClass = $derived(
		['c-search-field__input', props.inputClass].filter(Boolean).join(' ')
	);
	// A <label for>, aria-labelledby or aria-label names the control; otherwise its placeholder.
	const ariaLabel = $derived(
		props['aria-label'] ??
			(props['aria-labelledby'] || props.id ? undefined : props.placeholder || 'Search')
	);

	function handleInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		props.oninput?.(event);
		props.onValueInput?.(event.currentTarget.value);
	}

	/** Escape clears a non-empty query, then reports itself: native clearing differs per browser. */
	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		props.onkeydown?.(event);
		if (event.key !== 'Escape' || event.defaultPrevented) return;
		const filled = event.currentTarget.value !== '';
		if (!filled && !props.onEscape) return;
		event.preventDefault();
		if (filled) {
			props.onValueInput?.('');
			props.onClear?.();
		}
		props.onEscape?.();
	}

	return {
		get rootClass() {
			return rootClass;
		},
		get inputClass() {
			return inputClass;
		},
		get ariaLabel() {
			return ariaLabel;
		},
		handleInput,
		handleKeydown
	};
}

export default createSearchFieldState;
