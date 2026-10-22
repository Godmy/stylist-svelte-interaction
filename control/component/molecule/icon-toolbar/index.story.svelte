<script lang="ts">
	// Render of index.story.ts: the active item is controlled through onSelect and local state.
	import IconToolbar from '$stylist/control/component/molecule/icon-toolbar/index.svelte';
	import type { RecipeIconToolbar } from '$stylist/control/interface/recipe/icon-toolbar';

	let args: RecipeIconToolbar = $props();
	// Follows the args and is overwritten by the toolbar selection.
	let active = $derived(args.active);
</script>

<div class="_c1">
	<IconToolbar {...args} {active} onSelect={(name) => (active = name)} />
</div>

<style>
	._c1 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
</style>
