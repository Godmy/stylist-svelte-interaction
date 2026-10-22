<script lang="ts">
	// Render of index.story.ts: the component resets to its value prop, so the value is controlled here.
	import SliderWithInput from '$stylist/control/component/molecule/slider-with-input/index.svelte';
	import type { RecipeSliderWithInput } from '$stylist/control/interface/recipe/slider-with-input';

	let args: RecipeSliderWithInput = $props();
	// Follows the value control and is overwritten by the component callbacks.
	let currentValue = $derived(args.value ?? 0);

	function update(next: number) {
		currentValue = next;
	}
</script>

<div class="_c1">
	<p class="_c2">Current value: {currentValue}</p>
	<SliderWithInput {...args} value={currentValue} onValueInput={update} onValueChange={update} />
</div>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin: 0 0 0.75rem;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}
</style>
