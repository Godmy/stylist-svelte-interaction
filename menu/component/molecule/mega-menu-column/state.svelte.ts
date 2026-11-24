import type { RecipeMegaMenuColumn } from '$stylist/menu/interface/recipe/mega-menu-column';

/** Reactive behavior of mega-menu-column; props are read lazily when needed. */
export function createMegaMenuColumnComponentState(getProps: () => RecipeMegaMenuColumn) {
	const props = $derived(getProps());
	const restProps = $derived.by(() => {
		const {
			title: _title,
			links: _links,
			iconLinks: _iconLinks,
			moreLink: _moreLink,
			compact: _compact,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
	return {
		get restProps(): typeof restProps {
			return restProps;
		}
	};
}
export default createMegaMenuColumnComponentState;
