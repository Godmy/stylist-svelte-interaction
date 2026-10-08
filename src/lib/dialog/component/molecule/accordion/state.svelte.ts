import type { RecipeAccordion } from '$stylist/dialog/interface/recipe/accordion';

export function createAccordionState(getProps: () => RecipeAccordion) {
	const props = $derived(getProps());
	let activeValue = $state<string | null>(null);

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
