import type { RecipeNavigationDrawer } from '$stylist/navigation/interface/recipe/navigation-drawer';
import type { ContractNavigationDrawerSection } from '$stylist/navigation/interface/contract/navigation-drawer-section';
/** Reactive behavior of navigation-drawer; props are read lazily when needed. */
export function createNavigationDrawerComponentState(
	getProps: () => Pick<
		RecipeNavigationDrawer,
		'element' | 'sections' | 'mode' | 'open' | 'isActive' | 'onClose' | 'openSection'
	> & {
		element: Exclude<RecipeNavigationDrawer['element'], undefined>;
		mode: Exclude<RecipeNavigationDrawer['mode'], undefined>;
		open: Exclude<RecipeNavigationDrawer['open'], undefined>;
	}
) {
	const props = $derived(getProps());
	const visible = $derived(props['mode'] === 'permanent' || props['open']);
	const sectionKey = (section: (typeof props)['sections'][number], index: number) =>
		section.label ?? `section-${index}`;
	function sectionActive(section: ContractNavigationDrawerSection): boolean {
		return (
			section.destinations.some((destination) => props['isActive']?.(destination.id)) ||
			(section.sections?.some(sectionActive) ?? false)
		);
	}
	// The open accordion section follows `openSection`, else the active destination.
	const activeSection = $derived.by(() => {
		if (props['openSection']) return props['openSection'];
		const index = props['sections'].findIndex(sectionActive);
		return index === -1 ? undefined : sectionKey(props['sections'][index], index);
	});
	function close() {
		if (props['onClose']) props['onClose']();
		else props['open'] = false;
	}
	$effect(() => {
		if (props['mode'] !== 'modal' || !props['open'] || !props['element']) return;
		const previous = document.activeElement as HTMLElement | null;
		const target =
			props['element'].querySelector<HTMLElement>('[aria-current="page"]') ??
			props['element'].querySelector<HTMLElement>('button:not(:disabled)');
		target?.focus();
		return () => previous?.focus?.();
	});
	return {
		get visible(): typeof visible {
			return visible;
		},
		get sectionKey(): typeof sectionKey {
			return sectionKey;
		},
		get sectionActive(): typeof sectionActive {
			return sectionActive;
		},
		get activeSection(): typeof activeSection {
			return activeSection;
		},
		get close(): typeof close {
			return close;
		}
	};
}
export default createNavigationDrawerComponentState;
