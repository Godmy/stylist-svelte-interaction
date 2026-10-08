import type { RecipeActionSegmentedControl } from '$stylist/control/interface/recipe/action-segmented-control';

export function createActionSegmentedControlState(getProps: () => RecipeActionSegmentedControl) {
	const props = $derived(getProps());
	const items = $derived(props.items);
	const selectedIndex = $derived(props.selectedIndex ?? 0);
	let localSelectedIndex = $state(props.selectedIndex ?? 0);

	$effect(() => {
		localSelectedIndex = props.selectedIndex ?? 0;
	});

	return {
		get items() {
			return items;
		},
		get selectedIndex() {
			return selectedIndex;
		},
		get localSelectedIndex() {
			return localSelectedIndex;
		},
		handleClick(index: number) {
			localSelectedIndex = index;
			props.onValueInput?.(index);
			props.onValueChange?.(index);
			props.onChange?.(index);
		}
	};
}

export default createActionSegmentedControlState;
