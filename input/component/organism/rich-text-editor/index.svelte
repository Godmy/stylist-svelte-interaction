<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import RichTextFormatToolbar from '$stylist/input/component/molecule/rich-text-format-toolbar/index.svelte';
	import type { RecipeRichTextEditor } from '$stylist/input/interface/recipe/rich-text-editor';
	import createRichTextEditorState from '$stylist/input/component/organism/rich-text-editor/state.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	import HtmlStyle from '$stylist/html/component/atom/style/index.svelte';
	import { serializeHtmlStylesheet } from '$stylist/html/function/serialize/html-stylesheet';

	let { value = $bindable(''), ...props }: RecipeRichTextEditor & HTMLAttributes<HTMLDivElement> =
		$props();
	const nativeProps = $derived(
		resolveInputAttributes(props, ['skin', 'placeholder', 'aria-label'])
	);
	const stylesheet = serializeHtmlStylesheet({ scope: '[data-input-editor-skin]' });
	const state = createRichTextEditorState(() => ({
		...props,
		value,
		onValueInput: (next) => {
			value = next;
			props.onValueInput?.(next);
		}
	}));
</script>

<svelte:head
	>{#if props.skin}<HtmlStyle text={stylesheet} />{/if}</svelte:head
>

{#snippet toolbar()}
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
{/snippet}

<div {...nativeProps} class={state.rootClasses}>
	{#if (props.showToolbar ?? true) && props.toolbarPosition !== 'bottom'}{@render toolbar()}{/if}

	<div
		contenteditable="true"
		role="textbox"
		tabindex="0"
		aria-multiline="true"
		aria-label={props['aria-label'] ?? props.placeholder ?? 'Rich text editor'}
		data-input-editor-skin={props.skin ? '' : undefined}
		class={state.editorClasses}
		bind:this={state.editorRef}
		bind:innerHTML={state.content}
		oninput={state.handleInput}
		onblur={() => {
			state.handleBlur();
			state.handleChange();
		}}
		onfocus={state.handleFocus}
	></div>
	{#if (props.showToolbar ?? true) && props.toolbarPosition === 'bottom'}{@render toolbar()}{/if}
</div>

<style>
	.rich-text-editor {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-2, 0.5rem);
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
	}
	.rich-text-editor__editor:focus-visible {
		outline: var(--focus-width, 2px) solid var(--color-primary-500, Highlight);
		outline-offset: -2px;
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
		border-radius: var(--radius-1-5, 0.375rem);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.rich-text-editor__link-input {
		flex: 1;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-start-start-radius: var(--radius-1, 0.25rem);
		border-end-start-radius: var(--radius-1, 0.25rem);
		font-size: var(--font-size-3-5, 0.875rem);
	}

	.rich-text-editor__link-button {
		padding: 0.25rem 0.75rem;
		background-color: var(--color-primary-500);
		color: var(--color-text-inverse);
		border: none;
		border-start-end-radius: var(--radius-1, 0.25rem);
		border-end-end-radius: var(--radius-1, 0.25rem);
		font-size: var(--font-size-3-5, 0.875rem);
		cursor: pointer;
	}
</style>
