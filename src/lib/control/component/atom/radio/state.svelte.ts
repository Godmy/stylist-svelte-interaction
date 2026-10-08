import type { RecipeRadio } from '$stylist/control/interface/recipe/radio';

export const createRadioState = (getProps: () => RecipeRadio) => {
	const props = $derived(getProps());
	const checked = $derived(props.checked ?? false);
	const disabled = $derived(props.disabled ?? false);
	const size = $derived(props.size ?? 'md');
	const ariaLabel = $derived(props['aria-label'] ?? props.label);
	const restProps = $derived.by(() => {
		const {
			id: _id,
			name: _name,
			value: _value,
			checked: _checked,
			disabled: _disabled,
			label: _label,
			required: _required,
			class: _class,
			size: _size,
			...rest
		} = props;

		return rest;
	});

	return {
		get id() {
			return props.id;
		},
		get name() {
			return props.name;
		},
		get value() {
			return props.value;
		},
		get checked() {
			return checked;
		},
		get disabled() {
			return disabled;
		},
		get label() {
			return props.label;
		},
		get required() {
			return props.required;
		},
		get size() {
			return size;
		},
		get ariaLabel() {
			return ariaLabel;
		},
		get restProps() {
			return restProps;
		},
		handleChange(event: Event) {
			const target = event.target as HTMLInputElement;
			if (target.checked && props.onchange) {
				(props.onchange as (e: Event) => void)(event);
			}
		}
	};
};

export default createRadioState;
