<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createFileListItemState } from './state.svelte';
	import { FileListItemManager } from '$stylist/file/class/manager/file-list-item';
	import type { RecipeFileListItem } from '$stylist/file/interface/recipe/file-list-item';

	let props: RecipeFileListItem = $props();
	const state = createFileListItemState(() => props);
</script>

<div
	class={`file-list-item ${state.isSelected ? 'fli--selected' : ''} ${state.variant === 'compact' ? 'fli--compact' : ''} ${state.disabled ? 'fli--disabled' : ''} ${state.classes}`}
	onclick={state.handleSelect}
	ondblclick={state.handleDoubleClick}
	{...state.restProps}
>
	{#if state.enableSelection}
		<input
			type="checkbox"
			class="fli-checkbox"
			checked={state.isSelected}
			onclick={(event) => event.stopPropagation()}
			onchange={state.handleSelect}
			disabled={state.disabled}
		/>
	{/if}

	<div class="fli-icon">
		<BaseIcon
			name={state.iconName}
			size={20} style="color: var(--color-text-secondary)"
		/>
	</div>

	{#if state.showThumbnail && state.item.thumbnail}
		<div class="fli-thumbnail">
			<img src={state.item.thumbnail} alt={state.item.name} class="fli-thumb-img" />
		</div>
	{/if}

	<div class="fli-info">
		<div class={`fli-name ${props.cellClass ?? ''}`}>
			{state.item.name}
			{#if state.item.type === 'folder'}
				<span class="fli-folder-badge">Folder</span>
			{/if}
		</div>

		{#if state.variant !== 'compact'}
			<div class="fli-meta">
				{#if state.showSize && state.item.size}
					<span>{FileListItemManager.formatFileSize(state.item.size)}</span>
				{/if}
				{#if state.showModified && state.item.modified}
					<span class="fli-sep">•</span>
					<span>{state.item.modified.toLocaleDateString()}</span>
				{/if}
				{#if state.showOwner && state.item.owner}
					<span class="fli-sep">•</span>
					<span>{state.item.owner}</span>
				{/if}
			</div>
		{/if}
	</div>

	<div class="fli-actions">
		<Button
			variant="ghost"
			size="sm"
			onclick={(event) => {
				event.stopPropagation();
				state.handleAction('preview');
			}}
			disabled={state.disabled}
		>
			<BaseIcon name="eye" size={16} style="color: var(--color-text-secondary)" />
		</Button>
		<Button
			variant="ghost"
			size="sm"
			onclick={(event) => {
				event.stopPropagation();
				state.handleAction('download');
			}}
			disabled={state.disabled}
		>
			<BaseIcon name="download" size={16} style="color: var(--color-text-secondary)" />
		</Button>
		<Button
			variant="ghost"
			size="sm"
			onclick={(event) => {
				event.stopPropagation();
				state.handleAction('more');
			}}
			disabled={state.disabled}
		>
			<BaseIcon
				name="more-horizontal"
				size={16} style="color: var(--color-text-secondary)"
			/>
		</Button>
	</div>
</div>

<style>
	.file-list-item {
		display: flex;
		cursor: pointer;
		align-items: center;
		border-bottom: 1px solid var(--color-border-primary);
		padding: 0.75rem;
	}

	.file-list-item:hover {
		background-color: var(--color-background-secondary);
	}
	.fli--selected {
		background-color: var(--color-primary-50);
	}
	.fli--compact {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.fli--disabled {
		cursor: not-allowed;
		opacity: var(--opacity-50, 0.5);
	}

	.fli-checkbox {
		width: 1rem;
		height: 1rem;
		border-radius: 0.25rem;
		color: var(--color-primary-600);
	}

	.fli-icon {
		margin-left: 0.75rem;
		flex-shrink: 0;
	}

	.fli-thumbnail {
		margin-left: 0.75rem;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 0.25rem;
		border: 1px solid var(--color-border-primary);
	}

	.fli-thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.fli-info {
		margin-left: 0.75rem;
		min-width: 0;
		flex: 1;
	}

	.fli-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
	}

	.fli-folder-badge {
		margin-left: 0.5rem;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		background-color: var(--color-primary-100);
		padding: 0.125rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-primary-800);
	}

	.fli-meta {
		margin-top: 0.25rem;
		display: flex;
		align-items: center;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.fli-sep {
		margin: 0 0.5rem;
	}

	.fli-actions {
		margin-left: 1rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
