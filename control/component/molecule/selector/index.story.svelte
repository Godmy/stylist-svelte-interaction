<script lang="ts">
	// Render of index.story.ts: the selected value is controlled through onSelect and local state.
	import Selector from '$stylist/control/component/molecule/selector/index.svelte';
	import type { RecipeSelector } from '$stylist/control/interface/recipe/selector';

	let args: RecipeSelector = $props();
	// Follows the args and is overwritten by the selection.
	let value = $derived(args.value);
</script>

<Selector
	{...args}
	{value}
	onSelect={(next: string | string[]) => {
		value = Array.isArray(next) ? next[0] : next;
	}}
/>
