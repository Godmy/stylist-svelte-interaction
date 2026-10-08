import type { RecipeSelector } from '$stylist/control/interface/recipe/selector';

export function createSelectorState(getProps: () => RecipeSelector) {
	const props = $derived(getProps());
	const id = $derived(props.id);
	const label = $derived(props.label);
	const value = $derived(props.value ?? '');
	const options = $derived(props.options ?? []);
	const errors = $derived(props.errors ?? []);
	const required = $derived(props.required ?? false);
	const disabled = $derived(props.disabled ?? false);
	const placeholder = $derived(props.placeholder);
	const className = $derived(props.class ?? '');

	let open = $state(props.open ?? false);
	let highlightedIndex = $state(-1);

	const labelId = $derived(`${id}-label`);
	const triggerId = $derived(`${id}-trigger`);
	const nativeId = $derived(`${id}-native`);

	const hasError = $derived(errors.length > 0);
	const errorId = $derived(`${id}-error`);
	const selectedOption = $derived(options.find((option) => option.value === value));

	const containerClass = $derived(['c-selector', className].filter(Boolean).join(' '));
	const labelClass = 'c-selector__label';
	const fieldWrapperClass = 'c-selector__field';
	const selectButtonClass = $derived(
		[
			'c-selector__trigger',
			hasError ? 'c-selector__trigger--error' : '',
			disabled ? 'c-selector__trigger--disabled' : ''
		]
			.filter(Boolean)
			.join(' ')
	);
	const chevronClass = 'c-selector__chevron';
	const errorClass = 'c-selector__error';
	const valueClass = $derived(selectedOption ? 'c-selector__value' : 'c-selector__placeholder');

	function open_() {
		if (disabled || open) return;
		open = true;
		highlightedIndex = Math.max(
			options.findIndex((option) => option.value === value),
			0
		);
		props.onToggle?.();
	}

	function close() {
		if (!open) return;
		open = false;
		highlightedIndex = -1;
		props.onToggle?.();
	}

	function handleClick() {
		if (disabled) return;
		if (open) {
			close();
		} else {
			open_();
		}
	}

	function selectOption(option: { value: string; label: string }) {
		if (disabled) return;
		props.onSelect?.(option.value);
		props.onChange?.(option.value);
		close();
	}

	function optionClass(option: { value: string }, index: number) {
		return [
			'c-selector__option',
			option.value === value ? 'is-selected' : '',
			index === highlightedIndex ? 'is-highlighted' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (disabled) return;
		if (!open) {
			if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
				event.preventDefault();
				open_();
			}
			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			highlightedIndex = Math.min(highlightedIndex + 1, options.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlightedIndex = Math.max(highlightedIndex - 1, 0);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			const option = options[highlightedIndex];
			if (option) selectOption(option);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			close();
		}
	}

	function handleFocusOut(event: FocusEvent) {
		const related = event.relatedTarget as HTMLElement | null;
		const current = event.currentTarget as HTMLElement;
		if (!related || !current.contains(related)) {
			close();
		}
	}

	return {
		get id() {
			return id;
		},
		get label() {
			return label;
		},
		get value() {
			return value;
		},
		get options() {
			return options;
		},
		get errors() {
			return errors;
		},
		get required() {
			return required;
		},
		get disabled() {
			return disabled;
		},
		get placeholder() {
			return placeholder;
		},
		get className() {
			return className;
		},
		get open() {
			return open;
		},
		get highlightedIndex() {
			return highlightedIndex;
		},
		get labelId() {
			return labelId;
		},
		get triggerId() {
			return triggerId;
		},
		get nativeId() {
			return nativeId;
		},
		get hasError() {
			return hasError;
		},
		get errorId() {
			return errorId;
		},
		get selectedOption() {
			return selectedOption;
		},
		get containerClass() {
			return containerClass;
		},
		labelClass,
		fieldWrapperClass,
		get selectButtonClass() {
			return selectButtonClass;
		},
		chevronClass,
		errorClass,
		get valueClass() {
			return valueClass;
		},
		handleClick,
		selectOption,
		optionClass,
		handleTriggerKeydown,
		handleFocusOut,
		close
	};
}
