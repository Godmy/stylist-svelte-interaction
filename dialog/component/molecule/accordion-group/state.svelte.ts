import { untrack } from 'svelte';
import type { RecipeAccordionGroup } from '$stylist/dialog/interface/recipe/accordion-group';
import { toSet } from '$stylist/theme/function/script/collection/to-set';
import { toggleInSet } from '$stylist/theme/function/script/collection/toggle-in-set';

export function createAccordionGroupState(getProps: () => RecipeAccordionGroup) {
	const props = $derived(getProps());
	let openValues = $state<Set<string>>(untrack(() => toSet(props.defaultValues ?? [])));

	$effect(() => {
		if (props.value !== undefined) {
			openValues = toSet(props.value);
		}
	});

	function isPanelOpen(value: string): boolean {
		return openValues.has(value);
	}

	function handleValueChange(value: string) {
		const next = toggleInSet(openValues, value);
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
