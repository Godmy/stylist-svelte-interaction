import type { RecipeChip } from '$stylist/control/interface/recipe/chip';
import type { TokenSize } from '$stylist/theme/type/alias/size';

export function createChipState(getProps: () => RecipeChip) {
	const props = $derived(getProps());
	const variant = $derived((props.variant ?? 'default') as string);
	const size = $derived((props.size ?? 'md') as TokenSize);
	const disabled = $derived(props.disabled ?? false);
	const closable = $derived(props.closable ?? false);
	const label = $derived(props.label);

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get closable() {
			return closable;
		},
		get label() {
			return label;
		},
		handleClose() {
			if (disabled) return;
			props.onClose?.();
		}
	};
}

export default createChipState;
