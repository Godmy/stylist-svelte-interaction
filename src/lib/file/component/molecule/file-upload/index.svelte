<script lang="ts">
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createFileUploadState } from './state.svelte';
	import type { RecipeFileUpload } from '$stylist/file/interface/recipe/file-upload';

	let props: RecipeFileUpload = $props();
	const state = createFileUploadState(() => props);
</script>

<div class={`file-upload-container ${state.className}`} {...state.restProps}>
	{#if state.children}
		{#if state.children}{@render state.children()}{/if}
	{:else}
		<div class="file-upload-area" class:fu-disabled={state.disabled}>
			<svg
				style="margin:0 auto;width:3rem;height:3rem;color:var(--color-text-tertiary)"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
			<p class="fu-label">
				<label
					for="file-upload"
					class="fu-browse-label"
					class:fu-browse-label--disabled={state.disabled}
				>
					<span>Select file</span>
					<input
						id="file-upload"
						type="file"
						class="fu-hidden"
						accept={state.accept}
						onchange={state.handleFileSelect}
						multiple={state.multiple}
						disabled={state.disabled}
					/>
				</label>
				<span class="fu-drop-text">{state.uploadText}</span>
			</p>
			<p class="fu-hint">
				{state.accept.replace('.', '').replace(/,/g, ', ')} up to {(
					state.maxSize /
					(1024 * 1024)
				).toFixed(0)}MB
			</p>
		</div>

		{#if state.file}
			<div class="file-info">
				<div class="fu-file-row">
					<div class="fu-file-info">
						<svg
							style="width:2rem;height:2rem;color:var(--color-text-tertiary)"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<div class="fu-file-meta">
							<div class="fu-file-name">{state.file.name}</div>
							<div class="fu-file-size">{(state.file.size / 1024).toFixed(1)}KB</div>
						</div>
					</div>
					<Button variant="ghost" size="sm" onclick={state.clearFile} disabled={state.disabled}>
						<svg
							style="width:1rem;height:1rem"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</Button>
				</div>

				{#if state.status === 'uploading'}
					<div class="fu-progress-wrap">
						<div class="fu-progress-track">
							<div class="fu-progress-fill" style="width: 45%"></div>
						</div>
						<p class="fu-progress-text">Uploading...</p>
					</div>
				{:else if state.status === 'success'}
					<div class="fu-status fu-status--success">
						<svg
							style="margin-right:0.25rem;width:1.25rem;height:1.25rem"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						File uploaded successfully
					</div>
				{:else if state.status === 'error'}
					<div class="fu-status fu-status--error">
						<svg
							style="margin-right:0.25rem;width:1.25rem;height:1.25rem"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
						Error uploading file
					</div>
				{/if}

				{#if state.status !== 'uploading' && state.status !== 'success'}
					<div class="fu-upload-action">
						<Button
							variant="primary"
							size="md"
							onclick={state.handleUpload}
							disabled={state.disabled || !state.file}
						>
							Upload
						</Button>
					</div>
				{/if}
			</div>
		{/if}
	{/if}
</div>

<style>
	.file-upload-area {
		border-radius: 0.5rem;
		border: 2px dashed var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		text-align: center;
	}

	.fu-disabled {
		opacity: var(--opacity-50, 0.5);
	}

	.fu-label {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.fu-browse-label {
		position: relative;
		cursor: pointer;
		border-radius: 0.375rem;
		background-color: var(--color-background-primary);
		font-weight: 500;
		color: var(--color-primary-600);
	}

	.fu-browse-label:hover {
		color: var(--color-primary-500);
	}
	.fu-browse-label--disabled {
		cursor: not-allowed;
	}

	.fu-hidden {
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

	.fu-drop-text {
		padding-left: 0.25rem;
	}

	.fu-hint {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.file-info {
		margin-top: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}

	.fu-file-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fu-file-info {
		display: flex;
		align-items: center;
	}

	.fu-file-meta {
		margin-left: 1rem;
	}
	.fu-file-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.fu-file-size {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.fu-progress-wrap {
		margin-top: 1rem;
	}

	.fu-progress-track {
		height: 0.625rem;
		width: 100%;
		border-radius: 9999px;
		background-color: var(--color-background-secondary);
	}

	.fu-progress-fill {
		height: 0.625rem;
		border-radius: 9999px;
		background-color: var(--color-primary-600);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.fu-progress-text {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.fu-status {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		font-size: 0.875rem;
	}

	.fu-status--success {
		color: var(--color-success-600);
	}
	.fu-status--error {
		color: var(--color-danger-600);
	}

	.fu-upload-action {
		margin-top: 1rem;
	}
</style>
