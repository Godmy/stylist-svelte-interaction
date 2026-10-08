import type { RecipeTabPanel } from '$stylist/dialog/interface/recipe/tab-panel';

export const createTabPanelState = (getProps: () => RecipeTabPanel, selected: () => boolean) => {
	const props = $derived(getProps());
	const isSelected = $derived.by(selected);
	const disabled = $derived(props.disabled ?? false);

	return {
		get isSelected() {
			return isSelected;
		},
		get disabled() {
			return disabled;
		}
	};
};

export default createTabPanelState;
