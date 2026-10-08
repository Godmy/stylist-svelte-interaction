import type { RecipeSwitch } from '$stylist/control/interface/recipe/switch';

export function createSwitchState(props: RecipeSwitch, checked: boolean) {
	const id = $derived(props.id);
	const label = $derived(props.label ?? '');
	const description = $derived(props.description ?? '');
	const size = $derived(props.size ?? 'md');
	const disabled = $derived(props.disabled ?? false);
	const required = $derived(props.required ?? false);
	const name = $derived(props.name);
	const ariaLabel = $derived(props.ariaLabel ?? props['aria-label'] ?? props.label);
	const labelPosition = $derived(props.labelPosition ?? 'right');
	const generatedId = $derived(id || `switch-${Math.random().toString(36).slice(2, 11)}`);
	const descriptionId = $derived(description ? `${generatedId}-description` : undefined);
	const restProps = $derived.by(() => {
		const {
			id: _id,
			label: _label,
			description: _description,
			size: _size,
			disabled: _disabled,
			checked: _checked,
			required: _required,
			class: _class,
			ariaLabel: _ariaLabel,
			name: _name,
			labelPosition: _labelPosition,
			onchange: _onchange,
			oninput: _oninput,
			'aria-label': _ariaLabelAttr,
			...rest
		} = props;

		return rest;
	});

	return {
		get label() {
			return label;
		},
		get description() {
			return description;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get checked() {
			return checked;
		},
		get required() {
			return required;
		},
		get generatedId() {
			return generatedId;
		},
		get descriptionId() {
			return descriptionId;
		},
		get name() {
			return name;
		},
		get ariaLabel() {
			return ariaLabel;
		},
		get labelPosition() {
			return labelPosition;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createSwitchState;
