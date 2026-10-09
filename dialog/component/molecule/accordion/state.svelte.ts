import type { RecipeAccordion } from '$stylist/dialog/interface/recipe/accordion';

export function createAccordionState(getProps: () => RecipeAccordion) {
	const props = $derived(getProps());
	// Seeded from defaultValue so SSR already renders the open panel (the
	// effect below never runs on the server).
	let activeValue = $state<string | null>(getProps().defaultValue ?? null);

	$effect(() => {
		activeValue = props.defaultValue ?? null;
	});

	function isPanelOpen(value: string): boolean {
		return activeValue === value;
	}

	function handleValueChange(value: string) {
		activeValue = activeValue === value ? null : value;
	}

	return {
		isPanelOpen,
		handleValueChange,
		get activeValue() {
			return activeValue;
		}
	};
}

export default createAccordionState;
