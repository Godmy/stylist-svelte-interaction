import type { RecipeMenuItem } from '$stylist/menu/interface/recipe/menu-item';

export function createMenuItemState(getProps: () => RecipeMenuItem) {
	const props = $derived(getProps());
	const active = $derived(props.active ?? false);
	const disabled = $derived(props.disabled ?? false);
	const href = $derived(props.href);
	const icon = $derived(props.icon);
	const external = $derived(props.external ?? false);
	const children = $derived(props.children);

	function handleClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault();
			return;
		}

		props.onValueInput?.(event);
		props.onValueChange?.(event);
		props.onClick?.(event);
	}

	return {
		get active() {
			return active;
		},
		get disabled() {
			return disabled;
		},
		get href() {
			return href;
		},
		get icon() {
			return icon;
		},
		get external() {
			return external;
		},
		get children() {
			return children;
		},
		handleClick
	};
}
