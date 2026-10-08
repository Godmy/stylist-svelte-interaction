<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createDropZoneState } from './state.svelte';
	import { DropZoneManager } from '$stylist/file/class/manager/drop-zone';
	import type { RecipeDropZone } from '$stylist/file/interface/recipe/drop-zone';

	let props: RecipeDropZone = $props();
	const state = createDropZoneState(() => props);
	const rootClasses = $derived(
		ClassNamesManager.merge(
			'c-drop-zone',
			state.isDragOver ? 'c-drop-zone--active' : '',
			state.disabled ? 'c-drop-zone--disabled' : '',
			state.classes
		)
	);
	const listClasses = 'dz-list';
	const itemClasses = 'dz-item';
</script>

<div
	class={rootClasses}
	ondragover={state.handleDragOver}
	ondragleave={state.handleDragLeave}
	ondrop={state.handleDrop}
	{...state.restProps}
>
	{#if state.children}
		{#if state.children}{@render state.children()}{/if}
	{:else}
		<div class="dz-inner">
			<BaseIcon
				name="upload"
				size={40} style="margin-bottom: 0.5rem; color: var(--color-text-tertiary)"
			/>
			<h3 class="dz-label">{state.label}</h3>
			<p class="dz-desc">{state.description}</p>
			<p class="dz-hint">Accepts: {state.accept}</p>
		</div>

		<input
			bind:this={state.fileInputElement}
			type="file"
			class="dz-hidden"
			accept={state.accept}
			multiple={state.multiple}
			disabled={state.disabled}
			onchange={state.handleFileInput}
		/>

		<div class="dz-browse">
			<Button variant="secondary" onclick={state.browse} disabled={state.disabled}>
				Browse Files
			</Button>
		</div>
	{/if}

	{#if state.items.length > 0}
		<div class="dz-dropped">
			<div class="dz-dropped-header">
				<h4 class="dz-dropped-title">
					Dropped Items ({state.items.length})
				</h4>
				<Button variant="ghost" size="sm" onclick={state.clearItems} disabled={state.disabled}>
					Clear All
				</Button>
			</div>

			<div class={listClasses}>
				{#each state.items as item}
					<div class={itemClasses}>
						<div class="dz-item-info">
							<div
								style="width:1.25rem;height:1.25rem;flex-shrink:0;color:var(--color-primary-500)"
							>
								<BaseIcon name="check" size={20} />
							</div>
							<div class="dz-item-meta">
								<p class="dz-item-name">{item.name}</p>
								<p class="dz-item-desc">
									{item.type} • {DropZoneManager.formatFileSize(item.size || 0)}
								</p>
							</div>
						</div>

						<div class="dz-item-actions">
							<Button
								variant="ghost"
								size="sm"
								onclick={() => state.removeDroppedItem(item.id)}
								disabled={state.disabled}
							>
								<BaseIcon name="x" size={16} />
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if state.isProcessing}
		<div class="dz-processing">
			<div class="dz-processing-text">Processing...</div>
		</div>
	{/if}
</div>

<style>
	.c-drop-zone {
		border: 2px dashed var(--color-border-primary);
		border-radius: 0.5rem;
		padding: 1.5rem;
		text-align: center;
		cursor: pointer;
		transition:
			border-color var(--duration-150, 150ms) var(--easing-smooth, ease-in-out),
			background-color var(--duration-150, 150ms) var(--easing-smooth, ease-in-out);
	}
	.c-drop-zone:hover {
		border-color: var(--color-primary-500);
	}
	.c-drop-zone--active {
		border-color: var(--color-primary-500);
		background-color: var(--color-primary-50);
	}
	.c-drop-zone--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.dz-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 15rem;
		overflow-y: auto;
	}
	.dz-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
	}
	.dz-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.dz-label {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.dz-desc {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	.dz-hint {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	.dz-hidden {
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

	.dz-browse {
		margin-top: 1rem;
	}
	.dz-dropped {
		margin-top: 1.5rem;
	}

	.dz-dropped-header {
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dz-dropped-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.dz-item-info {
		display: flex;
		align-items: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.dz-item-meta {
		margin-left: 0.75rem;
		min-width: 0;
	}
	.dz-item-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.dz-item-desc {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
	.dz-item-actions {
		display: flex;
		align-items: center;
	}

	.dz-processing {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
	}

	.dz-processing-text {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
