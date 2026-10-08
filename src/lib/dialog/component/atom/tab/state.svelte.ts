import type { RecipeTab } from '$stylist/dialog/interface/recipe/tab';

export function createTabState(props: RecipeTab) {
	const variant = $derived(props.variant ?? 'primary');
	const size = $derived(props.size ?? 'md');
	const disabled = $derived(props.disabled ?? false);
	const isSelected = $derived(props.selected ?? false);

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get isSelected() {
			return isSelected;
		}
	};
}

export default createTabState;
