import type { RecipeMegaMenuTrigger } from '$stylist/menu/interface/recipe/mega-menu-trigger';

/** Reactive behavior of mega-menu-trigger; props are read lazily when needed. */
export function createMegaMenuTriggerComponentState(getProps: () => RecipeMegaMenuTrigger) {
	const props = $derived(getProps());
	const restProps = $derived.by(() => {
		const {
			label: _label,
			open: _open,
			active: _active,
			controls: _controls,
			class: _class,
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
export default createMegaMenuTriggerComponentState;
