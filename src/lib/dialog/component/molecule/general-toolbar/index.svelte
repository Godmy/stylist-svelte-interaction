<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import type { RecipeGeneralToolbar } from '$stylist/dialog/interface/recipe/general-toolbar';
	import createGeneralToolbarState from './state.svelte';

	let props: RecipeGeneralToolbar = $props();
	const state = createGeneralToolbarState(() => props);
</script>

<div class={ClassNamesManager.join('toolbar', props.class)}>
	{#each props.toolbarItems ?? [] as item}
		<Button
			variant="ghost"
			size={state.buttonSize}
			onclick={() => {
				if (!props.disabled) {
					item.action();
				}
			}}
			title={item.label}
			disabled={props.disabled}
		>
			<span class="toolbar-button-content">
				<span class="toolbar-button-icon">{item.icon}</span>
				<span class="toolbar-button-label">{item.label}</span>
			</span>
		</Button>
	{/each}
</div>

<style>
	.toolbar {
		display: flex;
		gap: var(--spacing-2);
		flex-wrap: wrap;
		align-items: center;
		padding: var(--spacing-2);
		background-color: var(--color-background-secondary);
		border-radius: var(--border-radius-lg);
		border: 1px solid var(--color-border-secondary);
	}

	.toolbar-button-content {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		white-space: nowrap;
	}

	.toolbar-button-icon {
		font-weight: 700;
		opacity: 0.8;
	}

	.toolbar-button-label {
		font-size: 0.875rem;
	}
</style>
