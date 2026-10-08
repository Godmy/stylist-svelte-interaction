<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import { ZipViewerManager } from '$stylist/file/class/manager/zip-viewer';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createZipViewerState } from './state.svelte';
	import type { RecipeZipViewer } from '$stylist/file/interface/recipe/zip-viewer';

	let props: RecipeZipViewer = $props();
	const state = createZipViewerState(() => props);
</script>

<div class={ClassNamesManager.merge('c-zip-viewer', state.classes)} {...state.restProps}>
	<div class={ClassNamesManager.merge('zv-header', props.headerClass ?? '')}>
		<div class="zv-header-row">
			<BaseIcon
				name="archive"
				size={24} style="margin-right: 0.75rem; color: var(--color-primary-500)"
			/>
			<div>
				<h3 class="zv-archive-name">{state.archiveName}</h3>
				<p class="zv-archive-count">{state.filteredEntries.length} items</p>
			</div>
		</div>

		{#if state.searchable}
			<div class="zv-search-wrap">
				<div class="zv-search-icon">
					<BaseIcon
						name="search"
						size={20} style="color: var(--color-text-tertiary)"
					/>
				</div>
				<input
					type="text"
					class="_c1"
					placeholder="Search in archive..."
					value={state.searchQuery}
					oninput={state.handleSearchInput}
					disabled={state.disabled}
				/>
			</div>
		{/if}
	</div>

	<div class="zv-body">
		{#if state.zipTree.length === 0}
			<div class="zv-empty">
				{state.searchQuery ? 'No matching items found' : 'Archive is empty'}
			</div>
		{:else}
			<div class="zv-entries">
				{#each state.zipTree as entry}
					{@const entryIcon = ZipViewerManager.getEntryIcon(entry)}
					<div
						class={ClassNamesManager.merge(
							'zv-entry',
							entry.type === 'directory' && 'zv-entry--dir',
							props.entryClass ?? ''
						)}
					>
						<button
							type="button"
							class="zv-expand-btn"
							aria-label={state.expandedFolders.has(entry.path)
								? `Collapse ${entry.name}`
								: `Expand ${entry.name}`}
							onclick={() => state.toggleFolder(entry)}
							disabled={entry.type === 'file' || state.disabled}
						>
							{#if entry.type === 'directory'}
								{#if state.expandedFolders.has(entry.path)}
									<BaseIcon
										name="chevron-down"
										size={16} style="color: var(--color-text-secondary)"
									/>
								{:else}
									<BaseIcon
										name="chevron-right"
										size={16} style="color: var(--color-text-secondary)"
									/>
								{/if}
							{/if}
						</button>

						<BaseIcon
							name={entryIcon}
							class={entry.type === 'directory'
								? 'zv-entry-icon zv-entry-icon--dir'
								: 'zv-entry-icon'}
						/>

						<div class="zv-entry-info">
							<div class="zv-entry-name-row">
								<span class="zv-entry-name">{entry.name}</span>
								{#if entry.type === 'directory'}
									<span class="zv-dir-badge">Directory</span>
								{/if}
							</div>
							<div class="zv-entry-meta">
								{#if entry.size !== undefined}
									<span>{ZipViewerManager.formatFileSize(entry.size)}</span>
								{/if}
								{#if entry.modified}
									<span class="zv-sep">•</span>
									<span>{entry.modified.toLocaleDateString()}</span>
								{/if}
							</div>
						</div>

						<div class="zv-entry-actions">
							{#if entry.isText}
								<Button
									variant="ghost"
									size="sm"
									onclick={() => state.handlePreview(entry)}
									disabled={state.disabled}
									title="Preview"
								>
									<BaseIcon
										name="eye"
										size={16} style="color: var(--color-text-secondary)"
									/>
								</Button>
							{/if}
							<Button
								variant="ghost"
								size="sm"
								onclick={() => state.handleDownload(entry)}
								disabled={state.disabled}
								title="Download"
							>
								<BaseIcon
									name="download"
									size={16} style="color: var(--color-text-secondary)"
								/>
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onclick={() => state.handleExtract(entry)}
								disabled={state.disabled}
								title="Extract"
							>
								<BaseIcon
									name="external-link"
									size={16} style="color: var(--color-text-secondary)"
								/>
							</Button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.zv-header-row {
		display: flex;
		align-items: center;
	}
	.zv-archive-name {
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.zv-archive-count {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.zv-search-wrap {
		position: relative;
		margin-top: 0.75rem;
	}

	.zv-search-icon {
		pointer-events: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding-left: 0.75rem;
	}

	.zv-body {
		max-height: 500px;
		overflow-y: auto;
	}

	.zv-empty {
		padding: 2rem 0;
		text-align: center;
		color: var(--color-text-secondary);
	}

	.zv-entries {
		border-top: 1px solid #e5e7eb;
	}

	.zv-expand-btn {
		margin-right: 0.5rem;
		display: flex;
		width: 1.5rem;
		height: 1.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		flex-shrink: 0;
	}

	.zv-expand-btn:hover {
		background-color: var(--color-background-tertiary);
	}
	.zv-expand-btn:focus {
		outline: none;
	}

	.zv-entry-info {
		min-width: 0;
		flex: 1;
	}
	.zv-entry-name-row {
		display: flex;
		align-items: center;
	}

	.zv-entry-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.zv-dir-badge {
		margin-left: 0.5rem;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		background-color: var(--color-primary-100);
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-primary-800);
	}

	.zv-entry-meta {
		margin-top: 0.25rem;
		display: flex;
		align-items: center;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.zv-sep {
		margin: 0 0.5rem;
	}

	.zv-entry-actions {
		margin-left: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	._c1 {
		display: block;
		width: 100%;
		padding-left: 2.5rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		border-radius: 0.375rem;
		line-height: 1.25rem;
		background-color: var(--color-background-primary);
	}
	@media (min-width: 640px) {
		._c1 {
			font-size: 0.875rem;
			line-height: 1.25rem;
		}
	}

	._c1:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 3px var(--color-blue-500);
		border-color: var(--color-primary-500);
	}

	.c-zip-viewer {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}
	.zv-header {
		padding: 1rem;
		background-color: var(--color-background-secondary);
		border-bottom: 1px solid var(--color-border-primary);
	}
	.zv-entry {
		display: flex;
		align-items: center;
		padding: 0.75rem;
	}
	.zv-entry:hover {
		background-color: var(--color-background-secondary);
	}
	.zv-entry--dir {
		background-color: var(--color-background-secondary);
	}
	.zv-entry-icon {
		height: 1.25rem;
		width: 1.25rem;
		margin-right: 0.75rem;
		color: var(--color-text-secondary);
	}
	.zv-entry-icon--dir {
		color: var(--color-primary-500);
	}
	._c1::placeholder {
		color: rgb(107 114 128);
	}
	._c1:focus::placeholder {
		color: rgb(156 163 175);
	}
</style>
