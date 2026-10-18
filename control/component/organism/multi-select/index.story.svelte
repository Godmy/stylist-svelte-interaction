<script lang="ts">
	// Render of index.story.ts: the component resets its selection to the value prop, so the value is controlled here.
	import MultiSelect from './index.svelte';
	import type { RecipeMultiSelect } from '$stylist/control/interface/recipe/multi-select';

	let args: RecipeMultiSelect = $props();
	// Follows the args and is overwritten by the selection.
	let value = $derived(args.value ?? []);

	// The recipe types onChange as `string[] | string[][]` (via BehaviorSelectable); flatten to the list.
	function handleChange(next: string[] | string[][]) {
		value = ([] as string[]).concat(...next);
	}
</script>

<div class="_c1">
	<MultiSelect {...args} {value} onChange={handleChange} />
</div>

<style>
	._c1 {
		max-width: 28rem;
	}
</style>
