import type { RecipeAccordionGroup } from '$stylist/dialog/interface/recipe/accordion-group';

export function createAccordionGroupState(getProps: () => RecipeAccordionGroup) {
	const props = $derived(getProps());
	let openValues = $state<Set<string>>(new Set(props.defaultValues ?? []));

	$effect(() => {
		if (props.value !== undefined) {
			openValues = new Set(props.value);
		}
	});

	function isPanelOpen(value: string): boolean {
		return openValues.has(value);
	}

	function handleValueChange(value: string) {
		const next = new Set(openValues);
		if (next.has(value)) next.delete(value);
		else next.add(value);
		openValues = next;
		props.onValueChange?.([...next]);
	}

	return {
		isPanelOpen,
		handleValueChange,
		get openValues() {
			return openValues;
		}
	};
}

export default createAccordionGroupState;
