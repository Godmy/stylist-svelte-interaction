<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import type { RecipeUploadProgress } from '$stylist/file/interface/recipe/upload-progress';
	import { createUploadProgressState } from './state.svelte';
	import { UploadProgressManager } from '$stylist/file/class/manager/upload-progress';

	let props: RecipeUploadProgress = $props();
	const state = createUploadProgressState(() => props);
	const hostClasses = $derived(
		ClassNamesManager.merge(
			'c-upload-progress flex flex-col gap-3',
			state.variant === 'compact'
				? 'space-y-2'
				: state.variant === 'detailed'
					? 'space-y-4'
					: 'space-y-3',
			`c-upload-progress ${state.hostClass}`
		)
	);
	const noUploadsMessageClasses = 'text-center py-4 text-[--color-text-secondary]';
	const hiddenUploadsMessageClasses = 'text-center text-sm text-[--color-text-secondary] py-2';
</script>

<div class={hostClasses} {...state.restProps}>
	{#if state.files.length === 0}
		<div class={noUploadsMessageClasses}>No uploads</div>
	{:else}
		<div
			class={state.variant === 'compact'
				? 'up-list--compact'
				: state.variant === 'detailed'
					? 'up-list--detailed'
					: 'up-list--normal'}
		>
			{#each state.visibleFiles as file (file.id)}
				<div
					class={ClassNamesManager.merge(
						'up-item',
						file.status === 'success' && 'up-item--success',
						file.status === 'error' && 'up-item--error',
						file.status === 'uploading' && 'up-item--uploading',
						(file.status === 'idle' || !file.status) && 'up-item--idle',
						state.variant === 'compact' ? 'up-item--compact' : 'up-item--normal',
						state.itemClass
					)}
				>
					<div class="up-icon">
						{#if file.status === 'success'}
							<BaseIcon name="check-circle" class="_c1" />
						{:else if file.status === 'error'}
							<BaseIcon name="alert-circle" class="_c2" />
						{:else if file.status === 'uploading'}
							<BaseIcon name="upload" class="up-pulse _c3" />
						{:else}
							<BaseIcon name="upload" class="_c4" />
						{/if}
					</div>

					<div class="up-info">
						{#if state.showFileName}
							<p class="_c5">
								{file.name}
							</p>
						{/if}

						{#if state.showFileSize}
							<p class="_c6">
								{UploadProgressManager.formatFileSize(file.size)}
							</p>
						{/if}

						{#if state.showProgress && file.status === 'uploading'}
							<div class="up-progress-wrap">
								<div
									class={ClassNamesManager.merge(
										'up-bar',
										file.progress < 30
											? 'up-bar--low'
											: file.progress < 70
												? 'up-bar--mid'
												: 'up-bar--high',
										state.progressClass
									)}
								>
									<div
										class={ClassNamesManager.merge(
											'up-fill',
											file.progress < 30
												? 'up-fill--low'
												: file.progress < 70
													? 'up-fill--mid'
													: 'up-fill--high'
										)}
										style={`width: ${file.progress}%`}
									></div>
								</div>
								<div class="_c6">
									{Math.round(file.progress)}% complete
								</div>
							</div>
						{/if}

						{#if file.status === 'error' && file.error}
							<p class="_c7">
								{file.error}
							</p>
						{/if}
					</div>

					{#if state.showActions}
						<div class="_c8">
							{#if file.status === 'error'}
								<Button
									variant="ghost"
									size="sm"
									onclick={() => state.handleRetry(file)}
									title="Retry upload"
								>
									<BaseIcon
										name="rotate-ccw"
										size={16}
										style="color: var(--color-text-secondary)"
									/>
								</Button>
							{/if}

							{#if file.status === 'uploading'}
								<Button
									variant="ghost"
									size="sm"
									onclick={() => state.handleCancel(file)}
									title="Cancel upload"
								>
									<BaseIcon name="x" size={16} style="color: var(--color-text-secondary)" />
								</Button>
							{/if}

							<Button
								variant="ghost"
								size="sm"
								onclick={() => state.handleRemove(file)}
								title="Remove"
							>
								<BaseIcon name="x" size={16} style="color: var(--color-text-secondary)" />
							</Button>
						</div>
					{/if}
				</div>
			{/each}

			{#if state.autoHideCompleted && state.files.length > state.visibleFiles.length}
				<div class={hiddenUploadsMessageClasses}>
					{state.files.length - state.visibleFiles.length} completed uploads hidden
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.up-icon {
		flex-shrink: 0;
	}
	.up-info {
		margin-left: 0.75rem;
		min-width: 0;
		flex: 1;
	}
	.up-progress-wrap {
		margin-top: 0.5rem;
	}

	._c1 {
		height: 1.5rem;
		width: 1.5rem;
		color: var(--color-success-text);
	}
	._c2 {
		height: 1.5rem;
		width: 1.5rem;
		color: var(--color-danger-text);
	}
	._c3 {
		height: 1.5rem;
		width: 1.5rem;
		color: var(--color-info-text);
	}
	._c4 {
		height: 1.5rem;
		width: 1.5rem;
		color: var(--color-default-text);
	}
	._c5 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		color: var(--color-text-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 180px;
	}
	._c6 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
	}
	._c7 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-danger-text);
		margin-top: 0.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 180px;
	}
	._c8 {
		margin-left: 1rem;
		flex-shrink: 0;
		display: flex;
	}
	._c8 > * + * {
		margin-left: 0.5rem;
	}

	.up-list--compact {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.up-list--normal {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.up-list--detailed {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.up-item {
		display: flex;
		align-items: center;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		transition: all var(--duration-200, 200ms);
	}
	.up-item--normal {
		padding: 0.75rem;
	}
	.up-item--compact {
		padding: 0.5rem;
	}
	.up-item--success {
		border-color: var(--color-success-border, var(--color-success-500));
		background-color: var(--color-success-bg, var(--color-success-50));
	}
	.up-item--error {
		border-color: var(--color-danger-border, var(--color-danger-500));
		background-color: var(--color-danger-bg, var(--color-danger-50));
	}
	.up-item--uploading {
		border-color: var(--color-info-border, var(--color-primary-500));
		background-color: var(--color-info-bg, var(--color-primary-50));
	}
	.up-item--idle {
		border-color: var(--color-default-border, var(--color-border-primary));
		background-color: var(--color-default-bg, var(--color-background-primary));
	}
	.up-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	.up-bar {
		height: 0.5rem;
		border-radius: 9999px;
		overflow: hidden;
		transition: all var(--duration-300, 300ms);
	}
	.up-bar--low {
		background-color: var(--color-success-400, #4ade80);
	}
	.up-bar--mid {
		background-color: var(--color-success-500, #22c55e);
	}
	.up-bar--high {
		background-color: var(--color-success-600, #16a34a);
	}
	.up-fill {
		height: 100%;
		border-radius: 9999px;
		transition: all var(--duration-300, 300ms);
	}
	.up-fill--low {
		background-color: var(--color-success-400, #4ade80);
	}
	.up-fill--mid {
		background-color: var(--color-success-500, #22c55e);
	}
	.up-fill--high {
		background-color: var(--color-success-600, #16a34a);
	}
</style>
