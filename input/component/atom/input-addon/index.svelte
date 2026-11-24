<script lang="ts">
	import type { RecipeInputAddon as IInputAddonProps } from '$stylist/input/interface/recipe/input-addon';

	import createInputAddonComponentState from '$stylist/input/component/atom/input-addon/state.svelte';

	let props: IInputAddonProps = $props();

	const state = createInputAddonComponentState(() => props);
</script>

<div {...state.rest} class={state.classes}>
	{#if props.children}{@render props.children()}{/if}
</div>

<style>
	.input-addon {
		display: inline-flex;
		align-items: center;
		height: 2.25rem;
		padding-inline: 0.75rem;
		border: 1px solid var(--color-border-primary);
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
		font-size: var(--font-size-4, 1rem);
		white-space: nowrap;
	}

	.input-addon--left {
		border-start-start-radius: var(--radius-1-5, 0.375rem);
		border-end-start-radius: var(--radius-1-5, 0.375rem);
		border-start-end-radius: 0;
		border-end-end-radius: 0;
		border-inline-end-color: transparent;
	}

	.input-addon--right {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
		border-start-end-radius: var(--radius-1-5, 0.375rem);
		border-end-end-radius: var(--radius-1-5, 0.375rem);
		border-inline-start-color: transparent;
	}
</style>
