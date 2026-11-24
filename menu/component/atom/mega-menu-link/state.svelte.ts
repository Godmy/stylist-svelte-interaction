import type { RecipeMegaMenuLink } from '$stylist/menu/interface/recipe/mega-menu-link';

/** Reactive behavior of mega-menu-link; props are read lazily when needed. */
export function createMegaMenuLinkComponentState(getProps: () => RecipeMegaMenuLink) {
	const props = $derived(getProps());
	const restProps = $derived.by(() => {
		const {
			label: _label,
			href: _href,
			description: _description,
			icon: _icon,
			iconSvg: _iconSvg,
			iconBackground: _iconBackground,
			iconColor: _iconColor,
			iconOnly: _iconOnly,
			badge: _badge,
			active: _active,
			external: _external,
			compact: _compact,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
	function handleClick(event: MouseEvent) {
		props.onNavigate?.(event);
	}
	return {
		get restProps(): typeof restProps {
			return restProps;
		},
		get handleClick(): typeof handleClick {
			return handleClick;
		}
	};
}
export default createMegaMenuLinkComponentState;
