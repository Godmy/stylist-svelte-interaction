<script lang="ts">
	import type { RecipeDrawer } from '$stylist/menu/interface/recipe/drawer';
	import { createDrawerState } from '$stylist/menu/function/state/drawer/index.svelte';

	let props: RecipeDrawer = $props();
	const state = createDrawerState(() => props);
</script>

<svelte:window onkeydown={(e) => state.handleEscapeFn(e)} />

{#if state.isOpen}
	<div
		class="drawer__backdrop"
		class:drawer__backdrop--clear={!state.showBackdrop}
		bind:this={state.backdropEl}
		onclick={(e) => state.handleBackdropClickFn(e)}
		onkeydown={(e) => state.handleBackdropKeyDownFn(e)}
		role="button"
		tabindex="0"
		aria-label="Close drawer via backdrop"
	>
		<div
			class="drawer__drawer drawer__drawer-open {props.class ?? ''}"
			data-position={state.position}
			bind:this={state.drawerEl}
			role="dialog"
			aria-modal="true"
			aria-labelledby="drawer-title"
			style={`--size: ${state.size};`}
		>
			<div class="drawer__header">
				{#if props.header}
					{@render props.header()}
				{:else}
					<h2 id="drawer-title">Drawer Title</h2>
				{/if}
				{#if state.closable}
					<button
						class="drawer__close-button"
						onclick={() => state.closeFn()}
						aria-label={state.closeLabel}>×</button
					>
				{/if}
			</div>
			<div class="drawer__content">
				{#if props.children}
					{#if props.children}{@render props.children()}{/if}
				{/if}
			</div>
			<div class="drawer__actions">
				{#if props.actions}
					{@render props.actions()}
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.drawer__backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: var(--z-index-dropdown);
		display: flex;
		opacity: var(--opacity-100);
		background-color: color-mix(in srgb, var(--color-text-primary) 50%, transparent);
		transition: opacity var(--duration-300) var(--animation-ease);
	}

	.drawer__backdrop--clear {
		background-color: transparent;
	}

	.drawer__drawer {
		position: absolute;
		display: flex;
		flex-direction: column;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary);
		box-shadow: 0 0 2rem color-mix(in srgb, var(--color-text-primary) 25%, transparent);
		overflow: hidden;
	}

	.drawer__drawer[data-position='right'],
	.drawer__drawer[data-position='left'] {
		top: 0;
		bottom: 0;
		width: min(var(--size), 100%);
	}

	.drawer__drawer[data-position='right'] {
		right: 0;
	}

	.drawer__drawer[data-position='left'] {
		left: 0;
	}

	.drawer__drawer[data-position='top'],
	.drawer__drawer[data-position='bottom'] {
		left: 0;
		right: 0;
		height: min(var(--size), 100%);
	}

	.drawer__drawer[data-position='top'] {
		top: 0;
	}

	.drawer__drawer[data-position='bottom'] {
		bottom: 0;
	}

	.drawer__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-border-primary);
	}

	.drawer__close-button {
		border: 0;
		background: none;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		color: inherit;
	}

	.drawer__content {
		flex: 1;
		min-height: 0;
		overflow: auto;
	}

	.drawer__actions:empty {
		display: none;
	}
</style>
