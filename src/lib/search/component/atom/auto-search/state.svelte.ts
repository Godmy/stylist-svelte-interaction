import type { SlotAutoSearch as AutoSearchProps } from '$stylist/search/interface/slot/auto-search';

export function createAutoSearchState(props: AutoSearchProps) {
	let localValue = $state(props.value ?? '');
	const rootClass = $derived(('auto-search' + (props.class ? ` ${props.class}` : '')).trim());
	const inputClass = $derived('auto-search__input');
	const iconWrapperClass = $derived('auto-search__icon-wrapper');

	$effect(() => {
		localValue = props.value ?? '';
	});

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		localValue = target.value;
		props.onValueInput?.(localValue);
		props.onValueChange?.(localValue);
		props.onInput?.(localValue);
	};

	return {
		get localValue() {
			return localValue;
		},
		get rootClass() {
			return rootClass;
		},
		get inputClass() {
			return inputClass;
		},
		get iconWrapperClass() {
			return iconWrapperClass;
		},
		handleInput
	};
}

export default createAutoSearchState;
