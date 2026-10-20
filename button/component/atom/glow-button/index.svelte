<script lang="ts">
	import AnimatedButton from '../animated-button/index.svelte';
	import type { RecipeGlowButton } from '$stylist/button/interface/recipe/glow-button';
	let props: RecipeGlowButton = $props();
</script>

<AnimatedButton {...props} effect="glow" />
