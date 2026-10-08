<script lang="ts">
	import { untrack } from 'svelte';
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import type { RecipeDocumentPreview } from '$stylist/file/interface/recipe/document-preview';
	import createDocumentPreviewState from './state.svelte';
	let props: RecipeDocumentPreview = $props();
	const state = createDocumentPreviewState(untrack(() => props));
	const { title: _title, content: _content, format: _format, class: _class, ...restProps } = props;
</script>

<div class={ClassNamesManager.merge('c-document-preview', state.classes)} {...restProps}>
	<div class="dp-title">{props.title ?? 'Document Preview'}</div>
	<div class="dp-format">Format: {props.format ?? 'text'}</div>
	<pre class="dp-content">{props.content ?? 'No content'}</pre>
</div>

<style>
	.c-document-preview {
		border-radius: 0.5rem;
		border: 1px solid;
		padding: 1rem;
	}

	.dp-title {
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.dp-format {
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.dp-content {
		overflow: auto;
		border-radius: 0.25rem;
		border: 1px solid;
		background-color: var(--color-background-secondary);
		padding: 0.5rem;
		font-size: 0.875rem;
	}
</style>
