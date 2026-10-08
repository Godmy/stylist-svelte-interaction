<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import DocumentPreview from './index.svelte';

	type Props = {
		format: 'json' | 'text' | 'markdown';
		showLineNumbers: boolean;
		showCopyButton: boolean;
		showDownloadButton: boolean;
		readOnly: boolean;
		height: string;
	};

	const controls: SlotStory[] = [
		{ name: 'format', type: 'select', options: ['json', 'text', 'markdown'], defaultValue: 'json' },
		{ name: 'showLineNumbers', type: 'boolean', defaultValue: true },
		{ name: 'showCopyButton', type: 'boolean', defaultValue: true },
		{ name: 'showDownloadButton', type: 'boolean', defaultValue: false },
		{ name: 'readOnly', type: 'boolean', defaultValue: true },
		{ name: 'height', type: 'text', defaultValue: '400px' }
	];

	const jsonContent = JSON.stringify(
		{ status: 'ok', data: { items: [1, 2, 3], total: 3 } },
		null,
		2
	);
	const textContent = `This is a plain text document.
  
It contains multiple lines of text.

You can use this component to preview any text content.`;
	const markdownContent = `# Markdown Document

This is a **markdown** document.

- Item 1
- Item 2
- Item 3
`;

	function getContentByFormat(format: string) {
		switch (format) {
			case 'text':
				return textContent;
			case 'markdown':
				return markdownContent;
			default:
				return jsonContent;
		}
	}

	function handleCopy(content: string) {
		console.log('Content copied:', content);
	}

	function handleDownload(content: string, format: string) {
		console.log('Content downloaded:', format);
	}
</script>

<Story
	id="organisms-document-preview"
	title="Organisms / Interaction / Forms / Document Preview"
	component={DocumentPreview}
	category="Organisms/Interaction/Forms"
	description="A document preview component for displaying and editing various document formats."
	tags={['document', 'preview', 'editor', 'viewer']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-document-preview _c1">
			<h1 class="_c2">DocumentPreview Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive DocumentPreview</h2>
				<div class="_c5">
					<DocumentPreview content={getContentByFormat(values.format)} format={values.format} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
		overflow: hidden;
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
	._c3 {
		margin-bottom: 1.5rem;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c4 {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	._c5 {
		max-width: 48rem;
	}
</style>
