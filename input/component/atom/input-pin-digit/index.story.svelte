<script lang="ts">
	// Render of index.story.ts: a PIN row of four digits, the first one driven by the args.
	import InputPinDigit from '$stylist/input/component/atom/input-pin-digit/index.svelte';
	import type { RecipeInputPinDigit } from '$stylist/input/interface/recipe/input-pin-digit';

	let args: RecipeInputPinDigit = $props();
</script>

<div class="_c1">
	<InputPinDigit {...args} />
	{#each [1, 2, 3] as digit (digit)}
		<InputPinDigit value="" size={args.size} variant={args.variant} />
	{/each}
</div>

<style>
	._c1 {
		display: flex;
		gap: 0.5rem;
	}
</style>
