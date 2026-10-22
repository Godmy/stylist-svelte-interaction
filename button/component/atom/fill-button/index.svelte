<script lang="ts">
	import AnimatedButton from '$stylist/button/component/atom/animated-button/index.svelte';
	import type { RecipeFillButton } from '$stylist/button/interface/recipe/fill-button';
	let props: RecipeFillButton = $props();
</script>

<AnimatedButton {...props} effect="fill" />
