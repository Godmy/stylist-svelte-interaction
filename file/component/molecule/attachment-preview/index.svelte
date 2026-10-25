<script lang="ts">
	import { AttachmentPreviewManager } from '$stylist/file/class/manager/attachment-preview';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createAttachmentPreviewState } from '$stylist/file/component/molecule/attachment-preview/state.svelte';
	import type { RecipeAttachmentPreview } from '$stylist/file/interface/recipe/attachment-preview';

	let props: RecipeAttachmentPreview = $props();
	const state = createAttachmentPreviewState(() => props);
</script>

<div class={`attachment-preview ${state.classes}`.trim()}>
	<div class="attachment-icon">
		<Icon name={AttachmentPreviewManager.getIconName(props.attachment.type)} size={24} />
	</div>

	<div class="attachment-details">
		<div class="attachment-name">{props.attachment.name}</div>
		<div class="attachment-info">
			{#if props.attachment.size}
				<span>{AttachmentPreviewManager.formatFileSize(props.attachment.size)}</span>
			{/if}
		</div>
	</div>

	{#if state.showActions}
		<div class="attachment-actions">
			<Button variant="ghost" size="sm" onclick={state.download} title="Download">
				<Icon name="download" size={16} />
			</Button>
			<Button variant="ghost" size="sm" onclick={state.remove} title="Remove">
				<Icon name="x" size={16} />
			</Button>
		</div>
	{/if}
</div>

<style>
	.attachment-preview {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-3, 0.75rem);
		min-width: 0;
		padding: var(--space-3, 0.75rem);
		border: 1px solid var(--color-border-primary, #d1d5db);
		border-radius: var(--radius-3, 0.75rem);
		background-color: var(--color-background-secondary, #f9fafb);
	}

	.attachment-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		width: var(--space-12, 3rem);
		height: var(--space-12, 3rem);
		border-radius: var(--radius-3, 0.75rem);
		background-color: var(--color-background-tertiary, #eef2ff);
		color: var(--color-text-secondary, #4b5563);
	}

	.attachment-details {
		flex: 1;
		min-width: var(--size-0, 0);
	}

	.attachment-name {
		overflow: hidden;
		color: var(--color-text-primary, #111827);
		font-size: var(--font-size-3-5, 0.875rem);
		font-weight: var(--font-weight-medium, 600);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.attachment-info {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2, 0.5rem);
		color: var(--color-text-secondary, #4b5563);
		font-size: var(--font-size-3-5, 0.875rem);
	}

	.attachment-actions {
		display: flex;
		flex: 0 0 auto;
		gap: var(--space-1, 0.25rem);
	}
</style>
