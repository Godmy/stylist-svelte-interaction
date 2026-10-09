<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import { DownloadCardManager } from '$stylist/file/class/manager/download-card';
	import type { RecipeDownloadCard } from '$stylist/file/interface/recipe/download-card';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createDownloadCardState } from './state.svelte';

	let props: RecipeDownloadCard = $props();
	const state = createDownloadCardState(
		() => props as RecipeDownloadCard & Record<string, unknown>
	);

	const containerClasses = $derived(ClassNamesManager.merge('download-card', state.class));
	const iconContainerClasses = 'download-card__icon-container';
	const iconClasses = $derived(
		ClassNamesManager.merge(
			'download-card__icon',
			(
				{
					primary: 'download-card__icon--primary',
					secondary: 'download-card__icon--secondary',
					success: 'download-card__icon--success',
					warning: 'download-card__icon--warning',
					danger: 'download-card__icon--danger',
					error: 'download-card__icon--danger',
					info: 'download-card__icon--info'
				} as Record<string, string>
			)[state.variant] ?? 'download-card__icon--primary'
		)
	);
	const infoContainerClasses = 'download-card__info';
	const fileNameClasses = 'download-card__file-name';
	const metadataClasses = 'download-card__metadata';
	const metadataItemClasses = 'download-card__metadata-item';
	const downloadButtonClasses = $derived(
		ClassNamesManager.merge(
			'download-card__button',
			(
				{
					primary: 'download-card__button--primary',
					secondary: 'download-card__button--secondary',
					success: 'download-card__button--success',
					warning: 'download-card__button--warning',
					danger: 'download-card__button--danger',
					error: 'download-card__button--danger',
					info: 'download-card__button--info'
				} as Record<string, string>
			)[state.variant] ?? 'download-card__button--primary'
		)
	);

	function handleDownload() {
		if (state.downloadUrl) DownloadCardManager.handleFileDownload(state.downloadUrl);
	}
</script>

<div class={containerClasses} role="article" aria-label={`Download card: ${props.file.name}`}>
	<!-- ������ ����� -->
	<div class={iconContainerClasses} aria-hidden="true">
		{#if props.icon}
			<span class={iconClasses} aria-label={props.iconAlt ?? 'File'}>{props.icon}</span>
		{:else}
			<BaseIcon name="download" class={iconClasses} aria-hidden="true" />
		{/if}
	</div>

	<!-- ���������� � ����� -->
	<div class={infoContainerClasses}>
		<div class={fileNameClasses} aria-label={`File name: ${props.file.name}`}>
			{props.file.name}
		</div>

		{#if props.showMetadata ?? true}
			<div class={metadataClasses} aria-label="File metadata">
				{#if props.file.size}
					<span
						class={metadataItemClasses}
						aria-label={`File size: ${DownloadCardManager.formatFileSize(props.file.size)}`}
					>
						{DownloadCardManager.formatFileSize(props.file.size)}
					</span>
				{/if}
				{#if props.file.type}
					<span class={metadataItemClasses} aria-label={`File type: ${props.file.type}`}>
						{props.file.type}
					</span>
				{/if}
				{#if props.file.date}
					<span class={metadataItemClasses} aria-label={`File date: ${props.file.date}`}>
						{props.file.date}
					</span>
				{/if}
			</div>
		{/if}
	</div>

	<!-- ������ ���������� -->
	<button
		class={downloadButtonClasses}
		aria-label={`Download ${props.file.name}`}
		title={`Download ${props.file.name}`}
		onclick={handleDownload}
		type="button"
	>
		<BaseIcon name="download" class="download-card__button-icon" aria-hidden="true" />
	</button>
</div>

<style>
	.download-card {
		display: flex;
		align-items: center;
		overflow: hidden;
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		padding: 1rem;
		transition: box-shadow var(--duration-200);
	}

	.download-card:hover {
		box-shadow: var(--shadow-md);
	}

	.download-card__icon-container {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 0.5rem;
	}

	.download-card__icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	.download-card__icon--primary {
		background: var(--color-primary-50);
		color: var(--color-primary-500);
	}

	.download-card__icon--secondary {
		background: var(--color-neutral-50);
		color: var(--color-neutral-500);
	}

	.download-card__icon--success {
		background: var(--color-success-50);
		color: var(--color-success-500);
	}

	.download-card__icon--warning {
		background: var(--color-warning-50);
		color: var(--color-warning-500);
	}

	.download-card__icon--danger {
		background: var(--color-danger-50);
		color: var(--color-danger-500);
	}

	.download-card__icon--info {
		background: var(--color-info-50);
		color: var(--color-info-500);
	}

	.download-card__info {
		flex: 1;
		min-width: 0;
	}

	.download-card__file-name {
		display: block;
		overflow: hidden;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.download-card__metadata {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.download-card__metadata-item {
		display: inline-flex;
		align-items: center;
	}

	.download-card__button {
		margin-left: 1rem;
		border: 0;
		border-radius: 999px;
		background: transparent;
		padding: 0.5rem;
		transition:
			background-color var(--duration-150),
			color var(--duration-150);
	}

	.download-card__button:hover {
		background: var(--color-background-secondary);
	}

	.download-card__button--primary {
		color: var(--color-primary-600);
	}

	.download-card__button--primary:hover {
		color: var(--color-primary-700);
	}

	.download-card__button--secondary {
		color: var(--color-neutral-600);
	}

	.download-card__button--secondary:hover {
		color: var(--color-neutral-700);
	}

	.download-card__button--success {
		color: var(--color-success-600);
	}

	.download-card__button--success:hover {
		color: var(--color-success-700);
	}

	.download-card__button--warning {
		color: var(--color-warning-600);
	}

	.download-card__button--warning:hover {
		color: var(--color-warning-700);
	}

	.download-card__button--danger {
		color: var(--color-danger-600);
	}

	.download-card__button--danger:hover {
		color: var(--color-danger-700);
	}

	.download-card__button--info {
		color: var(--color-info-600);
	}

	.download-card__button--info:hover {
		color: var(--color-info-700);
	}

	.download-card__button-icon {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
