import type { RecipeSearchForm } from '$stylist/search/interface/recipe/search-form';

export function createSearchFormState(getProps: () => RecipeSearchForm) {
	const props = $derived(getProps());
	const rootClass = $derived(['c-search-form', props.class].filter(Boolean).join(' '));

	/** Native submission (GET `?q=`) unless onSearch takes the query over. */
	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		props.onsubmit?.(event);
		if (!props.onSearch || event.defaultPrevented) return;
		event.preventDefault();
		props.onSearch(props.query ?? '');
	}

	return {
		get rootClass() {
			return rootClass;
		},
		handleSubmit
	};
}

export default createSearchFormState;
