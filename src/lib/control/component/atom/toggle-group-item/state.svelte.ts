import type { ToggleGroupItemStateProps } from '$stylist/control/type/alias/toggle-group-item-state-props';

export function createToggleGroupItemState(props: ToggleGroupItemStateProps) {
	const disabled = $derived(props.disabled ?? props.groupDisabled ?? false);
	const groupValue = $derived(props.groupValue ?? null);

	const isActive = $derived(
		Array.isArray(groupValue) ? groupValue.includes(props.value) : groupValue === props.value
	);

	return {
		get disabled() {
			return disabled;
		},
		get isActive() {
			return isActive;
		},
		get value() {
			return props.value;
		},
		handleClick() {
			if (!disabled) {
				props.updateValue?.(props.value);
			}
		}
	};
}

export default createToggleGroupItemState;
