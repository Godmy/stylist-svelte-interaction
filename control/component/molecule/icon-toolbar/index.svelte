<script lang="ts">
	import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeIconToolbar } from '$stylist/control/interface/recipe/icon-toolbar';

	let {
		items,
		active,
		label = '',
		orientation = TOKEN_ORIENTATION[0],
		showLabel = true,
		availableItems,
		emptyText = 'empty',
		onSelect,
		class: className = ''
	}: RecipeIconToolbar = $props();

	const visibleItems = $derived(
		availableItems ? items.filter((item) => availableItems.includes(item.name)) : items
	);
</script>

<nav class="c-icon-toolbar {orientation} {className}">
	{#if showLabel && label}
		<div class="label">
			<span class="label-title">{label}</span>
			<span class="label-text">{active ?? ''}</span>
		</div>
		<div class="separator"></div>
	{/if}
	{#each visibleItems as item (item.name)}
		<button
			type="button"
			title={item.name}
			aria-label={item.name}
			aria-current={active === item.name ? 'page' : undefined}
			class="toolbar-btn"
			class:is-active={active === item.name}
			onclick={() => onSelect?.(item.name)}
		>
			<span class="icon">
				<Icon name={item.name} size="sm" />
			</span>
			{#if active === item.name}
				<span class="active-indicator"></span>
			{/if}
		</button>
	{/each}
	{#if visibleItems.length === 0}
		<span class="empty-label">{emptyText}</span>
	{/if}
</nav>

<style>
	.c-icon-toolbar {
		display: flex;
		align-items: center;
		gap: 2px;
		border-bottom: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
		padding: 2px 4px;
	}

	.toolbar-btn {
		position: relative;
		display: flex;
		width: 28px;
		height: 28px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		border: none;
		background: transparent;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition:
			background-color 100ms,
			color 100ms;
	}

	.toolbar-btn:hover {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
	}

	.toolbar-btn.is-active {
		background: color-mix(in srgb, var(--color-primary-500) 15%, transparent);
		color: var(--color-primary-600);
	}

	.toolbar-btn:focus-visible {
		outline: 1px solid var(--color-primary-500);
		outline-offset: -1px;
	}

	.icon {
		display: inline-flex;
		width: 16px;
		height: 16px;
		align-items: center;
		justify-content: center;
	}

	.icon :global(svg) {
		display: block;
		width: 16px;
		height: 16px;
	}

	.active-indicator {
		position: absolute;
		bottom: 0;
		left: 4px;
		right: 4px;
		height: 2px;
		border-radius: 1px;
		background: var(--color-primary-500);
	}

	.label {
		width: 120px;
		flex-shrink: 0;
		display: grid;
		align-content: center;
		padding: 0 8px;
		height: 28px;
	}

	.label-title {
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		line-height: 1;
	}

	.label-text {
		font-size: 12px;
		font-weight: 500;
		color: var(--color-text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-family: var(--font-mono, monospace);
	}

	.separator {
		width: 1px;
		height: 16px;
		flex-shrink: 0;
		background: var(--color-border-primary);
		margin: 0 4px;
	}

	.empty-label {
		padding: 0 8px;
		font-size: 12px;
		color: var(--color-text-secondary);
	}

	.vertical {
		width: 32px;
		height: 100%;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		overflow-x: hidden;
		border-right: 1px solid var(--color-border-primary);
		border-bottom: none;
		gap: 1px;
		padding: 2px;
	}

	.vertical .toolbar-btn {
		width: 28px;
		height: 28px;
	}

	.vertical .icon,
	.vertical .icon :global(svg) {
		width: 16px;
		height: 16px;
	}

	.vertical .active-indicator {
		top: 3px;
		bottom: 3px;
		left: 0;
		right: auto;
		width: 2px;
		height: auto;
	}

	.vertical .empty-label {
		writing-mode: vertical-rl;
		padding: 8px 0;
	}
</style>
