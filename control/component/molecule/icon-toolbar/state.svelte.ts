import type { RecipeIconToolbar } from '$stylist/control/interface/recipe/icon-toolbar';
/** Reactive behavior of icon-toolbar; props are read lazily when needed. */
export function createIconToolbarComponentState(
	getProps: () => Pick<RecipeIconToolbar, 'items' | 'availableItems'>
) {
	const props = $derived(getProps());
	const availableItems = $derived(props['availableItems']);
	const visibleItems = $derived(
		availableItems
			? props['items'].filter((item) => availableItems.includes(item.name))
			: props['items']
	);
	return {
		get visibleItems(): typeof visibleItems {
			return visibleItems;
		}
	};
}
export default createIconToolbarComponentState;
