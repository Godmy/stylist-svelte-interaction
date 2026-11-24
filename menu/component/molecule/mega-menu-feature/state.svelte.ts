import type { RecipeMegaMenuFeature } from '$stylist/menu/interface/recipe/mega-menu-feature';

/** Reactive behavior of mega-menu-feature; props are read lazily when needed. */
export function createMegaMenuFeatureComponentState(getProps: () => RecipeMegaMenuFeature) {
	const props = $derived(getProps());
	const restProps = $derived.by(() => {
		const {
			eyebrow: _eyebrow,
			title: _title,
			text: _text,
			href: _href,
			ctaLabel: _ctaLabel,
			image: _image,
			imageAlt: _imageAlt,
			icon: _icon,
			content: _content,
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
export default createMegaMenuFeatureComponentState;
