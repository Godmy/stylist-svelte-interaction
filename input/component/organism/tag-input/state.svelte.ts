import type { SlotTagInput as RecipeTagInput } from '$stylist/input/interface/slot/tag-input';

export const createTagInputState = (getProps: () => RecipeTagInput) => {
	const props = $derived(getProps());
	let currentTags = $state<string[]>([...(props.tags ?? [])]);
	let inputText = $state('');

	function emit() {
		props.onInput?.([...currentTags]);
		props.onChange?.([...currentTags]);
	}

	function addTag(raw: string) {
		const tag = raw.trim();
		if (
			!tag ||
			currentTags.includes(tag) ||
			!(props.validator ?? (() => true))(tag) ||
			((props.maxTags ?? 0) > 0 && currentTags.length >= (props.maxTags ?? 0))
		) {
			return;
		}

		currentTags = [...currentTags, tag];
		inputText = '';
		emit();
	}

	function removeTag(index: number) {
		if (props.disabled) return;
		currentTags = currentTags.filter((_, i) => i !== index);
		emit();
	}

	function handleInput(event: Event) {
		inputText = (event.target as HTMLInputElement).value;
		const delimiter = props.delimiter ?? ',';
		if (inputText.includes(delimiter)) {
			const parts = inputText.split(delimiter);
			for (let i = 0; i < parts.length - 1; i += 1) addTag(parts[i]);
			inputText = parts[parts.length - 1];
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		const delimiter = props.delimiter ?? ',';
		if (event.key === 'Enter' || event.key === delimiter) {
			event.preventDefault();
			addTag(inputText);
		}
		if (event.key === 'Backspace' && !inputText && currentTags.length > 0) {
			removeTag(currentTags.length - 1);
		}
	}

	return {
		get currentTags() {
			return currentTags;
		},
		get inputText() {
			return inputText;
		},
		set inputText(value: string) {
			inputText = value;
		},
		get placeholder() {
			return props.placeholder ?? 'Enter tags...';
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get className() {
			return props.class ?? '';
		},
		get inputClass() {
			return props.inputClass ?? '';
		},
		get tagClass() {
			return props.tagClass ?? '';
		},
		get removeButtonClass() {
			return props.removeButtonClass ?? '';
		},
		emit,
		addTag,
		removeTag,
		handleInput,
		handleKeyDown
	};
};
