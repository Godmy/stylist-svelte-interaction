<script lang="ts">
	import AnimatedButton from '../animated-button/index.svelte';
	import type { RecipeShineButton } from '$stylist/button/interface/recipe/shine-button';
	let { attention = true, animatedBorder = true, ...props }: RecipeShineButton = $props();
</script>

<AnimatedButton {...props} {attention} {animatedBorder} effect="shine" />
