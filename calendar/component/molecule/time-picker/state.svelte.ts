import type { RecipeTimePicker } from '$stylist/calendar/interface/recipe/time-picker';

export const createTimePickerState = (getProps: () => RecipeTimePicker) => {
	const props = $derived(getProps());
	let selectedTime = $state(props.value ?? '');

	$effect(() => {
		if (props.value !== undefined) selectedTime = props.value;
	});

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedTime = target.value;
		props.onChange?.(selectedTime);
	}

	return {
		get selectedTime() {
			return selectedTime;
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get className() {
			return props.class ?? '';
		},
		get step() {
			return props.step ?? 900;
		},
		handleChange
	};
};

export default createTimePickerState;
