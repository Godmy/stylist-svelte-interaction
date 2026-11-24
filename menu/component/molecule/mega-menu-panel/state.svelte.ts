import type { RecipeMegaMenuPanel } from '$stylist/menu/interface/recipe/mega-menu-panel';
/** Reactive behavior of mega-menu-panel; props are read lazily when needed. */
export function createMegaMenuPanelComponentState(getProps: () => RecipeMegaMenuPanel) {
	const props = $derived(getProps());
	const columns = $derived(props.section.columns ?? []);
	const footerLinks = $derived(props.section.footerLinks ?? []);
	const restProps = $derived.by(() => {
		const {
			section: _section,
			compact: _compact,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
	return {
		get columns(): typeof columns {
			return columns;
		},
		get footerLinks(): typeof footerLinks {
			return footerLinks;
		},
		get restProps(): typeof restProps {
			return restProps;
		}
	};
}
export default createMegaMenuPanelComponentState;
