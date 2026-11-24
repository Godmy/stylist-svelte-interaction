import { siteMenuGroup } from '$stylist/menu/function/transform/site-menu-group';
import { siteMenuSearch } from '$stylist/menu/function/transform/site-menu-search';
import type { RecipeSiteMenu } from '$stylist/menu/interface/recipe/site-menu';
/** Reactive behavior of site-menu; props are read lazily when needed. */
export function createSiteMenuComponentState(
	getProps: () => Pick<RecipeSiteMenu, 'element' | 'items' | 'onItemSelect'> & {
		element: Exclude<RecipeSiteMenu['element'], undefined>;
	}
) {
	const props = $derived(getProps());
	let open = $state(false);
	let search = $state('');
	const groups = $derived(siteMenuGroup(siteMenuSearch(props['items'], search)));
	function choose(id: string) {
		open = false;
		props['onItemSelect']?.(id);
	}
	function closeOnEscape(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !open) return;
		open = false;
		props['element']?.querySelector('summary')?.focus();
	}
	function closeOnOutsideClick(event: MouseEvent) {
		if (props['element'] && !props['element'].contains(event.target as Node)) open = false;
	}
	return {
		get open(): typeof open {
			return open;
		},
		set open(__nextValue: typeof open) {
			open = __nextValue;
		},
		get search(): typeof search {
			return search;
		},
		set search(__nextValue: typeof search) {
			search = __nextValue;
		},
		get groups(): typeof groups {
			return groups;
		},
		get choose(): typeof choose {
			return choose;
		},
		get closeOnEscape(): typeof closeOnEscape {
			return closeOnEscape;
		},
		get closeOnOutsideClick(): typeof closeOnOutsideClick {
			return closeOnOutsideClick;
		}
	};
}
export default createSiteMenuComponentState;
