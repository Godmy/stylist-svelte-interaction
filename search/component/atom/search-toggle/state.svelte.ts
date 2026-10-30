import type { RecipeSearchToggle } from '$stylist/search/interface/recipe/search-toggle';

export function createSearchToggleState(getProps: () => RecipeSearchToggle) {
	const props = $derived(getProps());
	const rootClass = $derived(['c-search-toggle', props.class].filter(Boolean).join(' '));
	const label = $derived(
		props.open ? (props.closeLabel ?? 'Close search') : (props.openLabel ?? 'Open search')
	);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		props.onclick?.(event);
		if (!event.defaultPrevented) props.onToggle?.();
	}

	return {
		get rootClass() {
			return rootClass;
		},
		get label() {
			return label;
		},
		handleClick
	};
}

export default createSearchToggleState;
