import type { RecipeToolButton } from '$stylist/button/interface/recipe/tool-button';

export function createToolButtonState(getProps: () => RecipeToolButton) {
	const props = $derived(getProps());
	const active = $derived(props.active ?? false);
	const tool = $derived(props.tool ?? 'select');
	const icon = $derived(props.icon ?? '↖');
	const label = $derived(props.label);
	const onClick = $derived(props.onClick);

	const handleClick = () => {
		onClick?.(tool);
	};

	return {
		get active() {
			return active;
		},
		get tool() {
			return tool;
		},
		get icon() {
			return icon;
		},
		get label() {
			return label;
		},
		get onClick() {
			return onClick;
		},
		handleClick
	};
}

export default createToolButtonState;
