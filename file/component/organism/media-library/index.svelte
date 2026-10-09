<script lang="ts">
	import type { RecipeMediaLibrary } from '$stylist/file/interface/recipe/media-library';
	import { createMediaLibraryState } from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeMediaLibrary = $props();
	const state = createMediaLibraryState(() => props);
</script>

<div class={state.hostClasses} {...state.restProps}>
	<!-- Header with search and controls -->
	<div class={`ml-header ${state.headerClass}`}>
		<div class="ml-header-row">
			<div class="ml-search-wrap">
				<div class="ml-search-field">
					<div class="ml-search-icon-wrap">
						<BaseIcon name="search" size={20} style="color: var(--color-text-tertiary)" />
					</div>
					<input
						type="text"
						class="ml-search-input"
						placeholder={state.searchPlaceholder}
						bind:value={state.searchQuery}
					/>
				</div>
			</div>

			<div class="ml-header-actions">
				{#if state.allowUpload}
					<button
						type="button"
						class="ml-btn ml-btn--primary"
						onclick={() => state.triggerFileInput()}
					>
						<BaseIcon name="upload" size={16} style="margin-right: 0.25rem" />
						Upload
					</button>
				{/if}

				<div class="ml-view-toggle">
					<button
						type="button"
						class={`ml-view-btn ml-view-btn--left ${state.selectedViewMode === 'grid' ? 'ml-view-btn--active' : ''}`}
						onclick={() => (state.selectedViewMode = 'grid')}
						title="Grid view"
					>
						<BaseIcon name="grid-3x3" size={16} />
					</button>
					<button
						type="button"
						class={`ml-view-btn ml-view-btn--right ${state.selectedViewMode === 'list' ? 'ml-view-btn--active' : ''}`}
						onclick={() => (state.selectedViewMode = 'list')}
						title="List view"
					>
						<BaseIcon name="list" size={16} />
					</button>
				</div>
			</div>
		</div>

		<!-- Hidden file input -->
		<input
			type="file"
			bind:this={state.fileInputRef}
			class="ml-hidden"
			onchange={(e) => state.handleFileUpload(e)}
			multiple
			accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
		/>
	</div>

	<!-- Toolbar with selection actions -->
	{#if state.selectedItems.length > 0}
		<div class={`ml-toolbar ${state.toolbarClass}`}>
			<span class="ml-toolbar-count">
				{state.selectedItems.length} item{state.selectedItems.length !== 1 ? 's' : ''} selected
			</span>
			<div class="ml-toolbar-actions">
				{#if state.allowDownload}
					<button type="button" class="ml-btn ml-btn--secondary">
						<BaseIcon name="download" size={16} style="margin-right: 0.25rem" />
						Download
					</button>
				{/if}
				{#if state.allowDelete}
					<button type="button" class="ml-btn ml-btn--danger">
						<BaseIcon name="trash" size={16} style="margin-right: 0.25rem" />
						Delete
					</button>
				{/if}
				<button
					type="button"
					class="ml-btn ml-btn--neutral"
					onclick={() => (state.selectedItems = [])}
				>
					<BaseIcon name="x" size={16} style="margin-right: 0.25rem" />
					Clear
				</button>
			</div>
		</div>
	{/if}

	<!-- Media grid/list -->
	<div
		class={`ml-content ${state.selectedViewMode === 'grid' ? `ml-content--grid ${state.gridClass}` : 'ml-content--list'}`}
	>
		{#each state.filteredItems as item}
			{#if state.selectedViewMode === 'grid'}
				<!-- Grid view item -->
				<div
					class={`ml-grid-item ${state.selectedItems.includes(item.id) ? 'ml-grid-item--selected' : ''} ${state.itemClass}`}
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						state.handleItemSelect(item);
						state.toggleItemSelection(item.id);
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							e.stopPropagation();
							state.handleItemSelect(item);
							state.toggleItemSelection(item.id);
						}
					}}
				>
					<div class="ml-item-thumb">
						{#if item.thumbnail}
							<img
								src={item.thumbnail}
								alt={item.name}
								style="width:100%;height:100%;object-fit:cover"
							/>
						{:else}
							<BaseIcon
								name={state.getFileIcon(item.type)}
								size={40}
								style="color: var(--color-text-tertiary)"
							/>
						{/if}
					</div>
					<div class="ml-item-info">
						<p class="ml-item-name">{item.name}</p>
						<p class="ml-item-size">{state.formatMediaFileSize(item.size)}</p>
					</div>
				</div>
			{:else}
				<!-- List view item -->
				<div
					class={`ml-list-item ${state.selectedItems.includes(item.id) ? 'ml-list-item--selected' : ''} ${state.itemClass}`}
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						state.handleItemSelect(item);
						state.toggleItemSelection(item.id);
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							e.stopPropagation();
							state.handleItemSelect(item);
							state.toggleItemSelection(item.id);
						}
					}}
				>
					<div class="ml-list-thumb">
						<BaseIcon
							name={state.getFileIcon(item.type)}
							size={32}
							style="color: var(--color-text-tertiary)"
						/>
					</div>
					<div class="ml-list-info">
						<p class="ml-list-name">{item.name}</p>
						<p class="ml-list-meta">
							{state.formatMediaFileSize(item.size)} • {state.formatMediaDate(item.uploadDate)}
						</p>
					</div>
					<div class="ml-list-actions">
						{#if state.allowDownload}
							<button
								type="button"
								class="ml-action-btn"
								onclick={(e) => {
									e.stopPropagation();
									state.handleItemDownload(item.id);
								}}
								title="Download"
							>
								<BaseIcon name="download" size={20} />
							</button>
						{/if}
						<button
							type="button"
							class="ml-action-btn"
							onclick={(e) => {
								e.stopPropagation();
								state.handleItemSelect(item);
							}}
							title="View"
						>
							<BaseIcon name="preview" size={20} />
						</button>
						{#if state.allowDelete}
							<button
								type="button"
								class="ml-action-btn ml-action-btn--danger"
								onclick={(e) => {
									e.stopPropagation();
									state.handleItemDelete(item.id);
								}}
								title="Delete"
							>
								<BaseIcon name="trash" size={20} />
							</button>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Empty state -->
	{#if state.filteredItems.length === 0}
		<div class="ml-empty">
			<BaseIcon
				name="folder"
				size={48}
				style="color: var(--color-text-tertiary); display: block; margin: 0 auto 0.5rem"
			/>
			<h3 class="ml-empty-title">No media files</h3>
			<p class="ml-empty-desc">
				{state.searchQuery ? 'No files match your search' : 'Upload files to get started'}
			</p>
			{#if state.allowUpload && !state.searchQuery}
				<button
					type="button"
					class="ml-btn ml-btn--primary ml-btn--lg"
					onclick={() => state.triggerFileInput()}
				>
					<BaseIcon name="upload" size={16} style="margin-right: 0.25rem" />
					Upload files
				</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.ml-host {
		overflow: hidden;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}
	.ml-header {
		border-bottom: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 0.75rem 1rem;
	}
	.ml-header-row {
		display: flex;
		align-items: center;
	}
	.ml-search-wrap {
		flex: 1;
	}
	.ml-search-field {
		position: relative;
		border-radius: 0.375rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	.ml-search-icon-wrap {
		pointer-events: none;
		position: absolute;
		inset-block: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding-left: 0.75rem;
	}
	.ml-search-input {
		display: block;
		width: 100%;
		border-radius: 0.375rem;
		border: 1px solid var(--color-border-primary);
		padding: 0.5rem 3rem 0.5rem 2.5rem;
		font-size: 0.875rem;
		background-color: transparent;
		color: var(--color-text-primary);
	}
	.ml-search-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
	}
	.ml-header-actions {
		margin-left: 1rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.ml-hidden {
		display: none;
	}
	.ml-view-toggle {
		display: flex;
		border-radius: 0.375rem;
		border: 1px solid var(--color-border-primary);
	}
	.ml-view-btn {
		padding: 0.5rem;
		background-color: var(--color-background-primary);
		color: var(--color-text-secondary);
		border: none;
		cursor: pointer;
	}
	.ml-view-btn:hover:not(.ml-view-btn--active) {
		background-color: var(--color-background-secondary);
	}
	.ml-view-btn--left {
		border-radius: 0.375rem 0 0 0.375rem;
	}
	.ml-view-btn--right {
		border-radius: 0 0.375rem 0.375rem 0;
	}
	.ml-view-btn--active {
		background-color: var(--color-primary-100);
		color: var(--color-primary-600);
	}
	.ml-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-border-primary);
		background-color: var(--color-primary-50);
		padding: 0.5rem 1rem;
	}
	.ml-toolbar-count {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary-800);
	}
	.ml-toolbar-actions {
		display: flex;
		gap: 0.5rem;
	}
	.ml-btn {
		display: inline-flex;
		align-items: center;
		border-radius: 0.375rem;
		border: 1px solid transparent;
		font-weight: 500;
		cursor: pointer;
		outline: none;
	}
	.ml-btn--primary {
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		background-color: var(--color-primary-600);
		color: var(--color-text-inverse);
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	.ml-btn--primary:hover {
		background-color: var(--color-primary-700);
	}
	.ml-btn--lg {
		padding: 0.5rem 1rem;
		margin-top: 1rem;
	}
	.ml-btn--secondary {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		background-color: var(--color-primary-100);
		color: var(--color-primary-700);
	}
	.ml-btn--secondary:hover {
		background-color: var(--color-primary-200);
	}
	.ml-btn--danger {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		background-color: var(--color-danger-100);
		color: var(--color-danger-700);
	}
	.ml-btn--danger:hover {
		background-color: var(--color-danger-200);
	}
	.ml-btn--neutral {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		color: var(--color-text-primary);
	}
	.ml-btn--neutral:hover {
		background-color: var(--color-background-secondary);
	}
	.ml-content {
		padding: 1rem;
	}
	.ml-content--grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	@media (min-width: 640px) {
		.ml-content--grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 768px) {
		.ml-content--grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.ml-content--grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
	.ml-content--list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.ml-grid-item {
		cursor: pointer;
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		transition: box-shadow 0.15s;
	}
	.ml-grid-item:hover {
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	.ml-grid-item--selected {
		outline: 2px solid #3b82f6;
		outline-offset: -1px;
	}
	.ml-item-thumb {
		display: flex;
		aspect-ratio: 1;
		align-items: center;
		justify-content: center;
		background-color: var(--color-background-secondary);
	}
	.ml-item-info {
		padding: 0.5rem;
	}
	.ml-item-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ml-item-size {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
	.ml-list-item {
		display: flex;
		align-items: center;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		padding: 0.75rem;
		cursor: pointer;
	}
	.ml-list-item--selected {
		border-color: var(--color-primary-500);
		background-color: var(--color-primary-50);
	}
	.ml-list-thumb {
		display: flex;
		width: 4rem;
		height: 4rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		background-color: var(--color-background-secondary);
	}
	.ml-list-info {
		margin-left: 1rem;
		min-width: 0;
		flex: 1;
	}
	.ml-list-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ml-list-meta {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	.ml-list-actions {
		margin-left: 1rem;
		display: flex;
		gap: 0.5rem;
	}
	.ml-action-btn {
		color: var(--color-text-tertiary);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}
	.ml-action-btn:hover {
		color: var(--color-text-secondary);
	}
	.ml-action-btn--danger:hover {
		color: var(--color-danger-500);
	}
	.ml-empty {
		padding: 3rem 1rem;
		text-align: center;
	}
	.ml-empty-title {
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ml-empty-desc {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
