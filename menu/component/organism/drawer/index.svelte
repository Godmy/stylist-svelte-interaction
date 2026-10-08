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
		bind:this={state.backdropEl}
		onclick={(e) => state.handleBackdropClickFn(e)}
		onkeydown={(e) => state.handleBackdropKeyDownFn(e)}
		role="button"
		tabindex="0"
		aria-label="Close drawer via backdrop"
	>
		<div
			class="drawer__drawer drawer__drawer-open"
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
						aria-label="Close drawer">x</button
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
</style>
