<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createFileBrowserState } from './state.svelte';
	import { FileBrowserManager } from '$stylist/file/class/manager/file-browser';
	import type { SlotFolderItem } from '$stylist/file/interface/slot/folder-item';
	import type { RecipeFileBrowser } from '$stylist/file/interface/recipe/file-browser';

	let props: RecipeFileBrowser = $props();
	const state = createFileBrowserState(() => props);
</script>

<div class={`folder-tree ${state.classes}`} {...state.restProps}>
	<ul role="tree" class="fb-tree">
		{#each state.items as item}
			{@render TreeNode(item)}
		{/each}
	</ul>
</div>

{#snippet TreeNode(item: SlotFolderItem)}
	<li
		role="treeitem"
		aria-expanded={item.children?.length ? state.isExpanded(item.id) : undefined}
		aria-selected={state.selectedItem?.id === item.id}
		class="fb-node"
	>
		<div
			class={`fb-item-btn ${state.selectedItem?.id === item.id ? 'fb-item-btn--selected' : ''} ${state.disabled ? 'fb-item-btn--disabled' : ''} ${props.itemClass ?? ''}`}
			role="button"
			tabindex={state.disabled ? -1 : 0}
			onclick={() => {
				state.handleSelect(item);
				if (item.type !== 'file') state.toggleItem(item);
			}}
			onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					state.handleSelect(item);
					if (item.type !== 'file') state.toggleItem(item);
				} else if (
					event.key === 'ArrowRight' &&
					item.children?.length &&
					!state.isExpanded(item.id)
				) {
					state.toggleItem(item);
				} else if (
					event.key === 'ArrowLeft' &&
					item.children?.length &&
					state.isExpanded(item.id)
				) {
					state.toggleItem(item);
				}
			}}
		>
			{#if item.children}
				<button
					type="button"
					class="fb-expand-btn"
					aria-label={state.isExpanded(item.id) ? `Collapse ${item.name}` : `Expand ${item.name}`}
					onclick={(event) => {
						event.stopPropagation();
						state.toggleItem(item);
					}}
					disabled={state.disabled}
				>
					{#if state.isExpanded(item.id)}
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
				</button>
			{:else}
				<span class="fb-spacer"></span>
			{/if}

			<div class="fb-item-content">
				{#if item.type === 'folder'}
					{#if state.isExpanded(item.id)}
						<BaseIcon
							name="folder-open"
							size={20} style="margin-right: 0.5rem; flex-shrink: 0; color: var(--color-primary-600)"
						/>
					{:else}
						<BaseIcon
							name="folder"
							size={20} style="margin-right: 0.5rem; flex-shrink: 0; color: var(--color-primary-600)"
						/>
					{/if}
				{:else}
					<BaseIcon
						name="file"
						size={20} style="margin-right: 0.5rem; flex-shrink: 0; color: var(--color-text-secondary)"
					/>
				{/if}

				<span class="fb-item-name">{item.name}</span>
			</div>

			{#if state.showItemCount && item.children}
				<span class="fb-count-badge">{FileBrowserManager.getItemCount(item)}</span>
			{/if}
		</div>

		{#if item.children && state.isExpanded(item.id)}
			<ul role="group" class="fb-children">
				{#each item.children as child}
					{@render TreeNode(child)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<style>
	.fb-tree {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.fb-node {
		user-select: none;
	}

	.fb-item-btn {
		display: flex;
		cursor: pointer;
		align-items: center;
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
	}

	.fb-item-btn:hover {
		background-color: var(--color-background-secondary);
	}
	.fb-item-btn--selected {
		background-color: var(--color-primary-100);
		color: var(--color-primary-700);
	}
	.fb-item-btn--disabled {
		opacity: var(--opacity-50, 0.5);
	}

	.fb-expand-btn {
		margin-right: 0.25rem;
		display: flex;
		width: 1.25rem;
		height: 1.25rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
	}

	.fb-expand-btn:hover {
		background-color: var(--color-background-tertiary);
	}
	.fb-expand-btn:focus {
		outline: none;
	}

	.fb-spacer {
		margin-right: 0.25rem;
		width: 1.25rem;
		height: 1.25rem;
	}

	.fb-item-content {
		display: flex;
		min-width: 0;
		flex: 1;
		align-items: center;
	}

	.fb-item-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fb-count-badge {
		margin-left: 0.5rem;
		border-radius: 9999px;
		background-color: var(--color-background-tertiary);
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
	}

	.fb-children {
		margin-top: 0.25rem;
		margin-left: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		list-style: none;
		padding: 0;
	}
</style>
