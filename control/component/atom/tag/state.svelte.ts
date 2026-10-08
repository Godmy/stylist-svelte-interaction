import type { RecipeTag } from '$stylist/control/interface/recipe/tag';
import type { TokenSize } from '$stylist/theme/type/alias/size';

export const createTagState = (getProps: () => RecipeTag) => {
	const props = $derived(getProps());
	const variant = $derived((props.variant ?? 'default') as string);
	const size = $derived((props.size ?? 'md') as TokenSize);
	const text = $derived(props.text ?? props.label);
	const disabled = $derived(props.disabled ?? false);
	const closable = $derived(props.closable ?? false);

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get text() {
			return text;
		},
		get disabled() {
			return disabled;
		},
		get closable() {
			return closable;
		},
		handleClose() {
			if (disabled) return;
			props.onClose?.();
		}
	};
};

export default createTagState;
