import type { RecipeTick } from '$stylist/control/interface/recipe/tick';

// Определение состояния для Slider Tick
export function createSliderTickState(getProps: () => RecipeTick) {
	const props = $derived(getProps());
	const value = $derived(props.value ?? 0);
	const position = $derived(props.position ?? 0);
	const active = $derived(props.active ?? false);
	const label = $derived(props.label);

	return {
		get value() {
			return value;
		},
		get position() {
			return position;
		},
		get active() {
			return active;
		},
		get label() {
			return label;
		}
	};
}

export default createSliderTickState;
