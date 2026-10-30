import { tick } from 'svelte';
import type { RecipeSearchOverlay } from '$stylist/search/interface/recipe/search-overlay';

export function createSearchOverlayState(getProps: () => RecipeSearchOverlay) {
	const props = $derived(getProps());
	let field = $state<HTMLInputElement | null>(null);
	const rootClass = $derived(['c-search-overlay', props.class].filter(Boolean).join(' '));
	const term = $derived((props.query ?? '').trim());

	async function show() {
		props.onOpenChange?.(true);
		await tick();
		field?.focus();
		field?.select();
	}

	function close() {
		props.onOpenChange?.(false);
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
		get term() {
			return term;
		},
		close,
		toggle() {
			if (props.open) close();
			else void show();
		}
	};
}

export default createSearchOverlayState;
