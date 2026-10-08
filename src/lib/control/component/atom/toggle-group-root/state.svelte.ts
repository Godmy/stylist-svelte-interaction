import type { RecipeToggleGroupRoot as RecipeToggleGroupRoot } from '$stylist/control/interface/recipe/toggle-group-root';

export const createToggleGroupRootState = (getProps: () => RecipeToggleGroupRoot) => {
	const props = $derived(getProps());
	const type = $derived(props.type ?? 'single');
	const disabled = $derived(props.disabled ?? false);
	let internalValue = $state<string | string[] | null>(props.value ?? null);

	$effect(() => {
		internalValue = props.value ?? null;
	});

	return {
		get type() {
			return type;
		},
		get disabled() {
			return disabled;
		},
		get value() {
			return internalValue;
		},
		updateValue(newValue: string) {
			let newValueState: string | string[] | null = internalValue;
			if (type === 'single') {
				newValueState = internalValue === newValue ? null : newValue;
			} else if (Array.isArray(internalValue)) {
				newValueState = internalValue.includes(newValue)
					? internalValue.filter((value) => value !== newValue)
					: [...internalValue, newValue];
			} else {
				newValueState = [newValue];
			}

			internalValue = newValueState;
			const event = new CustomEvent('valueChange', { detail: { value: newValueState } });
			props.onValueChange?.(event);
		}
	};
};

export default createToggleGroupRootState;
