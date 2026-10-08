import type { RecipeTabList } from '$stylist/dialog/interface/recipe/tab-list';

export const createTabListState = (getProps: () => RecipeTabList) => {
	const props = $derived(getProps());
	const disabled = $derived(props.disabled ?? false);

	return {
		get disabled() {
			return disabled;
		}
	};
};

export default createTabListState;
