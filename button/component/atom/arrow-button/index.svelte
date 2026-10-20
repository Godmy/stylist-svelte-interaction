<script lang="ts">
	import AnimatedButton from '../animated-button/index.svelte';
	import type { RecipeArrowButton } from '$stylist/button/interface/recipe/arrow-button';
	let props: RecipeArrowButton = $props();
</script>

<AnimatedButton {...props} effect="arrow" />
