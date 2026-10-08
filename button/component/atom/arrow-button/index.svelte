<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import AnimatedButton from '../animated-button/index.svelte';
	let props: Omit<ComponentProps<typeof AnimatedButton>, 'effect'> = $props();
</script>

<AnimatedButton {...props} effect="arrow" />
