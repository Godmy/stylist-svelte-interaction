<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeRichTextFormatToolbar } from '$stylist/input/interface/recipe/rich-text-format-toolbar';

	const textStyles = [
		{ label: 'Normal', value: 'p' },
		{ label: 'Title', value: 'h1' },
		{ label: 'Subtitle', value: 'h2' },
		{ label: 'Heading 3', value: 'h3' },
		{ label: 'Quote', value: 'blockquote' }
	];

	const fontFamilies = ['Arial', 'Georgia', 'Times New Roman', 'Verdana', 'Courier New'];

	const fontSizes = [
		{ label: '10', value: '2' },
		{ label: '12', value: '3' },
		{ label: '14', value: '4' },
		{ label: '18', value: '5' },
		{ label: '24', value: '6' },
		{ label: '32', value: '7' }
	];

	const textColors = [
		{ label: 'Text', value: '#111827' },
		{ label: 'Gray', value: '#4b5563' },
		{ label: 'Red', value: '#dc2626' },
		{ label: 'Blue', value: '#2563eb' },
		{ label: 'Green', value: '#16a34a' }
	];

	const highlightColors = [
		{ label: 'Highlight', value: '#fef3c7' },
		{ label: 'None', value: 'transparent' },
		{ label: 'Blue', value: '#dbeafe' },
		{ label: 'Green', value: '#dcfce7' },
		{ label: 'Pink', value: '#fce7f3' }
	];

	let {
		class: className,
		buttonClass,
		dividerClass,
		iconClass,
		showLinkInput,
		linkUrl,
		linkInputClass,
		linkInputFieldClass,
		linkInputButtonClass,
		onFormatText,
		onToggleHeading,
		onToggleBlockquote,
		onToggleHorizontalRule,
		onToggleLinkInput,
		onSetShowLinkInput,
		onSetLinkUrl,
		onInsertLink,
		onInsertImage,
		...restProps
	}: RecipeRichTextFormatToolbar = $props();

	function formatStyle(value: string) {
		if (value === 'blockquote') {
			onToggleBlockquote?.();
			return;
		}

		if (value.startsWith('h')) {
			onToggleHeading?.(Number(value.slice(1)));
			return;
		}

		onFormatText?.('formatBlock', value);
	}
</script>

<div class={`${className ? `${className} ` : ''}rich-text-format-toolbar`} {...restProps}>
	<div class="rich-text-format-toolbar__group">
		<select
			class="rich-text-format-toolbar__select rich-text-format-toolbar__select--style"
			aria-label="Text style"
			onchange={(event) => formatStyle((event.target as HTMLSelectElement).value)}
		>
			{#each textStyles as style}
				<option value={style.value}>{style.label}</option>
			{/each}
		</select>

		<select
			class="rich-text-format-toolbar__select"
			aria-label="Font family"
			onchange={(event) => onFormatText?.('fontName', (event.target as HTMLSelectElement).value)}
		>
			{#each fontFamilies as family}
				<option value={family}>{family}</option>
			{/each}
		</select>

		<select
			class="rich-text-format-toolbar__select rich-text-format-toolbar__select--size"
			aria-label="Font size"
			onchange={(event) => onFormatText?.('fontSize', (event.target as HTMLSelectElement).value)}
		>
			{#each fontSizes as size}
				<option value={size.value}>{size.label}</option>
			{/each}
		</select>
	</div>

	<div class={`${dividerClass ? `${dividerClass} ` : ''}rich-text-format-toolbar__divider`}></div>

	<div class="rich-text-format-toolbar__group" aria-label="Inline formatting">
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('bold')}
			title="Bold"
		>
			<BaseIcon
				name="bold"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('italic')}
			title="Italic"
		>
			<BaseIcon
				name="italic"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('underline')}
			title="Underline"
		>
			<BaseIcon
				name="underline"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
	</div>

	<div class={`${dividerClass ? `${dividerClass} ` : ''}rich-text-format-toolbar__divider`}></div>

	<div class="rich-text-format-toolbar__group">
		<select
			class="rich-text-format-toolbar__select rich-text-format-toolbar__select--color"
			aria-label="Text color"
			onchange={(event) => onFormatText?.('foreColor', (event.target as HTMLSelectElement).value)}
		>
			{#each textColors as color}
				<option value={color.value}>{color.label}</option>
			{/each}
		</select>

		<select
			class="rich-text-format-toolbar__select rich-text-format-toolbar__select--color"
			aria-label="Highlight color"
			onchange={(event) => onFormatText?.('hiliteColor', (event.target as HTMLSelectElement).value)}
		>
			{#each highlightColors as color}
				<option value={color.value}>{color.label}</option>
			{/each}
		</select>
	</div>

	<div class={`${dividerClass ? `${dividerClass} ` : ''}rich-text-format-toolbar__divider`}></div>

	<div class="rich-text-format-toolbar__group" aria-label="Paragraph alignment">
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('justifyLeft')}
			title="Align left"
		>
			<BaseIcon
				name="align-left"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('justifyCenter')}
			title="Align center"
		>
			<BaseIcon
				name="align-center"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('justifyRight')}
			title="Align right"
		>
			<BaseIcon
				name="align-right"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
	</div>

	<div class={`${dividerClass ? `${dividerClass} ` : ''}rich-text-format-toolbar__divider`}></div>

	<div class="rich-text-format-toolbar__group" aria-label="Insert">
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('insertUnorderedList')}
			title="Bullet list"
		>
			<BaseIcon
				name="list"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onFormatText?.('insertOrderedList')}
			title="Numbered list"
		>
			<BaseIcon
				name="list-ordered"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onToggleHorizontalRule?.()}
			title="Horizontal rule"
		>
			<BaseIcon
				name="divider"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onToggleLinkInput?.()}
			title="Link"
		>
			<BaseIcon
				name="link"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
		<button
			type="button"
			class={`${buttonClass ? `${buttonClass} ` : ''}rich-text-format-toolbar__button`}
			onclick={() => onInsertImage?.()}
			title="Image"
		>
			<BaseIcon
				name="image"
				class={`${iconClass ? `${iconClass} ` : ''}rich-text-format-toolbar__icon`}
			/>
		</button>
	</div>

	{#if showLinkInput}
		<div
			class={`${linkInputClass ? `${linkInputClass} ` : ''}rich-text-format-toolbar__link-popover`}
		>
			<input
				type="text"
				class={`${linkInputFieldClass ? `${linkInputFieldClass} ` : ''}rich-text-format-toolbar__link-input`}
				placeholder="https://example.com"
				value={linkUrl ?? ''}
				oninput={(event) => onSetLinkUrl?.((event.target as HTMLInputElement).value)}
				onkeydown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						onInsertLink?.();
					} else if (event.key === 'Escape') {
						onSetShowLinkInput?.(false);
					}
				}}
			/>
			<button
				type="button"
				class={`${linkInputButtonClass ? `${linkInputButtonClass} ` : ''}rich-text-format-toolbar__link-button`}
				onclick={() => onInsertLink?.()}
			>
				Insert
			</button>
		</div>
	{/if}
</div>

<style>
	.rich-text-format-toolbar {
		position: relative;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0.5rem;
		border-block-end: 1px solid var(--color-border-primary);
		background-color: var(--color-background-secondary);
	}

	.rich-text-format-toolbar__group {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		min-width: 0;
	}

	.rich-text-format-toolbar__select {
		min-height: 2rem;
		max-width: 10rem;
		padding: 0.25rem 1.75rem 0.25rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-sm, 0.25rem);
		background-color: var(--color-background-primary);
		color: var(--color-text-primary);
		font-size: var(--text-size-sm, 0.875rem);
	}

	.rich-text-format-toolbar__select--style {
		width: 7.5rem;
	}

	.rich-text-format-toolbar__select--size {
		width: 4.5rem;
	}

	.rich-text-format-toolbar__select--color {
		width: 6.5rem;
	}

	.rich-text-format-toolbar__button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: none;
		border-radius: var(--border-radius-sm, 0.25rem);
		background: none;
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.rich-text-format-toolbar__button:hover {
		background-color: var(--color-background-tertiary);
	}

	.rich-text-format-toolbar__divider {
		width: 1px;
		height: 1.5rem;
		background-color: var(--color-background-tertiary);
		margin-inline: 0.25rem;
	}

	.rich-text-format-toolbar__icon {
		width: 1rem;
		height: 1rem;
	}

	.rich-text-format-toolbar__link-popover {
		position: absolute;
		z-index: var(--z-index-docked, 10);
		inset-block-start: 100%;
		inset-inline-start: 0.5rem;
		margin-block-start: 0.25rem;
		display: flex;
		width: min(20rem, calc(100% - 1rem));
		padding: 0.75rem;
		gap: 0.5rem;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.rich-text-format-toolbar__link-input {
		min-width: 0;
		flex: 1;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-start-start-radius: var(--border-radius-sm, 0.25rem);
		border-end-start-radius: var(--border-radius-sm, 0.25rem);
		font-size: var(--text-size-sm, 0.875rem);
	}

	.rich-text-format-toolbar__link-button {
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
