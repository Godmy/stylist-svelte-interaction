<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import RichTextFormatToolbar from '$stylist/input/component/molecule/rich-text-format-toolbar/index.svelte';
	import type { RecipeRichTextEditor } from '$stylist/input/interface/recipe/rich-text-editor';
	import createRichTextEditorState from './state.svelte';

	let props: RecipeRichTextEditor & HTMLAttributes<HTMLDivElement> = $props();
	const state = createRichTextEditorState(() => props);
</script>

<div class={state.rootClasses} {...props}>
	{#if props.showToolbar ?? true}
		<RichTextFormatToolbar
			class={state.toolbarClasses}
			buttonClass={state.buttonClasses}
			dividerClass={state.dividerClasses}
			iconClass={state.iconButtonClasses}
			showLinkInput={state.showLinkInput}
			linkUrl={state.linkUrl}
			linkInputClass={state.linkInputClasses}
			linkInputFieldClass={state.linkInputFieldClasses}
			linkInputButtonClass={state.linkInputButtonClasses}
			onFormatText={state.formatText}
			onToggleHeading={state.toggleHeading}
			onToggleBlockquote={state.toggleBlockquote}
			onToggleHorizontalRule={state.toggleHorizontalRule}
			onToggleLinkInput={state.toggleLinkInput}
			onSetShowLinkInput={state.setShowLinkInput}
			onSetLinkUrl={state.setLinkUrl}
			onInsertLink={state.insertLink}
			onInsertImage={state.insertImage}
		/>
	{/if}

	<div
		contenteditable="true"
		role="textbox"
		tabindex="0"
		aria-multiline="true"
		aria-label={props.placeholder ?? 'Rich text editor'}
		class={state.editorClasses}
		bind:this={state.editorRef}
		oninput={state.handleInput}
		onblur={() => {
			state.handleBlur();
			state.handleChange();
		}}
		onfocus={state.handleFocus}
	></div>
</div>

<style>
	.rich-text-editor {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-large, 0.5rem);
		overflow: hidden;
	}

	.rich-text-editor__toolbar {
		border-block-end: 1px solid var(--color-border-primary);
		background-color: var(--color-background-secondary);
	}

	.rich-text-editor__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
	}

	.rich-text-editor__btn:hover {
		background-color: var(--color-background-tertiary);
	}

	.rich-text-editor__divider {
		width: 1px;
		height: 1.5rem;
		background-color: var(--color-background-tertiary);
		margin-inline: 0.25rem;
	}

	.rich-text-editor__icon {
		width: 1rem;
		height: 1rem;
	}

	.rich-text-editor__editor {
		padding: 0.75rem 1rem;
		min-height: 12.5rem;
		outline: none;
	}

	.rich-text-editor__editor--focused {
		background-color: var(--color-background-primary);
	}

	.rich-text-editor__link-popover {
		position: absolute;
		z-index: var(--z-index-docked, 10);
		inset-block-start: 100%;
		inset-inline-start: 0.5rem;
		margin-block-start: 0.25rem;
		display: flex;
		width: 16rem;
		padding: 0.75rem;
		gap: 0.5rem;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.rich-text-editor__link-input {
		flex: 1;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-start-start-radius: var(--border-radius-sm, 0.25rem);
		border-end-start-radius: var(--border-radius-sm, 0.25rem);
		font-size: var(--text-size-sm, 0.875rem);
	}

	.rich-text-editor__link-button {
		padding: 0.25rem 0.75rem;
		background-color: var(--color-primary-500);
		color: var(--color-text-inverse);
		border: none;
		border-start-end-radius: var(--border-radius-sm, 0.25rem);
		border-end-end-radius: var(--border-radius-sm, 0.25rem);
		font-size: var(--text-size-sm, 0.875rem);
		cursor: pointer;
	}
</style>
