import type { RecipeGeneralToolbar } from '$stylist/dialog/interface/recipe/general-toolbar';

function getButtonSizeForToolbar(compact: boolean): 'sm' | 'md' {
	return compact ? 'sm' : 'md';
}

export function createGeneralToolbarState(getProps: () => RecipeGeneralToolbar) {
	const props = $derived(getProps());
	const buttonSize = $derived(getButtonSizeForToolbar(props.compact ?? false));

	return {
		get buttonSize() {
			return buttonSize;
		},
		get showButtons() {
			return true;
		}
	};
}

export default createGeneralToolbarState;
