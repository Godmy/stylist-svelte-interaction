<script lang="ts">
	import AnimatedButton from '../animated-button/index.svelte';
	import type { RecipeSelectionButton } from '$stylist/button/interface/recipe/selection-button';
	let { selected = $bindable(false), onclick, ...rest }: RecipeSelectionButton = $props();
</script>

<AnimatedButton
	{...rest}
	effect="selection"
	{selected}
	aria-pressed={selected}
	onclick={(event) => {
		onclick?.(event);
		if (!event.defaultPrevented) selected = !selected;
	}}
/>
