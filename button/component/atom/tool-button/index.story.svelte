<script lang="ts">
	import ToolButton from './index.svelte';
	import type { RecipeToolButton } from '$stylist/button/interface/recipe/tool-button';

	// Render of index.story.ts: several tools share one local active-tool state.
	let args: RecipeToolButton = $props();
	const tools = ['select', 'pan', 'frame', 'connect', 'text'];
	let activeTool = $state('select');
</script>

<div class="_c1">
	{#each tools as tool (tool)}
		<ToolButton
			{...args}
			{tool}
			active={activeTool === tool}
			onClick={(clicked) => (activeTool = clicked)}
		/>
	{/each}
</div>

<style>
	._c1 {
		display: flex;
		gap: 8px;
		padding: 20px;
		background: var(--color-background-primary);
	}
</style>
