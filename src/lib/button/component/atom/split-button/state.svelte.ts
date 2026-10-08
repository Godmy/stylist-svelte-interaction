import { createButtonState as createButtonStateImpl } from '$stylist/button/function/state/button/index.svelte';
import type { RecipeSplitButton } from '$stylist/button/interface/recipe/split-button';

export function createSplitButtonState(getProps: () => RecipeSplitButton) {
	const props = $derived(getProps());
	const buttonState = createButtonStateImpl(props as Parameters<typeof createButtonStateImpl>[0]);
	let isOpen = $state(false);
	const buttonId = `split-button-${Math.random().toString(36).slice(2, 11)}`;

	const variant = $derived(buttonState.variant);
	const size = $derived(buttonState.size);

	$effect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: Event) => {
			if (!event.composedPath().some((el) => el instanceof Element && el.id === buttonId)) {
				isOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function toggleDropdown() {
		if (!props.disabled) {
			isOpen = !isOpen;
		}
	}

	function closeDropdown() {
		isOpen = false;
	}

	function handleItemClick(onClick: () => void) {
		onClick();
		closeDropdown();
	}

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return buttonState.disabled;
		},
		get loading() {
			return buttonState.loading;
		},
		get isDisabled() {
			return buttonState.isDisabled;
		},
		get block() {
			return buttonState.block;
		},
		get loadingLabel() {
			return buttonState.loadingLabel;
		},
		get attrs() {
			return buttonState.attrs;
		},
		get ariaLabel() {
			return buttonState.ariaLabel;
		},
		get isOpen() {
			return isOpen;
		},
		buttonId,
		toggleDropdown,
		closeDropdown,
		handleItemClick
	};
}

export default createSplitButtonState;
