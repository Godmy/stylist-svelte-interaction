import { STYLIST_TAB_DEFAULT_ITEMS } from '$stylist/dialog/const/record/stylist-tab-default-items';
import type { StylistTabItem } from '$stylist/dialog/interface/slot/stylist-tab-item';
import type { RecipeStylistTab } from '$stylist/dialog/interface/recipe/stylist-tab';

export function createStylistTabState(props: RecipeStylistTab) {
	let activeId = $state(props.selectedId ?? 'architecture');

	$effect(() => {
		activeId = props.selectedId ?? 'architecture';
	});

	const className = $derived(props.class ?? '');
	const items = $derived(props.items ?? STYLIST_TAB_DEFAULT_ITEMS);

	return {
		get activeId() {
			return activeId;
		},
		get className() {
			return className;
		},
		get items() {
			return items;
		},
		handleSelect(item: StylistTabItem) {
			activeId = item.id;
			props.onSelect?.(item);
		}
	};
}

export default createStylistTabState;
