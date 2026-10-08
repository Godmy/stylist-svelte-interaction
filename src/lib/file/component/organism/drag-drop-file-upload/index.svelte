<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createDragDropFileUploadState } from './state.svelte';
	import type { RecipeDragDropFileUpload } from '$stylist/file/interface/recipe/drag-drop-file-upload';

	let props: RecipeDragDropFileUpload = $props();
	const state = createDragDropFileUploadState(() => props);
</script>

<div class={`c-drag-drop-file-upload ${state.classes}`} {...state.restProps}>
	<div
		class={`ddf-zone ${state.isDragging ? 'ddf-zone--dragging' : ''} ${state.disabled ? 'ddf-zone--disabled' : ''} ${props.dropZoneClass ?? ''}`}
		ondragover={state.handleDragOver}
		ondragleave={state.handleDragLeave}
		ondrop={state.handleDrop}
		onclick={state.triggerFileInput}
		onkeydown={(event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				state.triggerFileInput();
			}
		}}
		role="button"
		tabindex={0}
	>
		<BaseIcon
			name="upload"
			size={48} style="display: block; margin: 0 auto 1rem; color: var(--color-text-tertiary)"
		/>
		<p class="ddf-title">Drag and drop files here</p>
		<p class="ddf-subtitle">or click to browse</p>
		<p class="ddf-hint">Supports: {state.accept || 'All files'} | Max: {state.maxSizeLabel}</p>

		<input
			bind:this={state.fileInputElement}
			type="file"
			class="ddf-hidden"
			onchange={state.handleFileSelect}
			multiple={state.multiple}
			accept={state.accept}
			disabled={state.disabled}
		/>
	</div>

	{#if state.files.length > 0}
		<div class={`ddf-file-list ${props.fileListClass ?? ''}`}>
			<h4 class="ddf-list-title">Selected Files:</h4>
			<ul class="ddf-items">
				{#each state.files as file}
					<li
						class={`ddf-item ${props.fileItemClass ?? ''} ${
							file.status === 'error'
								? 'ddf-item--error'
								: file.status === 'success'
									? 'ddf-item--success'
									: 'ddf-item--default'
						}`}
					>
						<div class="ddf-item-info">
							<BaseIcon
								name="file-text"
								size={20} style="margin-right: 0.5rem; color: var(--color-text-secondary); flex-shrink: 0"
							/>
							<div>
								<p class="ddf-item-name">{file.name}</p>
								<p class="ddf-item-size">{file.size} B</p>
							</div>
						</div>

						<div class="ddf-item-actions">
							{#if file.status === 'uploading'}
								<div class="ddf-progress-track">
									<div class="ddf-progress-fill" style={`width: ${file.progress}%`}></div>
								</div>
								<span class="ddf-progress-pct">{file.progress}%</span>
							{:else if file.status === 'error'}
								<span class="ddf-item-error">Error</span>
							{:else if file.status === 'success'}
								<span class="ddf-item-success">Uploaded</span>
							{/if}

							<button
								type="button"
								class="ddf-remove-btn"
								onclick={() => state.removeFile(file.id)}
							>
								<BaseIcon name="x" size={16} />
							</button>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.c-drag-drop-file-upload {
		width: 100%;
	}

	.ddf-zone {
		cursor: pointer;
		border-radius: 0.5rem;
		border: 2px dashed var(--color-border-primary);
		padding: 2rem;
		text-align: center;
		transition:
			border-color 0.15s,
			background-color 0.15s;
	}

	.ddf-zone--dragging {
		border-color: var(--color-primary-500);
		background-color: var(--color-primary-50);
	}

	.ddf-zone--disabled {
		cursor: not-allowed;
		opacity: var(--opacity-50, 0.5);
	}

	.ddf-title {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ddf-subtitle {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	.ddf-hint {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	.ddf-hidden {
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

	.ddf-file-list {
		margin-top: 1rem;
	}
	.ddf-list-title {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ddf-items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.ddf-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 0.375rem;
		border: 1px solid;
		padding: 0.75rem;
	}

	.ddf-item--default {
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
	}
	.ddf-item--error {
		border-color: var(--color-danger-200);
		background-color: var(--color-danger-50);
	}
	.ddf-item--success {
		border-color: var(--color-success-200);
		background-color: var(--color-success-50);
	}

	.ddf-item-info {
		display: flex;
		align-items: center;
	}
	.ddf-item-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ddf-item-size {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.ddf-item-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.ddf-progress-track {
		margin-right: 0.5rem;
		height: 0.5rem;
		width: 6rem;
		border-radius: 9999px;
		background-color: var(--color-background-tertiary);
	}

	.ddf-progress-fill {
		height: 0.5rem;
		border-radius: 9999px;
		background-color: var(--color-primary-600);
	}

	.ddf-progress-pct {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
	.ddf-item-error {
		font-size: 0.75rem;
		color: var(--color-danger-600);
	}
	.ddf-item-success {
		font-size: 0.75rem;
		color: var(--color-success-600);
	}

	.ddf-remove-btn {
		color: var(--color-text-tertiary);
	}
	.ddf-remove-btn:hover {
		color: var(--color-text-secondary);
	}
</style>
