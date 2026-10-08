<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import { FileExplorerManager } from '$stylist/file/class/manager/file-explorer';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createFileExplorerState } from './state.svelte';
	import type { SlotFileSystemItem } from '$stylist/file/interface/slot/file-system-item';
	import type { RecipeFileExplorer } from '$stylist/file/interface/recipe/file-explorer';

	let props: RecipeFileExplorer = $props();
	const state = createFileExplorerState(() => props);
</script>

<div class={ClassNamesManager.merge('c-file-explorer', state.classes)} {...state.restProps}>
	<div class={ClassNamesManager.merge('fe-header', props.headerClass ?? '')}>
		{#if state.showPath}
			<div class={ClassNamesManager.merge('fe-path', props.pathClass ?? '')}>
				{#each state.pathParts as part, index}
					<span>{part}</span>
					{#if index < state.pathParts.length - 1}
						<BaseIcon name="chevron-right" size={16} style="margin: 0 0.25rem" />
					{/if}
				{/each}
			</div>
		{/if}

		<div class={ClassNamesManager.merge('fe-toolbar', props.toolbarClass ?? '')}>
			<div class="fe-toolbar-left">
				{#if state.searchable}
					<div class="fe-search-wrap">
						<div class="fe-search-icon">
							<BaseIcon
								name="search"
								size={20} style="color: var(--color-text-tertiary)"
							/>
						</div>
						<input
							type="text"
							class={ClassNamesManager.merge('fe-search-input', props.searchClass ?? '')}
							placeholder="Search files..."
							value={state.searchQuery}
							oninput={state.handleSearchInput}
						/>
					</div>
				{/if}

				<Button variant="outline" size="sm" onclick={state.toggleViewMode}>
					{#if state.currentViewMode === 'grid'}
						<BaseIcon name="list" size={16} style="margin-right: 0.25rem" />
					{:else}
						<BaseIcon name="grid" size={16} style="margin-right: 0.25rem" />
					{/if}
					{state.currentViewMode === 'grid' ? 'List' : 'Grid'}
				</Button>

				<Button variant="outline" size="sm" onclick={state.openUploadDialog}>
					<BaseIcon name="upload" size={16} style="margin-right: 0.25rem" />
					Upload
				</Button>
				<input
					bind:this={state.fileInputElement}
					type="file"
					class="fe-hidden"
					onchange={state.handleUpload}
					multiple
				/>
			</div>

			<div class="fe-toolbar-right">
				<span class="fe-item-count">{state.filteredItems.length} items</span>
				<Button variant="ghost" size="sm">
					<BaseIcon name="more-horizontal" size={20} />
				</Button>
			</div>
		</div>
	</div>

	<div class="fe-body">
		{#if state.currentViewMode === 'grid'}
			<div class="fe-grid">
				{#each state.filteredItems as item}
					{@const itemIcon = FileExplorerManager.getFileIcon(item)}
					<div
						class={`fe-grid-item ${
							state.selectedItems.some((c: SlotFileSystemItem) => c.id === item.id)
								? 'fe-grid-item--selected'
								: ''
						} ${props.itemClass ?? ''}`}
						role="button"
						tabindex="0"
						onclick={() => state.handleItemClick(item)}
						ondblclick={() => state.handleItemDoubleClick(item)}
						onkeydown={(event) => state.handleItemKeyDown(event, item)}
					>
						<BaseIcon
							name={itemIcon}
							size={32}
							style={`margin-bottom:0.5rem;color:${item.type === 'folder' ? 'var(--color-primary-500)' : 'var(--color-text-secondary)'}`}
						/>
						<div class="fe-grid-name">{item.name}</div>
						{#if item.type === 'file' && item.size}
							<div class="fe-grid-size">{FileExplorerManager.formatFileSize(item.size)}</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div class="fe-list">
				{#each state.filteredItems as item}
					{@const itemIcon = FileExplorerManager.getFileIcon(item)}
					<div
						class={`fe-list-item ${
							state.selectedItems.some((c: SlotFileSystemItem) => c.id === item.id)
								? 'fe-list-item--selected'
								: ''
						} ${props.itemClass ?? ''}`}
						role="button"
						tabindex="0"
						onclick={() => state.handleItemClick(item)}
						ondblclick={() => state.handleItemDoubleClick(item)}
						onkeydown={(event) => state.handleItemKeyDown(event, item)}
					>
						<BaseIcon
							name={itemIcon}
							size={20}
							style={`margin-right:0.75rem;flex-shrink:0;color:${item.type === 'folder' ? 'var(--color-primary-500)' : 'var(--color-text-secondary)'}`}
						/>
						<div class="fe-list-info">
							<div class="fe-list-name">{item.name}</div>
							<div class="fe-list-meta">
								{#if item.type === 'folder'}
									Folder
								{:else}
									{item.size ? FileExplorerManager.formatFileSize(item.size) : 'File'} •
									{item.modified ? item.modified.toLocaleDateString() : ''}
								{/if}
							</div>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onclick={(event) => {
								event.stopPropagation();
								state.handleDownload(item);
							}}
						>
							<BaseIcon name="download" size={16} />
						</Button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.fe-toolbar-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.fe-search-wrap {
		position: relative;
		min-width: 200px;
		flex: 1;
	}

	.fe-search-icon {
		pointer-events: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding-left: 0.75rem;
	}

	.fe-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.fe-toolbar-right {
		display: flex;
		align-items: center;
	}

	.fe-item-count {
		margin-right: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.fe-body {
		padding: 0.5rem;
	}

	.fe-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.fe-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 768px) {
		.fe-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.fe-grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	.fe-grid-item {
		display: flex;
		cursor: pointer;
		flex-direction: column;
		align-items: center;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		padding: 0.75rem;
		text-align: center;
	}

	.fe-grid-item:hover {
		background-color: var(--color-background-secondary);
	}
	.fe-grid-item--selected {
		border-color: var(--color-primary-500);
		background-color: var(--color-primary-50);
	}

	.fe-grid-name {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.fe-grid-size {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.fe-list {
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid;
	}

	.fe-list-item {
		display: flex;
		cursor: pointer;
		align-items: center;
		border-bottom: 1px solid;
		padding: 0.75rem;
	}

	.fe-list-item:last-child {
		border-bottom: none;
	}
	.fe-list-item:hover {
		background-color: var(--color-background-secondary);
	}
	.fe-list-item--selected {
		background-color: var(--color-primary-50);
	}

	.fe-list-info {
		min-width: 0;
		flex: 1;
	}

	.fe-list-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.fe-list-meta {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.c-file-explorer {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}
	.fe-header {
		padding: 0.75rem;
		border-bottom: 1px solid var(--color-border-primary);
	}
	.fe-path {
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.5rem;
	}
	.fe-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.fe-search-input {
		display: block;
		width: 100%;
		padding: 0.5rem 0.75rem 0.5rem 2.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		line-height: 1.25rem;
		background-color: var(--color-background-primary);
		font-size: 0.875rem;
	}
	.fe-search-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 1px var(--color-blue-500);
	}
	.fe-search-input::placeholder {
		color: rgb(107 114 128);
	}
</style>
