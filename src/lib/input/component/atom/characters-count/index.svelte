<script lang="ts">
	import type { RecipeCharactersCount } from '$stylist/input/interface/recipe/characters-count';
	import createCharactersCountState from './state.svelte';

	let props: RecipeCharactersCount = $props();
	const state = createCharactersCountState(() => props);
</script>

<div class={state.classes}>
	{#if props.children}
		{@render props.children()}
	{:else}
		{state.message}
	{/if}
</div>

<style>
	.characters-count {
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.characters-count--warning {
		color: var(--color-warning-600);
	}

	.characters-count--danger {
		color: var(--color-danger-600);
	}
</style>
