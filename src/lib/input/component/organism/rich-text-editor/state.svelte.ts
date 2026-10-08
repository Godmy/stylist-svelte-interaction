import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeRichTextEditor } from '$stylist/input/interface/recipe/rich-text-editor';

export const createRichTextEditorState = (getProps: () => RecipeRichTextEditor) => {
	const props = $derived(getProps());
	// SlotState
	let editorRef: HTMLDivElement | null = $state(null);
	let isFocused = $state(false);
	let showLinkInput = $state(false);
	let linkUrl = $state('');
	let content = $state(props.value ?? '');

	// Update local state when value prop changes
	$effect(() => {
		if (props.value !== undefined && content !== props.value) {
			content = props.value;
		}
	});

	function updateContent() {
		content = editorRef?.innerHTML ?? '';
		props.onValueInput?.(content);
		if (props.onInput) {
			props.onInput(content);
		}
	}

	function handleInput() {
		updateContent();
	}

	function handleChange() {
		props.onValueChange?.(content);
		if (props.onChange) {
			props.onChange(content);
		}
	}

	function formatText(command: string, value: string = '') {
		document.execCommand(command, false, value);
		editorRef?.focus();
		updateContent();
	}

	function insertLink() {
		if (linkUrl) {
			formatText('createLink', linkUrl);
			linkUrl = '';
			showLinkInput = false;
		}
	}

	function insertImage() {
		const url = prompt('Enter the image URL:');
		if (url) {
			formatText('insertImage', url);
		}
	}

	function toggleBlockquote() {
		formatText('formatBlock', 'blockquote');
	}

	function toggleHeading(level: number) {
		formatText('formatBlock', `h${level}`);
	}

	function toggleHorizontalRule() {
		formatText('insertHorizontalRule');
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		isFocused = false;
	}

	// Computed classes
	const rootClasses = $derived.by(() => ClassNamesManager.merge('rich-text-editor', props.class));

	const toolbarClasses = $derived.by(() =>
		ClassNamesManager.merge('rich-text-editor__toolbar', props.toolbarClass)
	);

	const editorClasses = $derived.by(() =>
		ClassNamesManager.merge(
			'rich-text-editor__editor',
			isFocused ? 'rich-text-editor__editor--focused' : '',
			props.editorClass
		)
	);

	const buttonClasses = $derived.by(() => 'rich-text-editor__btn');

	const dividerClasses = $derived.by(() => 'rich-text-editor__divider');

	const linkInputClasses = $derived.by(() => 'rich-text-editor__link-popover');

	const linkInputFieldClasses = $derived.by(() => 'rich-text-editor__link-input');

	const linkInputButtonClasses = $derived.by(() => 'rich-text-editor__link-button');

	const iconButtonClasses = $derived.by(() => 'rich-text-editor__icon');

	return {
		// SlotState getters
		get content() {
			return content;
		},
		get isFocused() {
			return isFocused;
		},
		get showLinkInput() {
			return showLinkInput;
		},
		get linkUrl() {
			return linkUrl;
		},
		get editorRef() {
			return editorRef;
		},
		set editorRef(value: HTMLDivElement | null) {
			editorRef = value;
			if (value && props.value && value.innerHTML !== props.value) {
				value.innerHTML = props.value;
			}
		},

		// Actions
		setLinkUrl(url: string) {
			linkUrl = url;
		},
		toggleLinkInput() {
			showLinkInput = !showLinkInput;
		},
		setShowLinkInput(value: boolean) {
			showLinkInput = value;
		},

		// Handlers
		handleInput,
		handleChange,
		formatText,
		insertLink,
		insertImage,
		toggleBlockquote,
		toggleHeading,
		toggleHorizontalRule,
		handleFocus,
		handleBlur,

		// Classes
		get rootClasses() {
			return rootClasses;
		},
		get toolbarClasses() {
			return toolbarClasses;
		},
		get editorClasses() {
			return editorClasses;
		},
		get buttonClasses() {
			return buttonClasses;
		},
		get dividerClasses() {
			return dividerClasses;
		},
		get linkInputClasses() {
			return linkInputClasses;
		},
		get linkInputFieldClasses() {
			return linkInputFieldClasses;
		},
		get linkInputButtonClasses() {
			return linkInputButtonClasses;
		},
		get iconButtonClasses() {
			return iconButtonClasses;
		}
	};
};

export default createRichTextEditorState;
