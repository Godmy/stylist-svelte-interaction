import type { RecipeBurgerMenu } from '$stylist/menu/interface/recipe/burger-menu';

export function createBurgerMenuState(getProps: () => RecipeBurgerMenu) {
	const props = $derived(getProps());
	const open = $derived(props.open ?? false);
	const ariaLabel = $derived(props['aria-label'] ?? (open ? 'Close menu' : 'Open menu'));
	const restProps = $derived.by(() => {
		const {
			class: _class,
			open: _open,
			size: _size,
			color: _color,
			activeColor: _activeColor,
			onValueInput: _onValueInput,
			onValueChange: _onValueChange,
			onclick: _onclick,
			...rest
		} = props;

		return rest;
	});

	function toggle(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		props.onValueInput?.(e);
		props.onValueChange?.(e);
		props.onclick?.(e);
	}

	return {
		get open() {
			return open;
		},
		get ariaLabel() {
			return ariaLabel;
		},
		get restProps() {
			return restProps;
		},
		toggle
	};
}

